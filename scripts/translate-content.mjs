import { existsSync, readFileSync, symlinkSync } from 'node:fs'
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsRoot = path.join(__dirname, '..')

loadEnvFile(path.join(docsRoot, '.env'))

/** Docus maps zh-CN → zh_CN and pt-BR → pt_BR for content collections. */
const COLLECTION_ALIASES = [
  ['zh-CN', 'zh_CN'],
  ['pt-BR', 'pt_BR'],
]

const apiKey = process.env.GT_API_KEY
const projectId = process.env.GT_PROJECT_ID

if (!apiKey || !projectId) {
  console.warn(
    '[translate] Skipping General Translation — set GT_API_KEY and GT_PROJECT_ID to generate localized docs.',
  )
  console.warn('[translate] Get free keys at https://generaltranslation.com/dashboard')
  linkCollectionAliases()
  process.exit(0)
}

const gtBin = path.join(docsRoot, 'node_modules', '.bin', 'gt')
const command = existsSync(gtBin) ? gtBin : 'npx'
const args = existsSync(gtBin) ? ['translate'] : ['gt', 'translate']

console.log('[translate] Running General Translation for localized content…')

const child = spawn(command, args, {
  cwd: docsRoot,
  stdio: 'inherit',
  env: process.env,
})

child.on('exit', (code) => {
  if (code !== 0) {
    console.error(`[translate] gt translate exited with code ${code}`)
    process.exit(code ?? 1)
  }

  linkCollectionAliases()
})

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return

  for (const line of readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separator = trimmed.indexOf('=')
    if (separator === -1) continue

    const key = trimmed.slice(0, separator).trim()
    let value = trimmed.slice(separator + 1).trim()

    if (
      (value.startsWith('"') && value.endsWith('"'))
      || (value.startsWith('\'') && value.endsWith('\''))
    ) {
      value = value.slice(1, -1)
    }

    if (!(key in process.env)) {
      process.env[key] = value
    }
  }
}

function linkCollectionAliases() {
  for (const [localeCode, collectionCode] of COLLECTION_ALIASES) {
    const source = path.join(docsRoot, 'content', localeCode)
    const target = path.join(docsRoot, 'content', collectionCode)

    if (!existsSync(source) || existsSync(target)) continue

    try {
      symlinkSync(source, target, 'dir')
      console.log(`[translate] Linked content/${localeCode} → content/${collectionCode}`)
    }
    catch (err) {
      console.warn(`[translate] Could not link ${localeCode} → ${collectionCode}:`, err.message)
    }
  }
}
