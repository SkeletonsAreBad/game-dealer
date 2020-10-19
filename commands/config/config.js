const Command = require('../../util/Command.js')
const { MessageEmbed } = require('discord.js')

class Config extends Command {
  constructor () {
    super({
      name: 'config',
      description: 'View saved server settings.',
      guildOnly: true,
      category: 'Configuration'
    })
  }

  async run (message, args) {
    // TODO: implement permissions as part of the constructor
    if (!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send('You need `MANAGE_SERVER` permissions to view/modify settings.')

    const guildSettings = await message.settings.findOne({ where: { guildID: message.guild.id } })

    const feed = guildSettings.channelID ? guildSettings.channelID : 'None'

    const embed = new MessageEmbed()
      .setColor(process.env.EMBED_COLOR)
      .setTitle(`Settings for **${message.guild.name}**`)
      .addField('Feed Channel', message.client.channels.cache.get(feed), true)

    message.channel.send(embed)
  }
}

module.exports = Config
