import { createClient } from '@supabase/supabase-js'

interface KeepAliveResult {
  pendingCount: number
  timestamp: string
}

async function keepSupabaseActive(): Promise<void> {
  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        'Missing required environment variables: SUPABASE_URL or SUPABASE_ANON_KEY'
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Query the number of pending subscriptions
    const { error, count } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    if (error) {
      throw new Error(`Database query failed: ${error.message}`)
    }

    const result: KeepAliveResult = {
      pendingCount: count || 0,
      timestamp: new Date().toISOString()
    }

    console.log(`Supabase keep-alive successful`)
    console.log(`Pending subscriptions: ${result.pendingCount}`)
    console.log(`Executed at: ${result.timestamp}`)
  } catch (error) {
    console.error('Failed to keep Supabase active:', error)
    process.exit(1)
  }
}

keepSupabaseActive()
