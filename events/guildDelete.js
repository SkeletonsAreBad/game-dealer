module.exports = {
  run: (guild) => {
    console.log(chalk.blueBright('[CLIENT]'), `Removed from guild: ${guild.name} (${guild.id})`)
  }
}