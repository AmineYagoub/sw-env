'use strict'

const path = require('path')

const fs = jest.createMockFromModule('fs')

let mockFiles = Object.create(null)
let mockContent = Object.create(null)

function __setMockFiles (newMockFiles) {
  mockFiles = Object.create(null)
  mockContent = newMockFiles
  for (const file in newMockFiles) {
    const dir = path.dirname(file)
	  if (!mockFiles[dir]) {
		  mockFiles[dir] = []
	  }
    mockFiles[dir].push(path.basename(file))
  }
}

function readdirSync (directoryPath) {
  return mockFiles[directoryPath] || []
}

function existsSync (directoryPath) {
  return Object.keys(mockFiles).includes(directoryPath)
}

function readFileSync (directoryPath) {
  return mockContent[directoryPath] || null
}

fs.__setMockFiles = __setMockFiles
fs.readdirSync = readdirSync
fs.existsSync = existsSync
fs.readFileSync = readFileSync

module.exports = fs
