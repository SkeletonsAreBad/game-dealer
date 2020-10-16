const Command = require('../../util/Command.js')
const { MessageEmbed } = require('discord.js')

class Help extends Command {
  constructor () {
    super({
      name: 'help',
      description: 'you\'re using this command (I assume at least), the gist is obvious. Get help.'
    })
  }

  async run (message, args) {
    const commandsField = []
    message.client.commands.forEach(c => commandsField.push(c.name))

    if (!args.length) {
      const embed = new MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setTitle('Help')
        .addField('Available Commands', commandsField.join('\n'))

      message.channel.send(embed)
    } else if (args.length !== 2 && commandsField.includes(args[0])) {
      const command = message.client.commands.get(args[0])

      const embed = new MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setTitle(`Help for \`${command.name}\``)
        .addField('Description', command.description)
        .addField('Usage', `${process.env.PREFIX}${command.name} ${command.usage ? command.usage : ''}`)

      message.channel.send(embed)
    } else message.channel.send("Command doesn't exist")
  }
}

module.exports = Help