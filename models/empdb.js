var mongoose = require('mongoose');

var dbPath = 'mongodb://localhost/empdb';

mongoose.connect(dbPath);

mongoose.connection.on('connected', function() {
	console.log("Database connected");
});

mongoose.connection.on('error', function() {
	console.log("Database connection error");
});

mongoose.connection.on('disconnected', function() {
	console.log("Database disconnected");
});

var empSchema = new mongoose.Schema({
	email : {type : String, unique:true},
	name : {type : String},
	dob : {type : Date},
	gender : {type : String},
	depart : {type : String},
	age : {type : Number}
});

module.exports.Employee = mongoose.model('Employee', empSchema);