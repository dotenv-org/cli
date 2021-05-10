import {Command} from '@oclif/command'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {WriteEnvsService} from '../services/write-envs-service'
import {PushService} from '../services/push-service'

export default class Push extends Command {
  static description = 'push .env'

  async run() {
    // 1. create gitignore
    new AppendToGitignoreService().run()

    // 2. create envs
    new WriteEnvsService().run()

    // 3. push
    new PushService().run()
  }
}
