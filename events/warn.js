const chalk = require('chalk')

module.exports = {
  run: (warn) => {
    console.log(chalk.red('[WARN]'), warn)
  }
}
