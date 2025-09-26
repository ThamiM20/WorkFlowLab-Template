
const { exec } = require('child_process');
const fs = require('fs');

// Create strapi project with default settings
exec('npx create-strapi-app@latest strapi-cms --quickstart --no-run', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});