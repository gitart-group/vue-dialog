/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'
const shell = require('shelljs')

shell.exec('vue-tsc --noEmit && vite build')
shell.exec('cp ./@types/index.d.ts ./dist/index.es.d.ts')
shell.exec('cp ./@types/index.d.ts ./dist/index.upd.d.ts')