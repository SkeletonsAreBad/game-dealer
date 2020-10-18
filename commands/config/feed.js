const Command = require('../../util/Command.js')
const { MessageEmbed } = require('discord.js')

class Feed extends Command {
  constructor () {
    super({
      name: 'feed',
      description: 'Set the game deals channel.',
      argsOnly: true,
      category: 'Configuration'
    })
  }

  async run (message, args) {
    // TODO: implement permissions as part of the constructor
    if (!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send('You need `MANAGE_SERVER` permissions to view/modify settings.')

    try {
      const channel = message.client.channels.cache.find(c => c.name === args[0])

      const guildSettings = await message.settings.findOne({ where: { guildID: message.guild.id } })
      const feed = guildSettings.channelID ? guildSettings.channelID : 'None'

      const oldChannel = message.client.channels.cache.get(feed)

      const embed = new MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setTitle(`Update Feed for **${message.guild.name}**`)
        .addField('Old Channel', oldChannel.name, true)
        .addField('New Channel', channel.name, true)

      message.channel.send(embed)

      await message.settings.update({ channelID: channel.id }, { where: { guildID: message.guild.id } })
    } catch (error) {
      message.channel.send('I can\'t find this channel, try again and check spelling.')

      // Special case if bot is added during downtime
      await message.settings.create({
        channelID: null,
        guildID: message.guild.id
      })
    }
  }
}

module.exports = Feed
