const chalk = require('chalk')

module.exports = {
  run: (guild) => {
    console.log(chalk.blueBright('[CLIENT]'), `Added to guild: ${guild.name} (${guild.id})`)

    guild.member(global.client.user.id).setNickname('Mr Deals', 'Thanks for the invite!')
  }
}
