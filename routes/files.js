var express = require('express');
var router = express.Router();

var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');

var Grid = require('gridfs-stream');

var mongoose = require('mongoose');
var URL = 'mongodb://127.0.0.1/gridfstest';

var promise = mongoose.connect(URL);
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

var storage = GridFsStorage({
//	url: URL,
	db: promise,
	file: (req, file) =>{
		return ({
			// filename: function (req, file, cb) {
			// 	var datetimestamp = Date.now();
			// 	cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
			// },
			// metadata: function (req, file, cb) {
			// 	cb(null, { originalname: file.originalname });
			// },
			filename: 'File_ ' + Date.now(),
			bucketName: 'ctFiles'
		});
	}
});

 //var storage = GridFsStorage({
// 	gfs: gfs,
// 	filename: function (req, file, cb) {
// 		var datetimestamp = Date.now();
// 		cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
// 	},
// 	/** With gridfs we can store aditional meta-data along with the file */
// 	metadata: function (req, file, cb) {
// 		cb(null, { originalname: file.originalname });
// 	},
// 	root: 'ctFiles' //root name for collection to store files into
 //});

var upload = multer({ //multer settings
	storage: storage
}).single('file');

router.post('/upload', function(req, res, next) {
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null});
    });
});

module.exports = router;
