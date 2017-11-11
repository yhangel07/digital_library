var express = require('express');
var router = express.Router();
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/gridfstest');
var conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
var gfs = Grid(conn.db);


router.get('/getAllFiles', function(req, res, next){
	gfs.collection('ctFiles');

	gfs.files.find().toArray(function(err, files){
		if(err){
			res.send(err);
		}
		res.json(files);
	});
});

module.exports = router;
