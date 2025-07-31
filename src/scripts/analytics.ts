// Client-side analytics initialization
import Analytics from 'analytics'
import doNotTrack from 'analytics-plugin-do-not-track'

import tinybirdPlugin from './tinybird-analytics-plugin'

// Initialize analytics with Tinybird plugin
const analytics = Analytics({
  app: 'the-adaptive-alchemist',
  plugins: [
    doNotTrack(),
    tinybirdPlugin({
      token: import.meta.env.PUBLIC_TINYBIRD_TRACKER_TOKEN,
      host: import.meta.env.PUBLIC_TINYBIRD_HOST,
      datasource: 'analytics_events',
      storage: 'localStorage',
      webVitals: true
    })
  ]
})

// Make analytics available globally
declare global {
  interface Window {
    analytics: typeof analytics
  }
}
window.analytics = analytics

export default analytics
