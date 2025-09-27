// Client-side analytics initialization
import { initTinybirdAnalytics } from 'tinybird-analytics'

// Initialize analytics with Tinybird plugin
const analytics = initTinybirdAnalytics({
  token: import.meta.env.PUBLIC_TINYBIRD_TRACKER_TOKEN,
  host: import.meta.env.PUBLIC_TINYBIRD_HOST,
  datasource: 'analytics_events',
  storage: 'localStorage',
  domain: 'adaptivealchemist.com',
  tenantId: 'the-adaptive-alchemist',
  webVitals: true,
  globalAttributes: {
    site: 'the-adaptive-alchemist'
  },
  devMode: import.meta.env.DEV,
  enableClickTracking: true
})

export default analytics
