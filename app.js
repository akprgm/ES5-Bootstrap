const express  = require('express');
const path = require('path');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const ejs = require('ejs');
const ejsLocals = require('ejs-locals');
const expressValidator = require('express-validator');

require('dotenv').config()

const allRouter = require('./routes/all');
const servicesIntializer = require('./bootstrap/');

const app = express();
app.engine('ejs', ejsLocals);
app.set('views',path.join(__dirname+'/views/'));
app.set('view engine', 'ejs');

//security middleware
app.use(helmet());

//maximum request size limit middleware
app.use(bodyParser.json({limit:'1mb'}));
app.use(bodyParser.urlencoded({ extended: true,limit:'1mb'}));
app.use(expressValidator());

//logs middleware
var logDirectory = path.join(__dirname, 'storage/logs')
 
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
 
// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory,
  compress: 'gzip'
})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

//error check middleware
app.use(function(err,request, response, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return;
  } else {
    next();
  }
});

//application routes middleware
app.use('/api/', allRouter);

//initalizing global required services and creating server
Promise.all(servicesIntializer()).then((services)=>{
	app.listen(5000, function(){
		console.log("Server Started Successfully");
	});
}).catch((error)=> {
	console.log(error.name+":- "+ error.message);
});
