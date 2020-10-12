module.exports = {
  run: (guild) => {
    console.log(chalk.blueBright('[CLIENT]'), `Added to guild: ${guild.name} (${guild.id})`)

    guild.member(client.user.id).setNickname('Mr Deals', 'Thanks for the invite!')
  }
}