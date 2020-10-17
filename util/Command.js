class Command {
  constructor ({
    name = null,
    description = 'None provided',
    usage = '',
    category = 'Miscellaneous',
    aliases = [],
    dmOnly = false,
    guildOnly = false,
    argsOnly = false,
    admin = false
  }) {
    this.info = { name, description, usage, category }
    this.conf = { aliases, dmOnly, guildOnly, argsOnly, admin }
  }
}

module.exports = Command
