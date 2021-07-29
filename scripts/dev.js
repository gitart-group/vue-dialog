/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'
const shell = require('shelljs')

const chokidar = require('chokidar')

const distWatcher = chokidar.watch('./dist', { persistent: true })
const srcWatcher = chokidar.watch('./src', { persistent: true })

distWatcher
  .on('change', () => {
    shell.exec('cp ./types/* ./dist')
  })

srcWatcher
  .on('change', () => {
    shell.exec('vite build')
  })
  .on('ready', () => {
    shell.exec('vite build')
  })
