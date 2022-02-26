import * as fs from 'fs'

class SetupService {
  dotenv_project: string

  dotenv_me: string

  constructor(dotenv_project: string, dotenv_me: string) {
    this.dotenv_project = dotenv_project
    this.dotenv_me = dotenv_me
  }

  async run() {
    const envFile = '.env'
    const projectFile = '.env.project'
    const meFile = '.env.me'

    console.log('local:')

    // .env
    if (fs.existsSync(envFile)) {
      console.log('local: Found .env')
      // do nothing
    } else {
      console.log('local: Creating .env')
      fs.writeFileSync(envFile, 'HELLO=world')
    }

    // .env.project
    console.log('local: Creating .env.project')
    fs.writeFileSync(projectFile, `DOTENV_PROJECT=${this.dotenv_project}`)

    // .env.me
    console.log('local: Creating .env.me')
    fs.writeFileSync(meFile, `DOTENV_ME=${this.dotenv_me}`)

    console.log('local:')
    console.log('Setup complete.')
    console.log('')
    console.log('Try running `dotenv-cli push` next.')
  }
}

export {SetupService}
