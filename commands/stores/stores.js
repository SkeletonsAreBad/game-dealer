const Command = require('../../util/Command.js')
const { MessageEmbed } = require('discord.js')

class Stores extends Command {
  constructor () {
    super({
      name: 'stores',
      description: 'View available stores.',
      category: 'Stores'
    })
  }

  async run (message, args) {
    const stores = Array.from(message.client.gameStores.values())

    // message.channel.send(`Available game stores (${stores.length}): ${stores.join(', ')}`)

    const embed = new MessageEmbed()
      .setColor(process.env.EMBED_COLOR)
      .setTitle(`Available Game Stores (${stores.length})`)
      .addField('1/2', `${stores.slice(0, Math.floor(stores.length / 2)).join('\n')}`, true)
      .addField('2/2', `${stores.slice(Math.floor(stores.length / 2), stores.length).join('\n')}`, true)

    message.channel.send(embed)
  }
}

module.exports = Stores
