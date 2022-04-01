class DeprecationService {
  async run(command) {
    console.log('********* Warning: Deprecated *********')
    console.log('')
    console.log('        This cli is deprecated!')
    console.log('    Please use dotenv-vault instead.')
    console.log('')
    console.log('               It\'s easy.')
    console.log('')
    console.log(`       $ npx dotenv-vault ${command}`)
    console.log('')
    console.log('   Visit www.dotenv.org to learn more.')
    console.log('')
    console.log('***************************************')
  }
}

export {DeprecationService}
