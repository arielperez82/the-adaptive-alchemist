// build-scripts/fix-astro-comments.ts
import * as fs from 'fs'
import { glob } from 'glob'
import url from 'url'

interface FixResult {
  filePath: string
  wasModified: boolean
  errorMessage?: string
}

/**
 * Fixes HTML comments in Astro files by adding prettier-ignore comments
 * when HTML comments appear within HTML context
 */
function fixAstroComments(content: string): string {
  // Add prettier-ignore before HTML comments that are within HTML context
  // This regex looks for:
  // 1. Optional leading whitespace
  // 2. HTML comment that doesn't already have prettier-ignore
  // 3. Optional trailing whitespace
  // 4. Followed by an HTML tag (not another comment)
  return content.replace(
    /^(\s*)(<!--(?!\s*prettier-ignore).*?-->)(\s*?)(?=\s*<(?!!))/gm,
    '$1{/* prettier-ignore */}\n$1$2$3'
  )
}

/**
 * More sophisticated version that handles additional edge cases
 */
function fixAstroCommentsAdvanced(content: string): string {
  const lines = content.split('\n')
  const processedLines: string[] = []

  let frontmatterDelimiterCount = 0
  let inTemplate = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Track frontmatter boundaries
    if (line.trim() === '---') {
      frontmatterDelimiterCount++
      inTemplate = frontmatterDelimiterCount === 2
    }

    // Only process template section
    if (inTemplate && line.includes('<!--')) {
      if (isHtmlCommentInContext(lines, i)) {
        const indentation = line.match(/^\s*/)?.[0] || ''
        processedLines.push(`${indentation}{/* prettier-ignore */}`)
      }
    }

    processedLines.push(line)
  }

  return processedLines.join('\n')
}

/**
 * Checks if an HTML comment is within HTML context
 */
function isHtmlCommentInContext(lines: string[], lineIndex: number): boolean {
  const line = lines[lineIndex]

  // Quick check: if line has both HTML tags and comments
  if (/<[^>]+>/.test(line) && /<!--/.test(line)) {
    return true
  }

  // Check if we're inside JSX expressions with HTML
  const hasJsxExpression = /\{[^}]*<!--/.test(line)
  if (hasJsxExpression) {
    return true
  }

  // Check context of surrounding lines (look 2 lines before and after)
  const contextStart = Math.max(0, lineIndex - 2)
  const contextEnd = Math.min(lines.length, lineIndex + 3)
  const context = lines.slice(contextStart, contextEnd).join('\n')

  // Pattern for being inside HTML elements
  const withinHtmlPattern = /<[^/>][^>]*>\s*<!--[\s\S]*?-->\s*<\/[^>]*>/
  const betweenHtmlPattern = />\s*<!--[\s\S]*?-->\s*</
  const inAttributePattern = /<[^>]*<!--[^>]*>/

  return (
    withinHtmlPattern.test(context) ||
    betweenHtmlPattern.test(context) ||
    inAttributePattern.test(context)
  )
}

/**
 * Processes a single Astro file
 */
async function processAstroFile(
  filePath: string,
  useAdvanced = false
): Promise<FixResult> {
  try {
    const content = await fs.promises.readFile(filePath, 'utf8')
    const fixed = useAdvanced
      ? fixAstroCommentsAdvanced(content)
      : fixAstroComments(content)

    const wasModified = fixed !== content

    if (wasModified) {
      await fs.promises.writeFile(filePath, fixed, 'utf8')
    }

    return {
      filePath,
      wasModified
    }
  } catch (error) {
    return {
      filePath,
      wasModified: false,
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Main function to fix all Astro files
 */
async function fixAllAstroFiles(
  pattern = 'src/**/*.astro',
  options: { useAdvanced?: boolean; verbose?: boolean } = {}
): Promise<void> {
  const { useAdvanced = false, verbose = true } = options

  try {
    const astroFiles = await glob(pattern)

    if (astroFiles.length === 0) {
      console.log('No Astro files found matching pattern:', pattern)
      return
    }

    if (verbose) {
      console.log(`Found ${astroFiles.length} Astro file(s) to process...`)
    }

    const results = await Promise.all(
      astroFiles.map((file) => processAstroFile(file, useAdvanced))
    )

    const modifiedFiles = results.filter((result) => result.wasModified)
    const errorFiles = results.filter((result) => result.errorMessage)

    if (verbose) {
      console.log(`\n✅ Processed ${astroFiles.length} file(s)`)
      console.log(`📝 Modified ${modifiedFiles.length} file(s)`)

      if (modifiedFiles.length > 0) {
        console.log('\nModified files:')
        modifiedFiles.forEach((result) => {
          console.log(`  - ${result.filePath}`)
        })
      }

      if (errorFiles.length > 0) {
        console.log('\n❌ Errors:')
        errorFiles.forEach((result) => {
          console.log(`  - ${result.filePath}: ${result.errorMessage}`)
        })
      }
    }
  } catch (error) {
    console.error('Error processing Astro files:', error)
    process.exit(1)
  }
}

// CLI usage
if (import.meta.url === url.pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2)
  const useAdvanced = args.includes('--advanced')
  const quiet = args.includes('--quiet')
  const pattern = args.find((arg) => !arg.startsWith('--')) || 'src/**/*.astro'

  fixAllAstroFiles(pattern, {
    useAdvanced,
    verbose: !quiet
  }).catch(console.error)
}

// Export for programmatic usage
export {
  fixAllAstroFiles,
  fixAstroComments,
  fixAstroCommentsAdvanced,
  type FixResult,
  processAstroFile
}
