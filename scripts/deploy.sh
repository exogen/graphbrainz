#!/bin/bash
set -e

GREEN='\033[0;32m'
RESET='\033[0m'

# Fail if the `heroku` remote isn't there.
git remote show heroku

STASH_OUTPUT=$(git stash) # Stash uncommitted changes.
git checkout -B deploy # Force branch creation/reset.
npm run build
git add -f lib # Force add ignored files.
# Use the same commit message, but add a little note.
git commit -m "$(git log -1 --pretty=%B) [deploy branch: do NOT push to GitHub]"
git push -f heroku deploy:master
git rm -r --cached lib # Otherwise switching branches will remove them.
git checkout - # Switch back to whatever branch we came from.
git branch -D deploy # Just to prevent someone accidentally pushing to GitHub.
if [[ $STASH_OUTPUT != "No local changes"* ]]; then
  git stash pop --index # Restore uncommitted changes.
fi

echo -e "\n${GREEN}✔︎ Successfully deployed.${RESET}"
