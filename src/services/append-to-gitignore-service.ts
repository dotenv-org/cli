import * as fs from 'fs'

class AppendToGitignoreService {
  run() {
    const file = '.gitignore'

    // 1. create .gitignore if doesn't exist
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, '')
    }

    const fileContent = fs.readFileSync(file)
    if (fileContent.indexOf('.env') === -1 || fileContent.indexOf('.env.me') === -1 || fileContent.indexOf('!.env.project') === -1) {
      // 2. add ignores from dotenv-cli (keep the ugly spacing to avoid added indentation on write)
      const ignore = `# Ignore (and don't ignore) for dotenv.
.env
.env.me
!.env.project`

      fs.appendFileSync(file, '\n' + ignore)
    }
  }
}

export {AppendToGitignoreService}
