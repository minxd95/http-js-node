const testFolder = '../data';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
  if(err) throw err;
  files.forEach(file => {
    console.log(file);
  });
});
