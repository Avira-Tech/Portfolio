#!/bin/sh
set -e

cd server
npm install
npm run build
npm start
