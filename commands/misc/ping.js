const Command = require('../../util/Command.js')

class Ping extends Command {
  constructor () {
    super({
      name: 'ping',
      description: 'Ping the bot'
    })
  }

  async run (message, args) {
    message.channel.send(`Pong, response time **${message.client.ws.ping}ms**.`)
  }
}

module.exports = Ping
