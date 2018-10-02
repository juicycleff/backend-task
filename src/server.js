const express = require('express');
const multer  = require('multer');
const path = require('path');
const crypto = require('crypto');
const gm = require('gm').subClass({imageMagick: true});;

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
  
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  });
const upload = multer({ storage });
const app = express();

app.use('/uploads', express.static('uploads'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World!\n')
});

app.post('/upload', upload.single('file'), function (req, res) {
    
    if(req.file.path) {
        gm(req.file.path)
            .resize(240, 240, '!')
            .composite(path.join(__dirname, '../public/logo.svg'))
            .geometry('+100+150')
            .write(path.join(__dirname, '../'+req.file.path), function (err, file) {
            if (err) res.send('There was an error transforming file').status(404);
            else res.send('localhost:3000/'+req.file.path).status(200);
        });
    } else {
        res.send('File is missing in the request, please attach a file').status(404);
    }
});

module.exports = app;