const Utils = require('../modules/utils');

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).send('Method Not Allowed');
        return;
    }
    const { text } = req.query;
    if (!text) {
        res.status(400).send('Missing text parameter');
        return;
    }
    const utils = new Utils();
    utils.appendToFile('file.txt', text, (err) => {
        if (err) {
            res.status(500).send('Error writing to file');
        } else {
            res.status(200).send('Text appended to file.txt');
        }
    });
};
