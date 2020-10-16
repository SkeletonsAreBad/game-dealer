const Command = require('../../util/Command.js')
const axios = require('axios').default
const { MessageEmbed } = require('discord.js')

class Sales extends Command {
  constructor () {
    super({
      name: 'sales',
      description: 'Gets all available sales for a game',
      argsOnly: true
    })
  }

  async run (message, args) {
    const res = await axios.get(`https://www.cheapshark.com/api/1.0/deals?title=${args.join(' ')}`).then(res => res.data)
    res.sort((a, b) => parseFloat(a.salePrice) - parseFloat(b.salePrice))

    const prices = []
    for (const price of res) {
      if (price.isOnSale !== '1') continue

      prices.push({
        name: `${price.title} on ${message.client.gameStores.get(price.storeID)}`,
        value: `US$${price.salePrice}, ${Math.round((1 - price.salePrice / price.normalPrice) * 100)}% off (save US$${Math.round(price.savings)})`
      })
    }

    const embed = new MessageEmbed()
      .setColor(process.env.EMBED_COLOR)
      .setTitle(`Sales for "${args.join(' ')}"`)
      .setDescription(prices.length ? `Here's what I could find for "${args.join(' ')}"` : `I couldn't find any sales for ${args.join(' ')}`)
      .addFields(prices)

    message.channel.send(embed)
  }
}

module.exports = Sales
