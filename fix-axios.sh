#!/bin/bash

# Navigate to the project directory
cd /Users/kwizera/Documents/code/ino/ino/ino

# Remove node_modules/.vite to clear cache
rm -rf node_modules/.vite

# Remove axios
npm uninstall axios

# Install axios again
npm install axios

# Optionally, you can also try clearing npm cache
# npm cache clean --force

echo "Axios has been reinstalled. Try running your app again."