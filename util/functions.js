const axios = require('axios').default
const chalk = require('chalk')
const klaw = require('klaw')
const path = require('path')

const requestStores = async () => {
  const stores = await axios.get('https://www.cheapshark.com/api/1.0/stores').then(res => res.data)

  console.log(chalk.blueBright('[CHEAPSHARK]'), 'Requesting store information')

  return stores
}

const loadCommand = (cmdPath, name) => {
  try {
    const props = new (require(`${cmdPath}${path.sep}${name}`))()
    console.log(chalk.blueBright('[COMMANDS]'), `Loaded ${props.info.name}`)
    props.conf.location = cmdPath
    if (props.initCommand) {
      props.initCommand()
    }
    global.client.commands.set(props.info.name, props)
    props.conf.aliases.forEach(alias => {
      global.client.aliases.set(alias, props.info.name)
    })
    return false
  } catch (error) { console.log({ error }) }
}

const initCommand = async () => {
  klaw('./commands').on('data', (item) => {
    const file = path.parse(item.path)
    if (!file.ext || file.ext !== '.js') return
    const response = loadCommand(file.dir, `${file.name}${file.ext}`)
    if (response) console.log('something went wrong :(')
  })
}

const wait = require('util').promisify(setTimeout)

module.exports = { requestStores, initCommand, loadCommand, wait }
