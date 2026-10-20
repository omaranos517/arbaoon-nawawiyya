import { readFileSync, writeFileSync } from 'node:fs'

const cfg = JSON.parse(readFileSync('app.config.json', 'utf8'))

writeFileSync(
  'capacitor.config.json',
  JSON.stringify({ appId: cfg.appId, appName: cfg.appName, webDir: 'dist' }, null, 2) + '\n',
)
