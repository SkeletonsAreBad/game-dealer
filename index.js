const { Client, Collection } = require('discord.js')
const fs = require('fs')
const chalk = require('chalk')

const { requestStores, initCommand } = require('./util/functions.js')

const client = global.client = new Client()
console.log(chalk.blueBright('[CLIENT]'), 'Starting client')

requestStores().then(stores => {
  client.gameStores = new Collection()

  for (const store of stores) {
    client.gameStores.set(store.storeID, store.storeName)
  }

  console.info(chalk.greenBright('[CHEAPSHARK]'), `${client.gameStores.size} game stores are available`)
})

// Collections
client.commands = new Collection()
client.aliases = new Collection()
client.events = new Collection()
client.meta = new Collection()

// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))

// Command Handler
initCommand()
/*
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)

  console.log(chalk.blueBright('[COMMANDS]'), `Loaded ${command.name}`)
}
*/

// Event Handler
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
    console.error(error.stack)
  }
}

// Misc logging and errors
console.info(chalk.greenBright('[EVENTS]'), `${client.events.size} events have been loaded`)

process.on('unhandledRejection', error => {
  console.error(chalk.redBright('[ERROR]'), `Unhandled Promise Rejection: ${error}`)
})

// Client login
client.login(process.env.DISCORD_TOKEN)
