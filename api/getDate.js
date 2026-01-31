const Utils = require('../modules/utils');
const lang = require('../lang/en/en');

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).send('Method Not Allowed');
        return;
    }
    const { name = 'Guest' } = req.query;
    const utils = new Utils();
    const message = utils.getDate(name, lang.greeting);
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(message);
};
