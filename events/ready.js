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

    // Feed, probably not the best way to handle it, but it works
    global.client.guilds.cache.forEach((guild) => {
      setInterval(async function () {
        const channels = await settings.findAll({ attributes: ['channelID'] })
        const channelMap = channels.map(t => t.channelID).join(' ') || 'None'

        let feed = ''

        guild.channels.cache.forEach((channel) => {
          if (channel.type === 'text' && feed === '') {
            if (channel.permissionsFor(guild.me).has('SEND_MESSAGES') && channelMap.includes(channel.id)) {
              feed = channel
            }
          }
        })
        try {
          feed.send('hello :)')
        } catch (error) {
          console.debug(chalk.gray('[DEBUG]'), `Server ${guild.name} (${guild.id}) doesn't have a feed.`)
        }
      }, 10000)
    })
  }
}
