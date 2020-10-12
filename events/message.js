const chalk = require('chalk')

module.exports = {
  run: (message) => {

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
  }
}