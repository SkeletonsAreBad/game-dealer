const chalk = require('chalk')

module.exports = {
  run: (message) => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase()

    if (!global.client.commands.has(commandName)) return

    const command = global.client.commands.get(commandName) || global.client.commands.get(global.client.aliases.get(commandName))

    if (command.conf.dmOnly && message.channel.type !== 'dm') return message.channel.send('This command cannot be executed in a DM.')
    else if (command.guildOnly && message.channel.type === 'dm') return message.channel.send('This command can only be executed in a DM.')

    if (command.conf.admin && !process.env.ADMINS.split(',').includes(message.author.id)) {
      return message.channel.send('You do not have permission to execute this command.')
    }

    if (command.conf.argsOnly && !args.length) {
      let reply = 'You did not provide any arguments.'

      if (command.info.usage) reply += `\nUsage: \`${process.env.PREFIX}${command.info.name} ${command.info.usage}\``

      return message.channel.send(reply)
    }

    try {
      command.run(message, args)
    } catch (err) {
      console.error(chalk.redBright('[COMMANDS]'), `Error occurred while executing ${commandName}:\n${err}`)
    }
  }
}
