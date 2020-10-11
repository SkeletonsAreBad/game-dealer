module.exports = {
  name: 'stores',
  description: 'View available stores.',
  execute (message, args) {
    const stores = Array.from(message.client.gameStores.values())

    message.channel.send(`Available game stores (${stores.length}): ${stores.join(', ')}`)
  }
}
