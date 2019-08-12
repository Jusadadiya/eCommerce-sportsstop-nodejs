//require statements -- this adds external modules from node_modules or our own defined modules
const http = require('http');

//express related
const Express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cookieSession = require('cookie-session');

//configure server
var express = new Express();
module.exports.express = express;
var server = http.createServer(express);

//tell the router to parse urlencoded data and JSON data for us and put it into req.query/req.body
express.use(bodyParser.urlencoded({ extended: true }));
express.use(bodyParser.json());
express.use(fileUpload());

//set up the HTTP server and start it running
server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function () {
    var addr = server.address();
    console.log('Server listening at', addr.address + ':' + addr.port);
});
