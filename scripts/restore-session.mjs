import { readFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const snapshotPath = path.join(root, 'handoff', 'session-state.json')
const currentStatePath = path.join(root, 'handoff', 'CURRENT_STATE.md')

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'))
}

try {
  const snapshot = await readJson(snapshotPath)
  const currentState = await readFile(currentStatePath, 'utf8')

  console.log(`Session snapshot: ${snapshot.savedAt}`)
  console.log(`Project root: ${snapshot.project.root}`)
  console.log('')
  console.log('Recovery checklist:')
  if (snapshot.recovery.checklist.length === 0) {
    console.log('- No checklist items recorded in handoff/CURRENT_STATE.md')
  } else {
    for (const item of snapshot.recovery.checklist) {
      console.log(item)
    }
  }
  console.log('')
  console.log('Recent files:')
  for (const file of snapshot.recentFiles) {
    console.log(`- ${file.path} (${file.modifiedAt})`)
  }
  console.log('')
  console.log('Current state:')
  console.log(currentState.trim())
} catch (error) {
  console.error(
    'Session restore failed. Run `npm run session:save` after creating handoff/CURRENT_STATE.md.'
  )
  console.error(error.message)
  process.exitCode = 1
}
