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

type StorageMethod = 'cookie' | 'localStorage' | 'sessionStorage'

interface SessionManager {
  getSessionIdFromCookie(): string | undefined
  getSessionId(): string | null
  setSessionIdFromCookie(sessionId: string): void
  setSessionId(): void
}

interface AttributionManager {
  getAttributionData(): AttributionData | null
  captureAttributionData(): void
  getAttributionFromStorage(): AttributionData | null
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

const storageMethods: Record<string, StorageMethod> = {
  cookie: 'cookie',
  localStorage: 'localStorage',
  sessionStorage: 'sessionStorage'
}

/**
 * Generate uuid to identify the session.
 */
function _uuidv4(): string {
  return crypto.randomUUID()
}

/**
 * Create attribution manager
 */
function createAttributionManager(
  config: TinybirdAnalyticsConfig
): AttributionManager {
  return {
    getAttributionData(): AttributionData | null {
      // First try to get from storage
      const storedData = this.getAttributionFromStorage()
      if (storedData) {
        return storedData
      }

      // If not in storage, capture and store
      this.captureAttributionData()
      return this.getAttributionFromStorage()
    },

    captureAttributionData(): void {
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

      // Capture landing page (current page if no stored data)
      const storedData = this.getAttributionFromStorage()
      if (!storedData?.landing_page) {
        attributionData.landing_page = window.location.pathname
      }

      // Capture referrer (document.referrer if no stored data)
      if (!storedData?.referrer && document.referrer) {
        attributionData.referrer = document.referrer
      }

      // Only store if we have some attribution data
      if (Object.keys(attributionData).length > 0) {
        this.setAttributionToStorage(attributionData)
      }
    },

    getAttributionFromStorage(): AttributionData | null {
      if (
        [storageMethods.localStorage, storageMethods.sessionStorage].includes(
          config.storage!
        )
      ) {
        const storage =
          config.storage === storageMethods.localStorage
            ? localStorage
            : sessionStorage
        const serializedData = storage.getItem(ATTRIBUTION_STORAGE_KEY)

        if (!serializedData) return null

        try {
          const data = JSON.parse(serializedData)
          return data as AttributionData
        } catch (error) {
          console.info('Error getting attribution data:', error)
          return null
        }
      }

      // For cookie storage, we'd need to implement cookie parsing
      // For now, return null for cookie storage
      return null
    },

    setAttributionToStorage(data: AttributionData): void {
      if (
        [storageMethods.localStorage, storageMethods.sessionStorage].includes(
          config.storage!
        )
      ) {
        const storage =
          config.storage === storageMethods.localStorage
            ? localStorage
            : sessionStorage
        storage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(data))
      }
      // For cookie storage, we'd need to implement cookie setting
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
 * Create session manager
 */
function createSessionManager(config: TinybirdAnalyticsConfig): SessionManager {
  return {
    getSessionIdFromCookie(): string | undefined {
      const cookie: Record<string, string> = {}
      document.cookie.split(';').forEach(function (el) {
        const [key, value] = el.split('=')
        cookie[key.trim()] = value
      })
      return cookie[STORAGE_KEY]
    },

    getSessionId(): string | null {
      if (
        [storageMethods.localStorage, storageMethods.sessionStorage].includes(
          config.storage!
        )
      ) {
        const storage =
          config.storage === storageMethods.localStorage
            ? localStorage
            : sessionStorage
        const serializedItem = storage.getItem(STORAGE_KEY)

        if (!serializedItem) return null

        let item: SessionItem | null = null
        try {
          item = JSON.parse(serializedItem)
        } catch (error) {
          console.info('Error getting session id:', error)
          return null
        }

        if (typeof item !== 'object' || item === null) return null

        const now = new Date()
        if (now.getTime() > item.expiry) {
          storage.removeItem(STORAGE_KEY)
          return null
        }

        return item.value
      }

      return this.getSessionIdFromCookie() || null
    },

    setSessionIdFromCookie(sessionId: string): void {
      let cookieValue = `${STORAGE_KEY}=${sessionId}; Max-Age=1800; path=/; secure`
      if (config.domain) {
        cookieValue += `; domain=${config.domain}`
      }
      document.cookie = cookieValue
    },

    setSessionId(): void {
      const sessionId = this.getSessionId() || _uuidv4()

      if (
        [storageMethods.localStorage, storageMethods.sessionStorage].includes(
          config.storage!
        )
      ) {
        const now = new Date()
        const item: SessionItem = {
          value: sessionId,
          expiry: now.getTime() + 1800 * 1000
        }
        const value = JSON.stringify(item)
        const storage =
          config.storage === storageMethods.localStorage
            ? localStorage
            : sessionStorage
        storage.setItem(STORAGE_KEY, value)
      } else {
        this.setSessionIdFromCookie(sessionId)
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
    storage: storageMethods.cookie,
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
    sessionManager.setSessionId()

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
        config.globalAttributes
      )
      processedPayload = JSON.stringify(processedPayload)

      if (!_isValidPayload(processedPayload)) {
        return
      }
    } else {
      processedPayload = Object.assign({}, event, config.globalAttributes)
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

  return tinybirdAnalyticsInstance
}

export default tinybirdAnalytics
export type {
  AttributionData,
  TinybirdAnalytics,
  TinybirdAnalyticsConfig,
  TinybirdEvent,
  TinybirdIdentityEvent
}
