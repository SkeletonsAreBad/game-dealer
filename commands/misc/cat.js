const Command = require('../../util/Command.js')
const axios = require('axios').default

class Cat extends Command {
  constructor () {
    super({
      name: 'cat',
      description: 'Get a cool random funny cat.',
      aliases: ['dog']
    })
  }

  async run (message, args) {
    const { file } = await axios.get('https://aws.random.cat/meow').then(res => res.data)

    message.channel.send(file)
  }
}

module.exports = Cat
