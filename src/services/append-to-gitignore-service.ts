import * as fs from 'fs'

class AppendToGitignoreService {
  run() {
    const file = '.gitignore'

    const envFormat = '.env'
    const envMeFormat = '.env.me'
    const envProjectFormat = '!.env.project'

    let envExists = false
    let envMeExists = false
    let envProjectExists = false

    // 1. create .gitignore if doesn't exist
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, '')
    }

    // 2. iterate over gitignore lines
    const lines = fs.readFileSync(file, 'UTF-8').split(/\r?\n/)

    // 3. for each line check if ignore already exists
    lines.forEach(line => {
      const trimLine = line.trim()

      if (trimLine === envFormat) {
        envExists = true
      }

      if (trimLine === envMeFormat) {
        envMeExists = true
      }

      if (trimLine === envProjectFormat) {
        envProjectExists = true
      }
    })

    // 4. add ignore if it does not already exist
    if (envExists === false) {
      fs.appendFileSync(file, '\n' + envFormat)
    }
    if (envMeExists === false) {
      fs.appendFileSync(file, '\n' + envMeFormat)
    }
    if (envProjectExists === false) {
      fs.appendFileSync(file, '\n' + envProjectFormat)
    }
  }
}

export {AppendToGitignoreService}
