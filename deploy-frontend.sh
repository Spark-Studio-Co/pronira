#!/bin/bash
echo "Deploying frontend..."

cd ~/var/www/dist
git pull origin main

echo "Installing dependencies..."
npm install

echo "Building frontend..."
npx vite build

echo "Frontend deployed successfully!"
