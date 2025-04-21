const fs = require('fs');
// Read the contents of the file '/content.md' synchronously and store them in 'data'
const data = fs.readFileSync('content.md', 'utf8');
// Print the contents of 'content.md' to the console
console.log(data);