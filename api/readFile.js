const Utils = require('../modules/utils');

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).send('Method Not Allowed');
        return;
    }
    const { file } = req.query;
    if (!file) {
        res.status(400).send('Missing file name');
        return;
    }
    const utils = new Utils();
    utils.readFileContent(file, (err, data) => {
        if (err) {
            res.status(404).send(`File not found: ${file}`);
        } else {
            res.setHeader('Content-Type', 'text/plain');
            res.status(200).send(data);
        }
    });
};
