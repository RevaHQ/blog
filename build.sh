#!/bin/bash

# Initialize and update submodules
git submodule init
git submodule update --recursive

# Build React components
cd components
npm ci
npm run build
cd ..

# Build Hugo site
hugo --gc --minify --baseURL $VERCEL_URL