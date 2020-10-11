const fetch = require('node-fetch')

module.exports = {
  name: 'prices',
  descriptions: 'Gets all available prices for a game.',
  args: true,
  usage: '<game name>',
  async execute (message, args) {
    const res = await fetch(`https://www.cheapshark.com/api/1.0/deals?title=${args.join(' ')}`).then(response => response.json())
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

    let embed
    if (prices.length > 0) {
      embed = {
        color: process.env.EMBED_COLOR,
        title: `Prices for "${args.join(' ')}"`,
        description: `Here's what I could find for "${args.join(' ')}"`,
        thumbnail: { url: res[0].thumb },
        fields: prices
      }
    } else {
      embed = {
        color: process.env.EMBED_COLOR,
        title: `Prices for "${args.join(' ')}"`,
        description: `I couldn't find anything for "${args.join(' ')}"`
      }
    }

    message.channel.send({ embed })
  }
}
