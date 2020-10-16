const chalk = require('chalk')
const { Sequelize } = require('sequelize')

const db = new Sequelize(process.env.POSTGRES_URI, {
  logging: msg => console.log(chalk.blueBright('[DATABASE]'), msg)
})

// Models
const settings = db.define('guild', {
  channelID: {
    type: Sequelize.BIGINT,
    allowNull: true
  },
  guildID: {
    type: Sequelize.BIGINT,
    allowNull: false,
    unique: true
  }
})

module.exports = { db, settings }
