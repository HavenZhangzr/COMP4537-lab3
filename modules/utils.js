class Utils {
    getDate(name, greetingTemplate) {
        const now = new Date();
        const greeting = greetingTemplate.replace('%1', name);
        return `<span style="color:blue; font-size:32px">${greeting} ${now}</span>`;
    }

    // C.1 写文件（追加）
    appendToFile(filePath, text, callback) {
        const fs = require('fs');
        fs.appendFile(filePath, text + '\n', (err) => {
            callback(err);
        });
    }

    // C.2 读文件
    readFileContent(filePath, callback) {
        const fs = require('fs');
        fs.readFile(filePath, 'utf8', (err, data) => {
            callback(err, data);
        });
    }
}

module.exports = Utils;
