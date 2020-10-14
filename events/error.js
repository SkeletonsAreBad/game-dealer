const chalk = require('chalk')

module.exports = {
  run: (error) => {
    console.error(chalk.redBright('[ERROR]'), `Bot encountered an error: ${error}`)
  }
}
