// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var recordSchema = new Schema({
    temp: String,
    lat: String,
    long: String,
    voltage: String,
    current: String,
    driverName: String,
    speed: String,
    steeringAngle: String,
    tiltAngle: String,
    rpm: String,
    onDate: String,
    onTime: String
});

// on every save, add the date
recordSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
    this.created_at = currentDate;

    next();
});

// the schema is useless so far
// we need to create a model using it
var Record = mongoose.model('Record', recordSchema);

// make this available to our users in our Node applications
module.exports = Record;