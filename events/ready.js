const { db, settings } = require('../util/database')
const chalk = require('chalk')

module.exports = {
  run: async () => {
    try {
      await db.authenticate()
    } catch (err) {
      console.error(chalk.redBright('[ERROR]'), `Could not connect to database: ${err}`)
    }
    settings.sync()

    global.client.meta.set('invite', `https://discord.com/api/oauth2/authorize?client_id=${global.client.user.id}&permissions=537168960&scope=bot`)

    console.log(chalk.greenBright('[CLIENT]'), `Logged in as ${global.client.user.tag}`)
    console.log(chalk.blueBright('[CLIENT]'), `Invite the bot at: ${global.client.meta.get('invite')}`)

    global.client.user.setActivity(`${process.env.PREFIX}help`, { type: 'LISTENING' })
  }
}
