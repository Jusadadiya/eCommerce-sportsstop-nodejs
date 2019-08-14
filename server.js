//require statements 
const http = require('http');
//express related
const Express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cookieSession = require('cookie-session');
//database
const db = require('./db.js');
db.init();
const bcrypt = require('bcryptjs');

//configure server
var express = new Express();
module.exports.express = express;
var server = http.createServer(express);

express.use(bodyParser.urlencoded({ extended: true }));
express.use(bodyParser.json());
express.use(fileUpload());

//handle sessions
express.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));

//set up the HTTP server and start it running
server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function () {
    var addr = server.address();
    console.log('Server listening at', addr.address + ':' + addr.port);
});

//USER - GET ALL USERS
express.get('/user/all', function (req, res) {
    console.log('client requests get user all');
    const loginController = require('./UserController.js');
    loginController.getAllUsers(res);
});