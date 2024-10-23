#!/bin/bash
set -e  # Exit on error
set -x  # Print commands for debugging

echo "Starting build process..."

# Install Hugo using direct binary download
echo "Installing Hugo..."
mkdir -p /tmp/hugo
curl -L https://github.com/gohugoio/hugo/releases/download/v0.128.0/hugo_extended_0.128.0_Linux-64bit.tar.gz -o /tmp/hugo/hugo.tar.gz
tar -xzf /tmp/hugo/hugo.tar.gz -C /tmp/hugo
chmod +x /tmp/hugo/hugo
export PATH=$PATH:/tmp/hugo

# Initialize and update submodules
echo "Initializing submodules..."
git submodule init
git submodule update --recursive
git submodule status

# Build React components
echo "Building React components..."
cd components
npm ci
npm run build
cd ..

# Set the base URL
DEPLOY_URL=${VERCEL_URL:-"http://localhost:1313"}
HUGO_BASE_URL="https://$DEPLOY_URL"

echo "Building Hugo site with base URL: $HUGO_BASE_URL"

# List contents for debugging
echo "Current directory contents:"
ls -la

# Build Hugo site
hugo version
hugo --gc --minify --baseURL "$HUGO_BASE_URL"

# Verify output
echo "Checking build output..."
ls -la public/