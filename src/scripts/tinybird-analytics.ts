/**
 * Tinybird Analytics Plugin for Analytics.js (TypeScript)
 * Compatible with Tinybird Web Analytics Starter Kit
 */

import { getCountryForTimezone } from 'countries-and-timezones'
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'

// Types
interface WebVital {
  name: string
  value: number
  delta: number
  rating: string
  id: string
  navigationType?: string
}

interface TinybirdAnalyticsConfig {
  token?: string
  host?: string
  proxy?: string
  proxyUrl?: string
  domain?: string
  datasource?: string
  storage?: StorageMethod
  storageFallbacks?: StorageMethod[]
  enableMemoryFallback?: boolean
  stringifyPayload?: boolean
  globalAttributes?: Record<string, unknown>
  webVitals?: boolean
}

interface TinybirdIdentityEvent {
  userId?: string
  traits?: Record<string, unknown>
}

type TinybirdEvent = Record<string, unknown>

interface SessionItem {
  value: string
  expiry: number
}

interface AttributionData {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  landing_page?: string
  referrer?: string
}

interface CountryLocale {
  country?: string
  locale?: string
}

type StorageMethod = 'cookie' | 'localStorage' | 'memory' | 'sessionStorage'

interface StorageOptions {
  expiry?: number // seconds
  domain?: string
  secure?: boolean
}

interface StorageManager {
  get(key: string): string | null
  set(key: string, value: string, options?: StorageOptions): boolean
  remove(key: string): boolean
  isAvailable(method: StorageMethod): boolean
  getFromMethod(method: StorageMethod, key: string): string | null
  setInMethod(
    method: StorageMethod,
    key: string,
    value: string,
    options?: StorageOptions
  ): boolean
  removeFromMethod(method: StorageMethod, key: string): boolean
  getCookie(name: string): string | null
  setCookie(name: string, value: string, options?: StorageOptions): boolean
  removeCookie(name: string): boolean
}

interface SessionManager {
  getSessionId(): string | null
  setSessionId(sessionId: string): void
}

interface AttributionManager {
  getAttributionData(): AttributionData | null
  captureAttributionData(): void
  setAttributionToStorage(data: AttributionData): void
}

interface TinybirdAnalytics {
  config: TinybirdAnalyticsConfig
  _sessionManager: SessionManager
  _attributionManager: AttributionManager
  sendEvent: (eventName: string, event: TinybirdEvent) => void
  page: (event: TinybirdEvent) => void
  track: (eventName: string, event: TinybirdEvent) => void
  identify: (event: TinybirdIdentityEvent) => void
  _userId: string
}

declare global {
  interface Window {
    tinybirdAnalytics: TinybirdAnalytics
  }
}

const STORAGE_KEY = 'session-id'
const ATTRIBUTION_STORAGE_KEY = 'attribution-data'

/**
 * Generate uuid to identify the session.
 */
function _uuidv4(): string {
  return crypto.randomUUID()
}

/**
 * Check if session data is expired
 */
function isSessionExpired(sessionData: SessionItem): boolean {
  return Date.now() > sessionData.expiry
}

/**
 * Parse session data from string
 */
function parseSessionData(data: string): SessionItem | null {
  try {
    const parsed = JSON.parse(data)
    if (
      parsed &&
      typeof parsed === 'object' &&
      'value' in parsed &&
      'expiry' in parsed
    ) {
      return parsed as SessionItem
    }
  } catch {
    // Invalid JSON
  }
  return null
}

/**
 * Create storage manager with fallback strategy
 */
