const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'sales',
  descriptions: 'Gets all available sales for a game.',
  args: true,
  usage: '<game name>',
  async execute (message, args) {
    const res = await fetch(`https://www.cheapshark.com/api/1.0/deals?title=${args.join(' ')}`).then(response => response.json())
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

    message.channel.send(embed )
  }
}
