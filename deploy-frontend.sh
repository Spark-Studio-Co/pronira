#!/bin/bash
echo "🚀 Deploying frontend..."

cd /var/www/pronira
git reset --hard          


git pull origin main

echo "📦 Installing dependencies..."
yarn install

echo "🏗️  Building frontend..."
npx vite build

echo "✅ Frontend deployed successfully!"
>>>>>>> 0ff00da (fix)
