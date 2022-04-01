import {Command} from '@oclif/command'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {SetupService} from '../services/setup-service'
import {DeprecationService} from '../services/deprecation-service'

export default class Setup extends Command {
  static description = 'set up .env, .env.project, and .env.me'

  static args = [
    {
      name: 'dotenv_project',
      required: true,
      description: 'Uniquely identifies the project',
    },
    {
      name: 'dotenv_me',
      required: true,
      description: "Uniquely authorizes you to access this project's .env file",
    },
  ]

  async run() {
    const {argv} = this.parse(Setup)

    new DeprecationService().run('new')

    // 1. create gitignore
    await new AppendToGitignoreService().run()

    // 2. set up
    await new SetupService(argv[0], argv[1]).run()
  }
}
