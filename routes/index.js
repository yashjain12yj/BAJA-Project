var express = require('express');
var router = express.Router();

driverInfo = {
	driverNo: 1,
	driverNo: 2
}

let lat=22.7248170, long=75.8243170, voltage=3, current=4, driverNo=1, speed=12, steeringAngle=50, tiltAngle=55, rpm=366, temp = 34, driverName = "Garvit";

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Acrostreak - A BAJA Project', lat, long, voltage, current, driverNo, speed, driverName, rpm, temp, tiltAngle, steeringAngle });
});

router.get('/data', function(req, res, next) {
  	res.render('index', { title: 'Acrostreak - A BAJA Project', lat, long, voltage, current, driverNo, speed });
});



module.exports = router;