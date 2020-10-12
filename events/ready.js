const chalk = require('chalk')

module.exports = {
  run: () => {
    client.meta.set('invite', `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=537168960&scope=bot`)
  
    console.info(chalk.greenBright('[CLIENT]'), `Logged in as ${client.user.tag}`)
    console.info(chalk.blueBright('[CLIENT]'), `Invite the bot at: ${client.meta.get('invite')}`) // fuck you skel
      
    client.user.setActivity(`${process.env.PREFIX}help`, { type: 'LISTENING' })
  }
}