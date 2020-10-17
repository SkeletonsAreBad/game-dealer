const Command = require('../../util/Command.js')
const { MessageEmbed } = require('discord.js')

class Help extends Command {
  constructor () {
    super({
      name: 'help',
      description: 'you\'re using this command (I assume at least), the gist is obvious. Get help.',
      usage: '[command]'
    })
  }

  async run (message, args) {
    const layoutCommands = async (category) => {
      const valid = []
      for (const [name, value] of global.client.commands) {
        if (value.info.category === category) valid.push(name)
      }
      return valid.join('\n')
    }

    if (!args.length) {
      const embed = new MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setTitle('Help')
        .addField('Miscellaneous', `${await layoutCommands('Miscellaneous')}`, true)
        .addField('Stores', `${await layoutCommands('Stores')}`, true)
        .addField('Configuration', `${await layoutCommands('Configuration')}`, true)
        .addField('Admin', `${await layoutCommands('Admin')}`, true)
        .setFooter('If anyone knows how to make a good help command, tell me.')

      message.channel.send(embed)
    } else if (message.client.commands.has(args[0])) {
      const command = message.client.commands.get(args[0])

      const embed = new MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setTitle(`Help for **${command.info.name}**`)
        .setDescription(`**Description**\n${command.info.description}`)
        .addField('Category', command.info.category, true)
        .addField('Usage', `${process.env.PREFIX}${command.info.name} ${command.info.usage}`, true)

      message.channel.send(embed)
    } else message.channel.send("Command doesn't exist")
  }
}

module.exports = Help
