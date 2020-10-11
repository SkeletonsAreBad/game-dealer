require('dotenv').config()

const { Client, Collection } = require('discord.js')
const fs = require('fs')
const chalk = require('chalk')
const fetch = require('node-fetch')

const client = new Client()
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

// Command handling
client.commands = new Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)

  console.log(chalk.blueBright('[COMMANDS]'), `Loaded ${command.name}`)
}

console.info(chalk.greenBright('[COMMANDS]'), `${client.commands.size} commands have been loaded`)

// Ready event
client.once('ready', () => {
  client.meta.set('invite', `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=537168960&scope=bot`)

  console.info(chalk.greenBright('[CLIENT]'), `Logged in as ${client.user.tag}`)
  console.log(chalk.blueBright('[CLIENT]'), `Invite the bot at: ${client.meta.get('invite')}`)

  client.user.setActivity(`${process.env.PREFIX}help`, { type: 'LISTENING' })
})

client.on('guildCreate', guild => {
  console.log(chalk.blueBright('[CLIENT]'), `Added to guild: ${guild.name} (${guild.id})`)

  guild.member(client.user.id).setNickname('Mr Deals', 'Thanks for the invite!')
})

client.on('guildDelete', guild => {
  console.log(chalk.blueBright('[CLIENT]'), `Removed from guild: ${guild.name} (${guild.id})`)
})

client.on('message', async message => {
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/)
  const commandName = args.shift().toLowerCase()

  if (!client.commands.has(commandName)) return

  const command = client.commands.get(commandName)

  if (command.dmOnly && message.channel.type !== 'dm') return message.channel.send('This command cannot be executed in a DM.')
  else if (command.guildOnly && message.channel.type === 'dm') return message.channel.send('This command can only be executed in a DM.')

  if (command.args && !args.length) {
    let reply = 'You did not provide any arguments.'

    if (command.usage) reply += `\nUsage: \`${process.env.PREFIX}${command.name} ${command.usage}\``

    return message.channel.send(reply)
  }

  try {
    command.execute(message, args)
  } catch (err) {
    console.error(chalk.redBright('[COMMANDS]'), `Error occurred while executing ${commandName}:\n${err}`)
  }
})

client.login(process.env.DISCORD_TOKEN)
