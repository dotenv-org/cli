import * as fs from 'fs'

class AppendToGitignoreService {
  run() {
    const file = '.gitignore'
    const addedForDotenvMsg = '# added for dotenv'

    // 1. create .gitignore if doesn't exist
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, '')
    }

    if (fs.readFileSync(file).indexOf(addedForDotenvMsg) === -1) {
      // 2. add ignores from dotenv-cli (keep the ugly spacing to avoid added indentation on write)
      const ignore = `${addedForDotenvMsg}
.env
.env.me
!.env.project`

      fs.appendFileSync(file, '\n' + ignore)
    }
  }
}

export {AppendToGitignoreService}
