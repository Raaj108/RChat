const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('./api/ioSockets').listen(server);
const path = require('path');
const port = 3000;

app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.use('/public', express.static(__dirname + '/public'));

server.listen(port, () => {
    console.log("Listening on : " + port);
});
