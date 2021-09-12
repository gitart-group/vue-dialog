/*eslint-env node*/
/* eslint-disable @typescript-eslint/no-var-requires */
const shell = require('shelljs')

shell.exec('vue-tsc --noEmit')
shell.exec('vite build --config build/vite.config.ts')
shell.exec('cp ./build/index.d.ts ./dist/index.es.d.ts')
shell.exec('cp ./build/index.d.ts ./dist/index.upd.d.ts')
