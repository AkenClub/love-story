import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const version = packageJson.version
const repository = process.env.DOCKER_REPOSITORY ?? 'ppken/love-story'

if (typeof version !== 'string' || !/^\d+\.\d+\.\d+(?:[-.][0-9A-Za-z.-]+)?$/.test(version)) {
  throw new Error(`Invalid package version: ${String(version)}`)
}

const images = [
  { tag: version, dockerfile: 'infra/docker/all.Dockerfile', label: 'Web + API' },
  { tag: `${version}-web`, dockerfile: 'infra/docker/web.Dockerfile', label: 'Web' },
  { tag: `${version}-api`, dockerfile: 'infra/docker/api.Dockerfile', label: 'API' },
]

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit', shell: process.platform === 'win32' })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

for (const image of images) {
  const name = `${repository}:${image.tag}`
  console.log(`\nBuilding ${image.label}: ${name}`)
  run('docker', ['build', '--file', image.dockerfile, '--tag', name, '.'])
}

for (const image of images) {
  const name = `${repository}:${image.tag}`
  console.log(`\nPushing ${image.label}: ${name}`)
  run('docker', ['push', name])
}
