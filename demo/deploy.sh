#!/usr/bin/env sh

set -e
yarn run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/MichaelGitArt/gitart-vue-dialog.git master:gh-pages
cd -