var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Record = require('./models/recordSchema');

mongoose.connect('mongodb://garvitjain:Garvitjain81@ds239117.mlab.com:39117/bajaaa',function(err){
  if(err) console.log("error in mongo in app.js");
  console.log("Database Connected")
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(__dirname + '/public'));

var lat, long, voltage, current, driverNo, speed, steeringAngle, tiltAngle, rpm, temp, driverName;

var driverNames = ['', 'Yash', 'Garvit', 'Ram']

app.get('/', function(req, res){
  	res.render('index',{ title: 'Acrostreak - A BAJA Project'} );
});

app.get('/record', function(req,res){
	//load all from mongodb
	Record.find({}, function(err, data){
		if (err) {
			console.log("Err in find record")
			throw err;
		}
		console.log('data found',data[0].onDate, data[0].onTime)
		res.render('records', {title: 'Acrostreak - A BAJA Project', data});
	});
});




// 127.0.0.1:5000/data?driverNo=1&temp=10&voltage=10&current=10&speed=10&lat=22.7248170&long=75.8243170&rpm=10&steeringAngle=10&tiltAngle=10

app.get('/data', function(req, res){
	temp = req.query.temp
	lat = req.query.lat
	long = req.query.long
	voltage = req.query.voltage
	current = req.query.current
	driverNo = req.query.driverNo
	speed = req.query.speed
	steeringAngle = req.query.steeringAngle
	tiltAngle = req.query.tiltAngle
	rpm = req.query.rpm
	if (req.query.driverNo){
		driverNo = req.query.driverNo;
		driverName = driverNames[driverNo]
	}
	var date = new Date();
	var dd = date.getDate();
	var mm = date.getMonth() + 1;
	var yyyy = date.getFullYear();
	
	var min = date.getMinutes();
	var hour = date.getHours();
	var sec = date.getSeconds();

	var onTime = hour + ":" + min + ":" + sec;
	var onDate = dd + "-" + mm + "-" + yyyy;
	var temp1 = new Record({
		temp, lat, long, voltage, current, speed, driverName, steeringAngle, tiltAngle, rpm, onDate, onTime
	});

	temp1.save(function(err){
		if (err) {
			console.log('err in saving record');;
			console.log(err);
		}
		console.log('record Saved');
	})
	console.log(temp)
	io.emit('data', { lat, long, voltage, current, driverNo, speed, driverName, rpm, temp, tiltAngle, steeringAngle });
	
	res.send('<h1>Data Entered</h1>')
})

app.get('*', function(req, res){
	res.send('<img src="https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png" style="height:100%">')
})


io.on('connection', function(socket){
	console.log('new user connected');

	io.emit('data', { lat, long, voltage, current, driverNo, speed, driverName, rpm, temp, tiltAngle, steeringAngle });
	
	socket.on('disconnect', function(){
		console.log('A user Disconnected')	
  	});
	
});

http.listen(process.env.PORT || 5000, function(){
	console.log('listening on *: 5000');
});

