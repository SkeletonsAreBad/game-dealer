const {MessageEmbed} = require('discord.js')

module.exports = {
	name: 'help',
	description: 'you\'re using this command (I assume at least), the gist is obvious. Get help.',
	usage: `OR ${process.env.PREFIX}help <command>`,
	execute (message, args) {
		const commandsField = new Array
		client.commands.forEach(c => commandsField.push(c.name))

		if (!args.length) {
			const embed = new MessageEmbed()
				.setColor(process.env.EMBED_COLOR)
				.setTitle('Help')
				.addField('Available Commands', commandsField.join('\n'))

			message.channel.send(embed)

		} else if (args.length !== 2 && commandsField.includes(args[0])) {
			const command = client.commands.get(args[0])

			const embed = new MessageEmbed()
				.setColor(process.env.EMBED_COLOR)
				.setTitle(`Help for \`${command.name}\``)
				.addField('Description', command.description)
				.addField('Usage', `${process.env.PREFIX}${command.name} ${command.usage ? command.usage : ""}`)

			message.channel.send(embed)

		} else message.reply("Command doesn't exist")
	} 
}