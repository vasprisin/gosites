import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const handoffDir = path.join(root, 'handoff')
const currentStatePath = path.join(handoffDir, 'CURRENT_STATE.md')
const snapshotPath = path.join(handoffDir, 'session-state.json')
const packagePath = path.join(root, 'package.json')
const envExamplePath = path.join(root, '.env.example')

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'))
}

async function readText(filePath, fallback = '') {
  try {
    return await readFile(filePath, 'utf8')
  } catch {
    return fallback
  }
}

async function listFiles(targetDir, maxDepth = 2, depth = 0) {
  const entries = await readdir(targetDir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.name.startsWith('.')) {
      continue
    }

    const fullPath = path.join(targetDir, entry.name)
    const relativePath = path.relative(root, fullPath)

    if (entry.isDirectory()) {
      if (depth < maxDepth) {
        files.push(...(await listFiles(fullPath, maxDepth, depth + 1)))
      }
      continue
    }

    files.push(relativePath)
  }

  return files.sort()
}

async function listRecentFiles(targetDirs, limit = 12) {
  const records = []

  for (const dirName of targetDirs) {
    const absoluteDir = path.join(root, dirName)
    try {
      const files = await listFiles(absoluteDir, 3)
      for (const relativeFile of files) {
        const absoluteFile = path.join(root, relativeFile)
        const fileStat = await stat(absoluteFile)
        records.push({
          path: relativeFile,
          modifiedAt: fileStat.mtime.toISOString(),
          modifiedMs: fileStat.mtimeMs,
        })
      }
    } catch {
      continue
    }
  }

  return records
    .sort((a, b) => b.modifiedMs - a.modifiedMs)
    .slice(0, limit)
    .map(({ modifiedMs, ...record }) => record)
}

function parseEnvKeys(envContents) {
  return envContents
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && line.includes('='))
    .map((line) => line.split('=')[0])
}

function extractChecklist(markdown) {
  return markdown
    .split('\n')
    .filter((line) => line.startsWith('- ['))
    .map((line) => line.trim())
}

const now = new Date().toISOString()
const packageJson = await readJson(packagePath)
const currentState = await readText(currentStatePath)
const envExample = await readText(envExamplePath)

const snapshot = {
  savedAt: now,
  project: {
    root,
    packageManager: 'npm',
    scripts: packageJson.scripts,
    dependencies: packageJson.dependencies,
  },
  recovery: {
    summaryPath: 'handoff/CURRENT_STATE.md',
    checklist: extractChecklist(currentState),
  },
  app: {
    keyFiles: await listFiles(path.join(root, 'app'), 2),
    componentFiles: await listFiles(path.join(root, 'components'), 3).catch(
      () => []
    ),
    libFiles: await listFiles(path.join(root, 'lib'), 2).catch(() => []),
  },
  env: {
    exampleKeys: parseEnvKeys(envExample),
  },
  recentFiles: await listRecentFiles(['app', 'components', 'lib', 'scripts']),
}

await mkdir(handoffDir, { recursive: true })
await writeFile(snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`)

console.log(`Saved session snapshot to ${path.relative(root, snapshotPath)}`)
