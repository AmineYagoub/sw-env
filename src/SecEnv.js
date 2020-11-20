import { join } from 'path'
import { existsSync, readdirSync, readFileSync } from 'fs'

export default class SecEnv {
	#secrets = {}

	constructor (options = {}) {
	  const opt = {
	    dir: '/run/secrets',
	    encode: 'utf8',
	    override: false,
	    ...options
	  }
	  this.init(opt)
	}

	log (message) {
	  console.log(`[SecEnv][DEBUG] ${message}`)
	}

	init (options) {
	  const { dir, encode, override } = options
	  if (!existsSync(dir)) {
	    this.log('Docker secrets is not mounted into the container')
	    return
	  }
	  try {
	    const files = readdirSync(dir)
	    for (const file of files) {
	      const fullPath = join(dir, file)
	      const value = readFileSync(fullPath, encode)
	        .toString()
	        .trim()
	      this.#secrets[file] = value
	      if (Object.keys(process.env).includes(file) && !override) {
	        continue
	      }
	      process.env[file] = value
	    }
	  } catch (e) {
	    this.log(e.toString())
	  }
	}

	getSecrets () {
	  return this.#secrets
	}
}
