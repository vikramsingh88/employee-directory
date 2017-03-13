var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/routes');

var app = express();

app.use(express.static(__dirname+'/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', routes.index);

app.get('/employee', routes.employees);
app.get('/employee/:id', routes.getEmployee);

app.post('/employee', routes.addEmployee);
app.put('/employee/:id', routes.updateEmployee);

app.delete('/employee/:id', routes.deleteEmployee);

//for handling 404
app.use(function(req,res){
    res.status(404).send("Employee does not exist");
});

//for handling 500
app.use(function(error, req, res, next) {
	res.status(500).send('500: Internal Server Error', 500);
});

var port = process.env.PORT || 8080;

app.listen(port, function() {
	console.log("Server is runninig at port : ",port);
})