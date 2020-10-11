const { description, version, repository, homepage, dependencies } = require('../package.json')

module.exports = {
  name: 'info',
  description: 'Get information about the bot.',
  execute (message, args) {
    const embed = {
      color: process.env.EMBED_COLOR,
      title: message.client.user.username,
      url: homepage,
      description,
      thumbnail: { url: message.client.user.avatarURL() },
      fields: [
        { name: 'Invite', value: `[Click to invite](${message.client.meta.get('invite')})`, inline: true },
        { name: 'Repository', value: `[Click to view](${repository.url})`, inline: true },
        { name: 'Bot Version', value: `v${version}`, inline: true },
        { name: 'NodeJS Version', value: process.version, inline: true },
        { name: 'discord.js Version', value: `v${dependencies['discord.js'].replace('^', '')}`, inline: true }
      ]
    }

    message.channel.send({ embed })
  }
}
