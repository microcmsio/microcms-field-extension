#!/bin/bash

set -xeuo pipefail

package="${1:?}" # api or react or cra-template
semver="${2:?}"  # patch or minor or major

cd "$(git rev-parse --show-toplevel)/packages/$package"
npm version "$semver"
npm install
npm run build

version=$(jq -r .version <package.json)

git add "$(git rev-parse --show-toplevel)"
git commit -m "[$package] Version v$version"
git tag -a "$package-v$version" -m "[$package] Version v$version"

read -r -p "Continue? (y/N): " yn
case "$yn" in
[yY]*) echo hello ;;
*) exit ;;
esac

git push
git push origin "$package-v$version"

if ! npm whoami; then
  npm login
fi

npm publish
