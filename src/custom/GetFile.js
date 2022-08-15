const path = require('path');
const fs = require('fs');

const directoryPath = path.join('C:\\Informes\\2022\\05-Mayo\\220540 IDEAL ALAMBREC S.A');

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        
        return console.log('Current directory: ' + process.cwd());
    } 

    console.log(files)
});

// const path = require('path');
// const fs = require('fs');

// const directoryPath = path.join('C:\\Informes');

// console.log(`_______________________________ \n  Directorio: ${directoryPath} \n _______________________________ \n `)