import {WriteEnvService} from '../services/write-env-service'
import {WriteEnvMeService} from '../services/write-env-me-service'
import {WriteEnvProjectService} from '../services/write-env-project-service'

interface WriteEnvsServiceParams {
  quiet?: boolean;
}

class WriteEnvsService {
  public quiet?: boolean;

  constructor(params: WriteEnvsServiceParams = {} as WriteEnvsServiceParams) {
    const {quiet = false} = params

    this.quiet = quiet
  }

  async run() {
    // 1. write .env
    new WriteEnvService({quiet: this.quiet}).run()

    // 2. write .env.me
    new WriteEnvMeService({quiet: this.quiet}).run()

    // 3. write .env.project
    new WriteEnvProjectService({quiet: this.quiet}).run()
  }
}

export {WriteEnvsService}
