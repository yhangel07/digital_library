var express = require("express"),
	app = express(),
	cors = require('cors'),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	http = require("http"),
	multer = require('multer');
	server = http.createServer(app),
	router = express.Router()

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	//res.header('Access-Control-Allow-Origin', 'http://localhost:3000/bower_components/viewerjs/ViewerJS/#..');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", true);
	next();
});

var router = express.Router();
var mongoose = require('mongoose');
var URL = 'mongodb://127.0.0.1/gridfstest';
mongoose.connect(URL);
var conn = mongoose.connection;
var ObjectId = require('mongodb').ObjectId; 

var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');

var gfs = Grid(conn.db, mongoose.mongo);

router.get('/getAllFiles', function (req, res, next) {
	gfs.collection('ctFiles');

	gfs.files.find().toArray(function (err, files) {
		if (err) {
			res.send(err);
		}
			res.json(files);
	});
});

var storage = new GridFsStorage({
	url: URL,
	//db: gfs,
	file: (req, file) => {
		return ({
			bucketName: 'ctFiles',
			filename: 'file-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1],
			metadata: {
				originalname: file.originalname
			}
					//,add Aliases for searching
		});
	}
});

var upload = multer({ //multer settings
	storage: storage
}).single('file');

router.post('/upload', function (req, res) {
	upload(req, res, function (err) {
		if (err) {
			res.json({ error_code: 1, err_desc: err });
			return;
		}
		res.json({ error_code: 0, err_desc: 'Success!' });
	});
}); 

router.get('/file/:id', function (req, res) {
	gfs.collection('ctFiles'); //set collection name to lookup into

	var myFileattrb;
	var id = req.params.id;       
	var obj_id = new ObjectId(id);

	/** First check if file exists */
	gfs.files.find({ _id : obj_id }).toArray(function (err, files) {
		if (!files || files.length === 0) {
			return res.status(404).json({
				responseCode: 1,
				responseMessage: "error"
			});
		}

		/** create read stream */
		var readstream = gfs.createReadStream({
			_id: files[0]._id,
			root: "ctFiles"
		});

		var fileName = files[0].metadata.originalname;
			
		/** Set filename */
		//res.set('Content-disposition', 'attachment; filename=' + encodeRFC5987ValueChars(fileName));
		//TODO change name //res.attachment('/' + fileName);
		/** set the proper content type */
		res.set('Content-Type', files[0].contentType);
		res.set('data', files[0]._id);
		/** return response */
		
		return readstream.pipe(res);
	
	});
});




var encodeRFC5987ValueChars = function (str) {
	return encodeURIComponent(str).
		// Note that although RFC3986 reserves "!", RFC5987 does not,
		// so we do not need to escape it
		replace(/['()]/g, escape). // i.e., %27 %28 %29
		replace(/\*/g, '%2A').
		// The following are not required for percent-encoding per RFC5987, 
		// so we can allow for a little better readability over the wire: |`^
		replace(/%(?:7C|60|5E)/g, unescape);
}


module.exports = router;
