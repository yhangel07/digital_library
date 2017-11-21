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
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", true);
	next();
});

var router = express.Router();
var mongoose = require('mongoose');
var URL = 'mongodb://127.0.0.1/gridfstest';
mongoose.connect(URL);
var conn = mongoose.connection;

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

router.get('/:filename', function (req, res) {
	gfs.collection('ctFiles'); //set collection name to lookup into

	/** First check if file exists */
	gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
		if (!files || files.length === 0) {
			return res.status(404).json({
				responseCode: 1,
				responseMessage: "error"
			});
		}

		console.log('Success: ', files);
		/** create read stream */
		var readstream = gfs.createReadStream({
			_id: files[0]._id,
			root: "ctFiles"
		});
		/** set the proper content type */
		res.set('Content-Type', files[0].contentType)
		/** return response */
		return readstream.pipe(res);
	});
});

module.exports = router;
