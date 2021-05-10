import {Command} from '@oclif/command'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {WriteEnvsService} from '../services/write-envs-service'
import {PullService} from '../services/pull-service'

export default class Pull extends Command {
  static description = 'pull .env'

  async run() {
    // 1. create gitignore
    new AppendToGitignoreService().run()

    // 2. create envs
    new WriteEnvsService().run()

    // 3. pull
    new PullService().run()
  }
}
