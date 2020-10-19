const { db, settings } = require('../util/database.js')
const chalk = require('chalk')
const axios = require('axios')
const { wait } = require('../util/functions.js')
const { MessageEmbed } = require('discord.js')

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
    let old = [{
      internalName: 'yo'
    }]

    global.client.guilds.cache.forEach(async (guild) => {
      try {
        await settings.create({
          channelID: null,
          guildID: guild.id
        })
      } catch (error) { console.error(chalk.redBright('[ERROR]', `Error initialising DBs: ${error}`)) }

      setInterval(async () => {
        const deals = await axios.get('https://www.cheapshark.com/api/1.0/deals?onSale=1&storeID=1').then(res => res.data)

        const result = deals.filter(d => {
          return !old.some(o => d.internalName === o.internalName)
        })

        const channels = await settings.findAll({ attributes: ['channelID'] })
        const channelMap = channels.map(t => t.channelID).join(' ') || 'None'

        let feedChannel = ''

        guild.channels.cache.forEach((channel) => {
          if (channel.type === 'text' && feedChannel === '') {
            if (channel.permissionsFor(guild.me).has('SEND_MESSAGES') && channelMap.includes(channel.id)) {
              feedChannel = channel
            }
          }
        })
        for (let i = 0; i < 60; i++) {
          if (result === []) return; else {
            try {
              const embed = new MessageEmbed()
                .setColor(process.env.EMBED_COLOR)
                .setTitle(`Sale for **${result[i].title}**`)
                .addField('**Steam Reviews**', `${result[i].steamRatingText} (${result[i].steamRatingCount} reviews)`)
                .addField('**Sale Price**', `$${result[i].salePrice}`, true)
                .addField('**Normal Price**', `$${result[i].normalPrice}`, true)
                .setURL(`https://store.steampowered.com/app/${result[i].steamAppID}`)
                .setThumbnail(result[i].thumb)
              feedChannel.send(embed)
              await wait(5000)
            } catch (error) { /* Handling errors here would be redundant and quite spammy */ }
          }
        }
        old = deals
      }, 600000)
    })
  }
}
