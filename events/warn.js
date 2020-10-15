const chalk = require('chalk')

module.exports = {
  run: (warn) => {
    // still yet to know what warn does
    console.log(chalk.red('[WARN]'), warn)
  }
}
