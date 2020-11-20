import SecEnv from './src/SecEnv'

const secenv = (options = {}) => Object.freeze(
  new SecEnv(options)
)
module.exports = secenv
