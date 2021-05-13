import * as fs from 'fs'
import * as crypto from 'crypto'
import * as signale from 'signale'

class WriteEnvsService {
  run() {
    const dir = process.cwd()

    const meUid = crypto.randomBytes(32).toString('hex') // 64 length
    const projectUid = crypto.randomBytes(32).toString('hex') // 64 length

    const dotenvFile = '.env'
    const meFile = '.env.me'
    const projectFile = '.env.project'

    const dotenvData = `# added by dotenv - do not commit this file to code
KEY=value`

    const meData = `# added by dotenv - do not commit this file to code
# this file uniquely identifies you for this project
# keep it safe, but if you lose it or expose it publicly, you can always generate a new one at dotenv.org
DOTENV_ME=me_${meUid}`
    const projectName = dir.split('/')[dir.split('/').length - 1]
    const projectData = `# added by dotenv - you SHOULD commit this file to code
# this file uniquely identifies your project at dotenv.org
DOTENV_PROJECT=prj_${projectUid}
DOTENV_PROJECT_NAME=${projectName}`

    // 1. write .env
    if (fs.existsSync(dotenvFile)) {
      signale.success('Existing .env.')
    } else {
      fs.writeFileSync(dotenvFile, dotenvData)
      signale.success('Created .env.')
    }

    // 2. write .env.me
    if (fs.existsSync(meFile)) {
      signale.success('Existing .env.me.')
    } else {
      fs.writeFileSync(meFile, meData)
      signale.success('Created .env.me.')
    }

    // 3. write .env.project
    if (fs.existsSync(projectFile)) {
      signale.success('Existing .env.project.')
    } else {
      fs.writeFileSync(projectFile, projectData)
      signale.success('Created .env.project.')
    }
  }
}

export {WriteEnvsService}