function createStorageManager(config: TinybirdAnalyticsConfig): StorageManager {
  const primary = config.storage || 'localStorage'
  const fallbacks = config.storageFallbacks || ['sessionStorage', 'cookie']
  const enableMemoryFallback = config.enableMemoryFallback ?? true

  const methods = [primary, ...fallbacks]
  if (enableMemoryFallback) {
    methods.push('memory')
  }

  // In-memory storage for fallback
  const memoryStorage = new Map<string, { value: string; expiry: number }>()

  return {
    get(key: string): string | null {
      for (const method of methods) {
        try {
          const value = this.getFromMethod(method, key)
          if (value) return value
        } catch {
          continue
        }
      }
      return null
    },

    set(key: string, value: string, options?: StorageOptions): boolean {
      for (const method of methods) {
        try {
          if (this.setInMethod(method, key, value, options)) {
            return true
          }
        } catch {
          continue
        }
      }
      return false
    },

    remove(key: string): boolean {
      let removed = false
      for (const method of methods) {
        try {
          if (this.removeFromMethod(method, key)) {
            removed = true
          }
        } catch {
          continue
        }
      }
      return removed
    },

    isAvailable(method: StorageMethod): boolean {
      try {
        switch (method) {
          case 'localStorage':
            return 'localStorage' in window && localStorage !== null
          case 'sessionStorage':
            return 'sessionStorage' in window && sessionStorage !== null
          case 'cookie':
            return 'document' in window && 'cookie' in document
          case 'memory':
            return true
          default:
            return false
        }
      } catch {
        return false
      }
    },

    getFromMethod(method: StorageMethod, key: string): string | null {
      switch (method) {
        case 'localStorage':
          return localStorage.getItem(key)
        case 'sessionStorage':
          return sessionStorage.getItem(key)
        case 'cookie':
          return this.getCookie(key)
        case 'memory':
          // eslint-disable-next-line no-case-declarations
          const item = memoryStorage.get(key)
          if (item && Date.now() < item.expiry) {
            return item.value
          }
          memoryStorage.delete(key)
          return null
        default:
          return null
      }
    },

    setInMethod(
      method: StorageMethod,
      key: string,
      value: string,
      options?: StorageOptions
    ): boolean {
      switch (method) {
        case 'localStorage':
          try {
            localStorage.setItem(key, value)
            return true
          } catch {
            return false
          }
        case 'sessionStorage':
          try {
            sessionStorage.setItem(key, value)
            return true
          } catch {
            return false
          }
        case 'cookie':
          return this.setCookie(key, value, options)
        case 'memory':
          // eslint-disable-next-line no-case-declarations
          const expiry = options?.expiry
            ? Date.now() + options.expiry * 1000
            : Date.now() + 24 * 60 * 60 * 1000
          memoryStorage.set(key, { value, expiry })
          return true
        default:
          return false
      }
    },

    removeFromMethod(method: StorageMethod, key: string): boolean {
      switch (method) {
        case 'localStorage':
          try {
            localStorage.removeItem(key)
            return true
          } catch {
            return false
          }
        case 'sessionStorage':
          try {
            sessionStorage.removeItem(key)
            return true
          } catch {
            return false
          }
        case 'cookie':
          return this.removeCookie(key)
        case 'memory':
          return memoryStorage.delete(key)
        default:
          return false
      }
    },

    getCookie(name: string): string | null {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null
      }
      return null
    },

    setCookie(name: string, value: string, options?: StorageOptions): boolean {
      try {
        let cookieValue = `${name}=${value}`

        if (options?.expiry) {
          const date = new Date()
          date.setTime(date.getTime() + options.expiry * 1000)
          cookieValue += `; expires=${date.toUTCString()}`
        }

        cookieValue += '; path=/'

        if (options?.secure) {
          cookieValue += '; secure'
        }

        if (options?.domain) {
          cookieValue += `; domain=${options.domain}`
        }

        document.cookie = cookieValue
        return true
      } catch {
        return false
      }
    },

    removeCookie(name: string): boolean {
      try {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        return true
      } catch {
        return false
      }
    }
  }
}

/**
 * Create attribution manager with fallback storage
 */
function createAttributionManager(
  config: TinybirdAnalyticsConfig
): AttributionManager {
  const storageManager = createStorageManager(config)

  return {
    getAttributionData(): AttributionData | null {
      const stored = storageManager.get(ATTRIBUTION_STORAGE_KEY)
      if (stored) {
        try {
          return JSON.parse(stored) as AttributionData
        } catch {
          storageManager.remove(ATTRIBUTION_STORAGE_KEY)
        }
      }
      return null
    },

    captureAttributionData(): void {
      const stored = this.getAttributionData()

      if (stored) {
        return
      }

      const urlParams = new URLSearchParams(window.location.search)
      const attributionData: AttributionData = {}

      // Capture UTM parameters
      const utmParams = [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content'
      ]
      utmParams.forEach((param) => {
        const value = urlParams.get(param)
        if (value) {
          attributionData[param as keyof AttributionData] = value
        }
      })

      // Only store if we have some attribution data
      if (Object.keys(attributionData).length > 0) {
        attributionData.landing_page = window.location.pathname
        attributionData.referrer = document.referrer
        this.setAttributionToStorage(attributionData)
      }
    },

    setAttributionToStorage(data: AttributionData): void {
      const storageManager = createStorageManager(config)
      const success = storageManager.set(
        ATTRIBUTION_STORAGE_KEY,
        JSON.stringify(data),
        { expiry: 24 * 60 * 60 } // 24 hours
      )

      if (!success) {
        console.warn('Failed to store attribution data in all storage methods')
      }
    }
  }
}

/**
 * Get country and locale from timezone and navigator
 */
