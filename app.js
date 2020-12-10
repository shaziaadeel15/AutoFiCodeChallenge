/* Main application file */
var express = require('express');
const fileUpload = require('express-fileupload');
const indexRouter = require('./router/index');
const uploadRouter = require('./router/upload');
const config = require('./config');

//creating express server
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

// routing paths
/*var path = require('path');
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/www/upload.html'));
} );
*/
app.get("/", indexRouter);
app.post("/upload", uploadRouter);

//start server on given port
app.listen(config.app.port);
console.log('listening on port '+ config.app.port);

module.exports = app;
