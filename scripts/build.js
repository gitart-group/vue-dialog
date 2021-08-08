/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'
const shell = require('shelljs')

shell.exec('vue-tsc --noEmit && vite build')
shell.exec('cp ./@types/* ./dist')