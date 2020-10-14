const chalk = require('chalk')

module.exports = {
  run: () => {
    global.client.meta.set('invite', `https://discord.com/api/oauth2/authorize?client_id=${global.client.user.id}&permissions=537168960&scope=bot`)

    console.info(chalk.greenBright('[CLIENT]'), `Logged in as ${global.client.user.tag}`)
    console.info(chalk.blueBright('[CLIENT]'), `Invite the bot at: ${global.client.meta.get('invite')}`) // fuck you skel

    global.client.user.setActivity(`${process.env.PREFIX}help`, { type: 'LISTENING' })
  }
}
