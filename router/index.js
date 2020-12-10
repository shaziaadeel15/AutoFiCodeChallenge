/* Module for returing index page */

var express = require('express');
var path = require('path');

const config = require('../config');
	
var router = express.Router();

//Get index file path from configuration
router.get('/', function(req, res) {
    res.sendFile(path.join(config.index.indexPath));
} );

module.exports = router;
