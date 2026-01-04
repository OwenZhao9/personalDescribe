#!/bin/bash

# Deployment script for zhaoning-resume
# Usage: ./deploy.sh [production|staging]

set -e

ENV=${1:-production}

echo "🚀 Starting deployment for $ENV environment..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install it first: npm install -g pnpm"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build the project
echo "🔨 Building project..."
pnpm build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed: dist directory not found"
    exit 1
fi

echo "✅ Build completed successfully!"

# If PM2 is installed, restart the application
if command -v pm2 &> /dev/null; then
    echo "🔄 Restarting application with PM2..."
    pm2 restart resume || pm2 start dist/index.js --name resume
    pm2 save
    echo "✅ Application restarted with PM2"
else
    echo "ℹ️  PM2 not found. Please start the application manually:"
    echo "   NODE_ENV=production node dist/index.js"
fi

echo "🎉 Deployment completed!"

