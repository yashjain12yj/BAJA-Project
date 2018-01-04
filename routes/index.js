var express = require('express');
var router = express.Router();

driverInfo = {
	driverNo: 1,
	driverNo: 2
}

/* GET home page. */
router.get('/', function(req, res, next) {
	let lat=1, long=2, voltage=3, current=4, driverNo=1, speed=12, steeringAngle=50, tiltAngle=55, rpm=366, temp = 34, driverName = "Garvit";

  	res.render('index', { title: 'BAHA Project', lat, long, voltage, current, driverNo, speed, driverName });
});

router.get('/data', function(req, res, next) {
	let lat=1, long=2, voltage=3, current=4, driverNo=1, speed=12, steeringAngle=50, tiltAngle=55, rpm=366, temp = 34;

  	res.render('index', { title: 'BAHA Project', lat, long, voltage, current, driverNo, speed });
});



module.exports = router;