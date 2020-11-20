import SecEnv from './src/SecEnv'

const swEnv = (options = {}) => Object.freeze(
  new SecEnv(options)
)
module.exports = swEnv
