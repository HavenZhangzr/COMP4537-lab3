const http = require('http');
const url = require('url');
const Utils = require('./modules/utils');
const lang = require('./lang/en/en');

class Server {
    constructor(port) {
        this.port = port;
        this.utils = new Utils();
        // routers mapping
        this.routes = {
            '/COMP4537/labs/3/getDate': this.handleGetDate.bind(this),
            '/COMP4537/labs/3/writeFile': this.handleWriteFile.bind(this)
        };
    }

    // request dispatcher
    dispatcher(req, res, parsedUrl) {
        // handle dynamic route for readFile (/readFile/xxx)
        if (parsedUrl.pathname.startsWith('/COMP4537/labs/3/readFile/') && req.method === 'GET') {
            const fileName = parsedUrl.pathname.replace('/COMP4537/labs/3/readFile/', '');
            this.handleReadFile(req, res, fileName);
            return;
        }
        // handle static routes
        const routeKey = parsedUrl.pathname.replace(/\/$/, '');
        const handler = this.routes[routeKey];
        if (handler) {
            handler(req, res, parsedUrl);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    }

    // handle getDate
    handleGetDate(req, res, parsedUrl) {
        if (req.method !== 'GET') {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
            return;
        }
        const name = parsedUrl.query.name || 'Guest';
        const message = this.utils.getDate(name, lang.greeting);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(message);
    }

    // handle writeFile
    handleWriteFile(req, res, parsedUrl) {
        if (req.method !== 'GET') {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
            return;
        }
        const text = parsedUrl.query.text;
        if (!text) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Missing text parameter');
            return;
        }
        this.utils.appendToFile('file.txt', text, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error writing to file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Text appended to file.txt');
            }
        });
    }

    // handle readFile
    handleReadFile(req, res, fileName) {
        if (req.method !== 'GET') {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
            return;
        }
        if (!fileName) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Missing file name');
            return;
        }
        this.utils.readFileContent(fileName, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(`File not found: ${fileName}`);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        });
    }

    start() {
        const server = http.createServer((req, res) => {
            const parsedUrl = url.parse(req.url, true);
            this.dispatcher(req, res, parsedUrl);
        });
        server.listen(this.port, () => {
            console.log(`Server running at http://localhost:${this.port}/`);
        });
    }
}

module.exports = Server;
