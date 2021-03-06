/*
const chalk = require('chalk')

module.exports = {
  name: 'reload',
  description: 'Reloads a command.',
  args: true,
  usage: '<command>',
  admin: true,
  execute (message, args) {
    const commandName = args[0].toLowerCase()
    const command = message.client.commands.get(commandName)

    if (!command) return message.channel.send(`\`${commandName}\` is not a valid command`)

    delete require.cache[require.resolve(`./${command.name}.js`)]

    try {
      const newCommand = require(`./${command.name}.js`)
      message.client.commands.set(newCommand.name, newCommand)

      message.channel.send(`Reloaded \`${newCommand.name}\``)
      console.log(chalk.blueBright('[COMMANDS]'), `Reloaded ${newCommand.name}`)
    } catch (err) {
      message.channel.send(`There was an error while reloading \`${command.name}\`\n\`\`\`js\n${err}\`\`\``)
      console.error(chalk.redBright('[COMMANDS]'), `Error occurred while reloading ${command.name}:\n${err}`)
    }
  }
}
*/
const Command = require('../../util/Command.js')

class Reload extends Command {
  constructor () {
    super({
      name: 'reload',
      description: 'Reloads a command.',
      argsOnly: true,
      category: 'Admin'
    })
  }

  async run (message, args) {
    const command = message.client.commands.get(args[0].toLowerCase())
    if (!command) return message.channel.send('Command does not exist.')
    // TODO: Make this work
  }
}

module.exports = Reload
