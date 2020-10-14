class Command {
  constructor ({
    name = null,
    description = 'None provided',
    usage = null,
    category = 'Miscellaneous',
    aliases = [],
    dmOnly = false,
    argsOnly = false,
    admin = false
  }) {
    this.info = { name, description, usage, category }
    this.conf = { aliases, dmOnly, argsOnly, admin }
  }
}

module.exports = Command
