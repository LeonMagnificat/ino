#!/bin/bash

# Navigate to the project directory
cd /Users/kwizera/Documents/code/ino/ino/ino

# Remove node_modules/.vite to clear cache
rm -rf node_modules/.vite

# Clear Vite cache
rm -rf node_modules/.vite

# Remove the package-lock.json file to ensure a clean install
rm -f package-lock.json

# Install dependencies with the updated axios version
npm install

# Clear npm cache for axios specifically
npm cache clean --force axios

echo "Dependencies have been reinstalled with axios version 1.6.7. Try running your app again."