var mongoose = require('mongoose');
var db=require('../models/empdb.js');
var Employee = mongoose.model('Employee');

//to show index.html
module.exports.index = function(req, res) {
	res.sendFile('public/index.html');
}

//To create new employee in DB
module.exports.addEmployee = function(req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var dob = req.body.dob;
	var gender = req.body.gender;
	var depart = req.body.depart;

	console.log("Inside add employee method");

	var today = new Date();
	var dateOfBirth=new Date(dob);
	var yearDifference = today.getFullYear() - dateOfBirth.getFullYear();
	var monthDifference = today.getMonth() - dateOfBirth.getMonth();
	if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())) {
	    yearDifference--;
	}
	var age=yearDifference;


	if(gender !== "Male" & gender !== "Female"){
		var message="ERROR : Bad Request, Invalid value for gender ";
		console.log(message);
		res.status(400).send(message);
		return;
	}

	var emp = new Employee();	
	emp.name=name;
	emp.email=email;
	emp.dob=dob;
	emp.gender=gender;
	emp.depart=depart;
	emp.age=age;

	//saving emp details to mongo db
	emp.save(function(err, savedEmp){
		if(err){
			res.status(500).send("Error while inserting employee details to db");
		} else {
			//status code 201 for new resource created
			res.status(201).send(savedEmp);
		}
	});
}

//Get all employees
module.exports.employees = function(req, res) {
	Employee.find({}, function(err, employees) {
		if(err) {
			console.log(err);
			res.status(500).send("Error while fetching data");
			return;
		}else {
			res.status(200).send(employees);
		}
	});
}

//get employee by id
module.exports.getEmployee = function(req, res) {
	var empId = req.params.id;

	Employee.findOne({'email':empId}, function(err, employee) {
		if(err) {
			console.log(err);
			res.status(500).send("Error while fetching data");
		} else {
			res.status(200).send(employee);
		}
	});
}

//delete employee in DB
module.exports.deleteEmployee = function(req, res){
	var empId = req.params.id;
	Employee.findOneAndRemove({"email":empId},function(err){
		if(err){
			console.log("Error : "+err);
			res.status(404).send("Employee not found");
		}else {
			res.status(200).send("Employee deleted Successfully");
		}
	});
}

//update employee data
module.exports.updateEmployee = function(req, res) {
	var empId = req.params.id;
	Employee.update({email: empId}, { $set: {name: req.body.name}}, function(err, employee){
		if(err) {
			res.status(500).send("Error while updating");
		} else {
			res.status(200).send(employee);
		}
	});
}
