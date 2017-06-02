const fs = require('fs')
const resolve = require('path').resolve

const registry = process.argv[3]
const re = /https?:\/\/registry\.[a-z.]+/g

function replaceLock (cb) {
  const lock = resolve(__dirname, '../npm-shrinkwrap.json')
  fs.readFile(lock, (err, buf) => {
    if (err) {
      console.error(err)
    } else {
      let content = buf.toString()
      content = content.replace(re, registry)
      fs.writeFile(lock, content, err => {
        if (err) {
          console.error(err)
        } else {
          console.log(`registries in "npm-shrinkwrap.json" were replaced with "${registry}"`)
          cb()
        }
      })
    }
  })
}

function replaceRc () {
  const rc = resolve(__dirname, '../.npmrc')
  fs.readFile(rc, (err, buf) => {
    if (err) {
      console.error(err)
    } else {
      let content = buf.toString()
      content = content.replace(re, registry)
      fs.writeFile(rc, content, err => {
        if (err) {
          console.error(err)
        } else {
          console.log(`registries in ".npmrc" were replaced with "${registry}"`)
        }
      })
    }
  })
}

replaceLock(replaceRc)
