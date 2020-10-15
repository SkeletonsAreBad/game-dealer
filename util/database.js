const chalk = require('chalk')
const { Sequelize } = require('sequelize')

const db = new Sequelize(process.env.POSTGRES_URI, {
  logging: msg => console.log(chalk.blueBright('[DATABASE]'), msg)
})

// Models
const customPrefix = db.define('prefix', {
  prefix: {
    type: Sequelize.STRING
  },
  guild: {
    type: Sequelize.INTEGER,
    unique: true
  }
})

const feedChannel = db.define('channel', {
  channel: {
    type: Sequelize.INTEGER
  },
  guild: {
    type: Sequelize.INTEGER,
    unique: true
  }
})

module.exports = { db, customPrefix, feedChannel }
