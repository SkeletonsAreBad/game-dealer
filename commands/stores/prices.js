const Command = require('../../util/Command.js')
const axios = require('axios').default
const { MessageEmbed } = require('discord.js')

class Prices extends Command {
  constructor () {
    super({
      name: 'prices',
      description: 'Gets all available prices for a game.',
      argsOnly: true
    })
  }

  async run (message, args) {
    const res = await axios.get(`https://www.cheapshark.com/api/1.0/deals?title=${args.join(' ')}`).then(res => res.data)
    res.sort((a, b) => parseFloat(a.salePrice) - parseFloat(b.salePrice))

    const prices = []
    for (const price of res) {
      let cost = ''
      if (price.isOnSale === '1') {
        cost = `US$${price.salePrice}, ${Math.round((1 - price.salePrice / price.normalPrice) * 100)}% off (save US$${Math.round(price.savings)})`
      } else {
        cost = `US$${price.normalPrice}`
      }

      prices.push({
        name: `${price.title} on ${message.client.gameStores.get(price.storeID)}`,
        value: cost
      })
    }

    const embed = new MessageEmbed()
      .setColor(process.env.EMBED_COLOR)
      .setTitle(`Prices for **${args.join(' 0')}**`)
      .setDescription(prices.length ? `Here's what I could find for "${args.join(' ')}"` : `I couldn't find anything for "${args.join(' ')}"`)
      .setThumbnail(res[0].thumb)
      .addFields(prices)
    message.channel.send(embed)
  }
}

module.exports = Prices
