const chalk = require('chalk')
const { settings } = require('../util/database.js')

module.exports = {
  run: async (guild) => {
    console.log(chalk.blueBright('[CLIENT]'), `Added to guild: ${guild.name} (${guild.id})`)
    // Insert default values into database
    await settings.create({
      channelID: null,
      guildID: guild.id
    })

    guild.member(global.client.user.id).setNickname('Mr Deals', 'Thanks for the invite!')
  }
}
