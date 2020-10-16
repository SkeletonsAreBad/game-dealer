const { Client, Collection } = require('discord.js')
const fs = require('fs')
const chalk = require('chalk')

const { requestStores, initCommand } = require('./util/functions.js')

const client = global.client = new Client()

// Collections
client.commands = new Collection()
client.aliases = new Collection()
client.gameStores = new Collection()
client.events = new Collection()
client.meta = new Collection()

console.log(chalk.blueBright('[CLIENT]'), 'Starting client')

requestStores().then(stores => {
  if (stores === false) {
    client.gameStores.set('unavailable', true)
    console.log(chalk.bgRed('[SEVERE]'), 'Cheapshark stores are unavailable')
  } else {
    for (const store of stores) {
      client.gameStores.set(store.storeID, store.storeName)
    }
    console.log(chalk.greenBright('[CHEAPSHARK]'), `${client.gameStores.size} game stores are available`)
  }
})

// Command Handler
initCommand()

// Event Handler
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
  const eventFunction = require(`./events/${file}`)
  const event = eventFunction.event || file.split('.')[0]

  const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client
  const once = eventFunction.once

  console.log(chalk.blueBright('[EVENTS]'), `Loaded ${event}`)
  client.events.set(event)
  try {
    emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args))
  } catch (error) {
    console.error(chalk.redBright('[ERROR]'), `Error loading event. ${error.stack}`)
  }
}

// Misc logging and errors
console.log(chalk.greenBright('[EVENTS]'), `${client.events.size} events have been loaded`)

process.on('unhandledRejection', error => {
  console.error(chalk.redBright('[ERROR]'), `Unhandled Promise Rejection: ${error}`)
  process.exit(1)
})

// Client login
client.login(process.env.DISCORD_TOKEN)
