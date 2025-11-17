const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const distFile = path.join(distDir, 'index.esm.js');

// Check if dist folder exists and has the required files
if (!fs.existsSync(distDir) || !fs.existsSync(distFile)) {
  console.log('dist folder not found or incomplete. Building package...');
  process.exit(1); // Exit with error to trigger npm run build
} else {
  console.log('dist folder exists. Skipping build.');
  process.exit(0); // Exit successfully, no build needed
}