function getCountryAndLocale(): CountryLocale {
  let country: string | undefined
  let locale: string | undefined

  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const countryData = getCountryForTimezone(timezone)
    country = countryData?.id

    locale =
      navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language || 'en'
  } catch (error) {
    // ignore error
    console.info('Error getting country and locale:', error)
  }

  return { country, locale }
}

/**
 * Get common properties used across all analytics events
 */
function getCommonProperties(
  attributionManager?: AttributionManager
): Record<string, unknown> {
  const { country, locale } = getCountryAndLocale()
  const attributionData = attributionManager?.getAttributionData()

  return {
    'user-agent': window.navigator.userAgent,
    locale,
    location: country,
    referrer: document.referrer,
    pathname: window.location.pathname,
    href: window.location.href,
    // Attribution data
    ...(attributionData?.utm_source && {
      utm_source: attributionData.utm_source
    }),
    ...(attributionData?.utm_medium && {
      utm_medium: attributionData.utm_medium
    }),
    ...(attributionData?.utm_campaign && {
      utm_campaign: attributionData.utm_campaign
    }),
    ...(attributionData?.utm_term && { utm_term: attributionData.utm_term }),
    ...(attributionData?.utm_content && {
      utm_content: attributionData.utm_content
    }),
    ...(attributionData?.landing_page && {
      landing_page: attributionData.landing_page
    }),
    ...(attributionData?.referrer && {
      original_referrer: attributionData.referrer
    })
  }
}

/**
 * Try to mask PII and potential sensitive attributes
 */
const _maskSuspiciousAttributes = (payload: TinybirdEvent): string => {
  const attributesToMask = [
    'username',
    'user',
    'user_id',
    'userid',
    'password',
    'pass',
    'pin',
    'passcode',
    'token',
    'api_token',
    'email',
    'address',
    'phone',
    'sex',
    'gender',
    'order',
    'order_id',
    'orderid',
    'payment',
    'credit_card'
  ]

  // Deep copy
  let _payload = JSON.stringify(payload)
  attributesToMask.forEach((attr) => {
    _payload = _payload.replaceAll(
      new RegExp(`("${attr}"):(".+?"|\\d+)`, 'mgi'),
      '$1:"********"'
    )
  })

  return _payload
}

/**
 * Validation functions
 */
function _isValidUserAgent(userAgent?: string): boolean {
  if (!userAgent || typeof userAgent !== 'string') {
    return true
  }
  if (userAgent.length > 500) {
    return false
  }
  return true
}

function _isValidPayload(payloadStr?: string): boolean {
  if (!payloadStr || typeof payloadStr !== 'string') {
    return false
  }
  if (payloadStr.length < 2 || payloadStr.length > 10240) {
    return false
  }
  return true
}

/**
 * Create session manager with fallback storage
 */
function createSessionManager(config: TinybirdAnalyticsConfig): SessionManager {
  const storageManager = createStorageManager(config)

  return {
    getSessionId(): string | null {
      // Try to get from storage
      const stored = storageManager.get(STORAGE_KEY)

      if (stored) {
        const sessionData = parseSessionData(stored)
        if (sessionData && !isSessionExpired(sessionData)) {
          return sessionData.value
        }
      }

      // Generate new session if none exists or expired
      const newSessionId = _uuidv4()
      this.setSessionId(newSessionId)
      return newSessionId
    },

    setSessionId(sessionId: string): void {
      const sessionData: SessionItem = {
        value: sessionId,
        expiry: Date.now() + 30 * 60 * 1000 // 30 minutes
      }

      const success = storageManager.set(
        STORAGE_KEY,
        JSON.stringify(sessionData),
        { expiry: 1800 } // 30 minutes
      )

      if (!success) {
        console.warn('Failed to store session ID in all storage methods')
      }
    }
  }
}

/**
 * Tinybird Analytics
 */
