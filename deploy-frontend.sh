#!/bin/bash
echo "Deploying frontend..."

cd /var/www/pronira
git pull origin main

echo "Installing dependencies..."
yarn install

echo "Building frontend..."
npx vite build

echo "Frontend deployed successfully!"
