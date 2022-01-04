import {vars} from '../vars'

class OutputNewProjectLinkService {
  async run() {
    const url = vars.apiUrl + '/v1/new'

    console.log('')
    console.log('********* TO CREATE A .ENV.PROJECT FILE *********')
    console.log('')
    console.log(`    Visit url \`${url}\``)
    console.log('')
    console.log('*************************************************')
    console.log('')
  }
}

export {OutputNewProjectLinkService}
