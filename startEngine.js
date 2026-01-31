const Server = require('./server');

const myServer = new Server(process.env.PORT || 3000);
myServer.start();
