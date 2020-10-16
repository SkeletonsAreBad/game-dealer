const Command = require('../../util/Command.js')

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

    message.channel.send(`Available game stores (${stores.length}): ${stores.join(', ')}`)
  }
}

module.exports = Stores
