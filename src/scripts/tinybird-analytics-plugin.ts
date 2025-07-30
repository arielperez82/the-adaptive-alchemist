/**
 * Tinybird Analytics Plugin for Analytics.js (TypeScript)
 * Compatible with Tinybird Web Analytics Starter Kit
 */

import initializeTinybirdAnalytics, {
  type TinybirdAnalyticsConfig,
  type TinybirdEvent,
  type TinybirdIdentityEvent
} from './tinybird-analytics'

type AnalyticsPayload = TinybirdIdentityEvent & {
  event?: string
  properties?: TinybirdEvent
}

type TinybirdPluginConfig = TinybirdAnalyticsConfig

/**
 * Tinybird Analytics Plugin
 */
function tinybirdPlugin(pluginConfig: TinybirdPluginConfig = {}) {
  return {
    name: 'tinybird-analytics',
    config: pluginConfig,

    initialize: ({ config }: { config: TinybirdPluginConfig }) => {
      // NoOp if tinybirdAnalytics already loaded by external source or already loaded
      if (typeof window.tinybirdAnalytics !== 'undefined') {
        return
      }

      initializeTinybirdAnalytics(config)
    },
    page: ({ payload: { properties = {} } }: { payload: AnalyticsPayload }) => {
      window.tinybirdAnalytics.page(properties)
    },

    track: ({
      payload: { event, properties = {} }
    }: {
      payload: AnalyticsPayload
    }) => {
      window.tinybirdAnalytics.track(event!, properties)
    },

    identify: ({
      payload: { userId, traits = {} }
    }: {
      payload: AnalyticsPayload
    }) => {
      window.tinybirdAnalytics.identify({ userId, traits })
    },

    loaded: (): boolean => {
      return true
    }
  }
}

export default tinybirdPlugin
export type { TinybirdPluginConfig }
