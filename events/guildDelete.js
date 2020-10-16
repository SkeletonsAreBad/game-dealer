const chalk = require('chalk')
const { settings } = require('../util/database.js')

module.exports = {
  run: async (guild) => {
    await settings.destroy({ where: { guildID: guild.id } })

    console.log(chalk.blueBright('[CLIENT]'), `Removed from guild: ${guild.name} (${guild.id})`)
  }
}
