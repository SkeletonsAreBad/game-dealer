const Command = require('../../util/Command.js')
const fetch = require('node-fetch')

class Cat extends Command {
  constructor () {
    super({
      name: 'cat',
      description: 'Get a cool random funny cat.',
      aliases: ['dog']
    })
  }

  async run (message, args) {
    const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json())

    message.channel.send(file)
  }
}

module.exports = Cat
