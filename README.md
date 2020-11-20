# swenv

[![NPM](https://nodei.co/npm/sw-env.png)](https://nodei.co/npm/sw-env/)

[![Build Status](https://travis-ci.com/AmineYagoub/sw-env.svg?branch=main)](https://travis-ci.com/AmineYagoub/sw-env)
[![Coverage Status](https://coveralls.io/repos/github/AmineYagoub/sw-env/badge.svg?branch=main)](https://coveralls.io/github/AmineYagoub/sw-env?branch=main)
![node-current](https://img.shields.io/node/v/sw-env?style=flat)
> Module that loads data from Docker Secrets into process.env with  zero-dependency 
# Installation
### NPM

```bash
npm install sw-env
```
### Options
```javascript
{
    dir: '/run/secrets',  // The location of the mount point within the container
    encode: 'utf8',       // ReadFileSync encoding
    override: false       // Override existing environment
}
```
## Usage
Create Docker secrets using the command line.
``` bash -
echo "your-password" | docker secret create DB_PASSWORD -
echo "your-username" | docker secret create DB_USERNAME -
```
Or using a text file that contains the value of the secret.
``` bash -
docker secret create DB_USERNAME /path/to/username.txt
docker secret create DB_PASSWORD /path/to/password.txt
```
Or in your docker-compose.yml
```bash -
version: "3.8"

services:

  app:
    image: node:latest
    secrets:
      - DB_USERNAME
      - DB_PASSWORD
    deploy:
      mode: replicated
      replicas: 1

secrets:
  DB_USERNAME:
    name: DB_USERNAME
    file: /path/to/username.txt
  DB_PASSWORD:
    name: DB_PASSWORD
    file: /path/to/pwd.txt

```
**Reading and using Docker secrets in Node.js:**
```javascript
import swenv from 'sw-env';
 
// ... As early as possible in your App
const options = {}
swenv(options)

console.log(process.env.DB_USERNAME) // your-username
console.log(process.env.DB_PASSWORD) // your-password


// or ...


const secrets = swenv()
console.log(secrets.getSecrets())  // Object contain all container secrets
```
# License

### MIT

Use and abuse at your own risk.
