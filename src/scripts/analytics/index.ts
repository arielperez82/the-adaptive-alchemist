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
      domain: 'adaptivealchemist.com',
      tenantId: 'the-adaptive-alchemist',
      webVitals: true,
      globalAttributes: {
        site: 'the-adaptive-alchemist'
      }
    })
  ]
})

// Make analytics available globally
window.analytics = analytics

export default analytics
