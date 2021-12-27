const shell = require('shelljs')

shell.exec('vue-tsc --noEmit')
shell.exec('vite build --config build/vite.config.ts')
shell.exec('vue-tsc --declaration --emitDeclarationOnly --p build/tsconfig.json')
