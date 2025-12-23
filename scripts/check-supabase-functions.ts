// Script to validate Supabase Edge Functions before deployment
import { execSync } from 'node:child_process'
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const supabaseFunctionsDir = 'supabase/functions'

interface FunctionCheckResult {
  name: string
  success: boolean
  error?: string
}

function checkFunction(functionName: string): FunctionCheckResult {
  const functionPath = join(supabaseFunctionsDir, functionName)
  const indexFile = join(functionPath, 'index.ts')
  const denoJson = join(functionPath, 'deno.json')

  try {
    // Check if function directory exists
    if (!statSync(functionPath).isDirectory()) {
      return {
        name: functionName,
        success: false,
        error: 'Function directory does not exist'
      }
    }

    // Check if index.ts exists
    if (!statSync(indexFile).isFile()) {
      return {
        name: functionName,
        success: false,
        error: 'index.ts not found'
      }
    }

    // Use deno check to validate the function
    // This will catch import errors, type errors, and other issues
    // Run from project root to ensure paths resolve correctly
    // Note: This validates code structure but doesn't install dependencies
    // (Supabase handles dependency installation during deployment)
    const denoJsonFlag = statSync(denoJson).isFile()
      ? `--import-map=${join(process.cwd(), denoJson)}`
      : ''

    execSync(
      `deno check --no-lock ${denoJsonFlag} ${join(process.cwd(), indexFile)}`,
      {
        cwd: process.cwd(),
        stdio: 'pipe',
        encoding: 'utf-8',
        env: { ...process.env, DENO_NO_PACKAGE_JSON: '1' }
      }
    )

    return {
      name: functionName,
      success: true
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return {
      name: functionName,
      success: false,
      error: errorMessage
    }
  }
}

function main() {
  const functionName = process.argv[2]

  if (functionName) {
    // Check specific function
    const result = checkFunction(functionName)
    if (result.success) {
      console.log(`✅ Function "${functionName}" is valid`)
      process.exit(0)
    } else {
      console.error(`❌ Function "${functionName}" has errors:`)
      console.error(result.error)
      process.exit(1)
    }
  } else {
    // Check all functions
    const functions = readdirSync(supabaseFunctionsDir).filter((item) => {
      const itemPath = join(supabaseFunctionsDir, item)
      return statSync(itemPath).isDirectory()
    })

    if (functions.length === 0) {
      console.error('No functions found')
      process.exit(1)
    }

    console.log(`Checking ${functions.length} function(s)...\n`)

    const results: FunctionCheckResult[] = functions.map((fn) =>
      checkFunction(fn)
    )

    const failed = results.filter((r) => !r.success)
    const passed = results.filter((r) => r.success)

    // Print results
    passed.forEach((result) => {
      console.log(`✅ ${result.name}`)
    })

    if (failed.length > 0) {
      console.log('\n❌ Failed functions:')
      failed.forEach((result) => {
        console.log(`\n${result.name}:`)
        console.log(`  ${result.error}`)
      })
      process.exit(1)
    }

    console.log(`\n✅ All ${functions.length} function(s) are valid`)
  }
}

main()
