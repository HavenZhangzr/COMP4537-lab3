class Utils {
    getDate(name, greetingTemplate) {
        const now = new Date();
        const greeting = greetingTemplate.replace('%1', name);
        return `<span style="color:blue; font-size:32px">${greeting} ${now}</span>`;
    }

    // write file
    appendToFile(filePath, text, callback) {
        const fs = require('fs');
        fs.appendFile(filePath, text + '\n', (err) => {
            callback(err);
        });
    }

    // read file
    readFileContent(filePath, callback) {
        const fs = require('fs');
        fs.readFile(filePath, 'utf8', (err, data) => {
            callback(err, data);
        });
    }
}

module.exports = Utils;