const tinybirdAnalytics = (
  config: TinybirdAnalyticsConfig = {}
): TinybirdAnalytics => {
  // Validate required configuration
  if (!config.token && !config.proxy && !config.proxyUrl) {
    throw new Error(
      'Tinybird analytics requires either token, proxy, or proxyUrl'
    )
  }

  // Check if both proxy and proxyUrl are specified
  if (config.proxy && config.proxyUrl) {
    throw new Error(
      'Both proxy and proxyUrl are specified. Please use only one of them.'
    )
  }

  if (config.webVitals) {
    const sendMetric = (metric: WebVital): void => {
      try {
        track('web_vital', metric as unknown as TinybirdEvent)
      } catch (error) {
        console.error('Error sending web vital:', error)
      }
    }

    onCLS(sendMetric)
    onFCP(sendMetric)
    onLCP(sendMetric)
    onTTFB(sendMetric)
    onINP(sendMetric)
  }

  const configWithDefaults = {
    // Default configuration
    token: null,
    host: null,
    proxy: null,
    proxyUrl: null,
    domain: null,
    datasource: 'analytics_events',
    storage: 'localStorage' as StorageMethod,
    storageFallbacks: ['sessionStorage', 'cookie'] as StorageMethod[],
    enableMemoryFallback: true,
    stringifyPayload: true,
    globalAttributes: {},
    webVitals: false,
    ...config
  } as TinybirdAnalyticsConfig

  const sessionManager = createSessionManager(configWithDefaults)
  const attributionManager = createAttributionManager(configWithDefaults)

  const sendEvent = (eventName: string, event: TinybirdEvent): void => {
    const config = configWithDefaults

    // Set session ID
    sessionManager.setSessionId(sessionManager.getSessionId() || _uuidv4())

    // Validate user agent
    if (!_isValidUserAgent(window.navigator.userAgent)) {
      return
    }

    // Determine URL
    let url: string
    if (config.proxyUrl) {
      url = config.proxyUrl
    } else if (config.proxy) {
      url = `${config.proxy}/api/tracking`
    } else if (config.host) {
      const cleanHost = config.host.replace(/\/+$/gm, '')
      url = `${cleanHost}/v0/events?name=${config.datasource}&token=${config.token}`
    } else {
      url = `https://api.tinybird.co/v0/events?name=${config.datasource}&token=${config.token}`
    }

    // Process payload
    let processedPayload: TinybirdEvent | string
    if (config.stringifyPayload) {
      processedPayload = _maskSuspiciousAttributes(event)
      processedPayload = Object.assign(
        {},
        JSON.parse(processedPayload),
        config.globalAttributes,
        { storage: config.storage }
      )
      processedPayload = JSON.stringify(processedPayload)

      if (!_isValidPayload(processedPayload)) {
        return
      }
    } else {
      processedPayload = Object.assign({}, event, config.globalAttributes, {
        storage: config.storage
      })
      const maskedStr = _maskSuspiciousAttributes(processedPayload)

      if (!_isValidPayload(maskedStr)) {
        return
      }

      processedPayload = JSON.parse(maskedStr)
    }

    const sessionId = sessionManager.getSessionId() || _uuidv4()

    const tinybirdEvent = {
      timestamp: new Date().toISOString(),
      action: eventName,
      version: '1',
      session_id: sessionId,
      payload: processedPayload
    }

    if (import.meta.env.DEV) {
      console.log('Analytics Event Captured:', tinybirdEvent)
    } else {
      // Use Beacon API for better performance and reliability
      const eventData = JSON.stringify(tinybirdEvent)

      // Check if Beacon API is supported
      if (navigator.sendBeacon && navigator.sendBeacon(url, eventData)) {
        // Beacon API successfully sent the data
        return
      }

      // Fallback to XMLHttpRequest if Beacon API is not supported or fails
      const request = new XMLHttpRequest()
      request.open('POST', url, true)
      request.setRequestHeader('Content-Type', 'application/json')
      request.send(eventData)
    }
  }

  const track = (eventName: string, event: TinybirdEvent): void => {
    const eventData: TinybirdEvent = {
      ...event,
      // Add context data
      ...getCommonProperties(attributionManager)
    }

    // Send the event
    sendEvent(eventName, eventData)
  }

  const page = (event: TinybirdEvent): void => {
    // Send the event
    track('page_hit', event)
  }

  const _identify = (
    instance: TinybirdAnalytics,
    event: TinybirdIdentityEvent
  ): void => {
    if (event.userId) {
      instance._userId = event.userId
    }

    const identifyData: TinybirdEvent = {
      userId: instance._userId,
      ...event.traits,
      ...getCommonProperties(attributionManager)
    }

    // Send identify event
    sendEvent('identify', identifyData)
  }

  const tinybirdAnalyticsInstance = {
    config: configWithDefaults,
    _sessionManager: sessionManager,
    _attributionManager: attributionManager,
    sendEvent,
    page,
    track,
    identify: (event: TinybirdIdentityEvent) => {
      _identify(tinybirdAnalyticsInstance, event)
    },
    set _userId(userId: string) {
      this._userId = userId
    },
    get _userId(): string {
      return this._userId
    }
  }

  if (typeof window !== 'undefined') {
    window.tinybirdAnalytics = tinybirdAnalyticsInstance
  }

  attributionManager?.captureAttributionData()

  return tinybirdAnalyticsInstance
}

export default tinybirdAnalytics
export type {
  AttributionData,
  StorageManager,
  StorageMethod,
  StorageOptions,
  TinybirdAnalytics,
  TinybirdAnalyticsConfig,
  TinybirdEvent,
  TinybirdIdentityEvent
}
