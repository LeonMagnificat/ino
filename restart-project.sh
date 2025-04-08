#!/bin/bash

# Navigate to the project directory
cd /Users/kwizera/Documents/code/ino/ino/ino

# Remove Vite cache
rm -rf node_modules/.vite

# Clear browser cache by stopping and restarting the dev server
echo "Stopping any running Vite dev server..."
pkill -f "vite"

echo "Starting the dev server..."
npm run dev