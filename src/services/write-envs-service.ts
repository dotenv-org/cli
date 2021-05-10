import * as fs from 'fs'

class WriteEnvsService {
  run() {
    const dir = process.cwd()

    const meUid = crypto.randomBytes(32).toString('hex') // 64 length
    const projectUid = crypto.randomBytes(32).toString('hex') // 64 length

    const dotenvFile = '.env'
    const meFile = '.env.me'
    const projectFile = '.env.project'

    const dotenvData = 'KEY=value'
    const meData = 'DOTENV_ME=me_' + meUid
    const projectName = dir.split("/")[dir.split("/").length-1]
    const projectData = `DOTENV_PROJECT=prj_${projectUid}\nDOTENV_PROJECT_NAME=${projectName}`

    // 1. write .env
    if (fs.existsSync(dotenvFile)) {
      // do nothing
    } else {
      fs.writeFileSync(dotenvFile, dotenvData)
    }

    // 2. write .env.me
    if (fs.existsSync(meFile)) {
      // do nothing
    } else {
      fs.writeFileSync(meFile, meData)
    }

    // 3. write .env.project
    if (fs.existsSync(projectFile)) {
      // do nothing
    } else {
      fs.writeFileSync(projectFile, projectData)
    }
  }
}

export {WriteEnvsService}
