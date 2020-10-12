require('dotenv').config()

const { Client, Collection } = require('discord.js')
const fs = require('fs')
const chalk = require('chalk')
const fetch = require('node-fetch')

const client = global.client = new Client()
client.meta = new Collection()

console.log(chalk.blueBright('[CLIENT]'), 'Starting client')

// Store info
console.log(chalk.blueBright('[CHEAPSHARK]'), 'Requesting store information')

const requestStores = async () => {
  const stores = await fetch('https://www.cheapshark.com/api/1.0/stores').then(res => res.json())

  return stores
}

requestStores().then(stores => {
  client.gameStores = new Collection()

  for (const store of stores) {
    client.gameStores.set(store.storeID, store.storeName)
  }

  console.info(chalk.greenBright('[CHEAPSHARK]'), `${client.gameStores.size} game stores are available`)
})

// Event/Command Handling
client.commands = new Collection()
client.events = new Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)

  console.log(chalk.blueBright('[COMMANDS]'), `Loaded ${command.name}`)
}

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

console.info(chalk.greenBright('[COMMANDS]'), `${client.commands.size} commands have been loaded`)
console.info(chalk.greenBright('[EVENTS]'), `${client.events.size} events have been loaded`)

client.login(process.env.DISCORD_TOKEN)
