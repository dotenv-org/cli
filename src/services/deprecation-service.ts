class DeprecationService {
  async run(command) {
    console.log('********* Warning: Deprecated *********')
    console.log('')
    console.log('This cli is deprecated. Please use dotenv-vault instead.')
    console.log('')
    console.log(`    npx dotenv-vault ${command}`)
    console.log('')
    console.log('***************************************')
  }
}

export {DeprecationService}
