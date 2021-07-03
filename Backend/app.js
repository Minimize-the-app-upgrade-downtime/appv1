const express = require('express');
var cookieParser = require("cookie-parser");
const mysql = require('mysql');
const path = require('path');
const app = express();

var office = require('./routes/office')
const port = 3000;
const employee = require('./routes/employee');

const db = mysql.createConnection({
    host: 'jhdjjtqo9w5bzq2t.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'u8il24jxufb4n4ty',
    password: 't5z5jvsyolrqhn9k',
    database: 'm0ky8hn32ov17miq'

});


// const db = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'passme',
//         database: 'epfdetails'
    
// });

//create database connection
db.connect((err)=>{
    if(err){
        //throw err;
        console.log(err);
    }
    console.log('connected to database');
});

global.db = db;

app.listen(port,()=>{
    console.log(`Sever runing on port: ${port}`);
});


// configure middleware
app.set('port', process.env.port || port); // set express to use this port


app.use(function(req, res, next) {
    //set headers to allow cross origin request.
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader(
    "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
    );
    next();
  });

// view engine setup
//app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
//app.use(express.static(process.cwd()+"/public"));
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json()); // parse form data client

app.get('/add-employee', (req,res) => {
        res.sendFile(process.cwd()+"/public/index.html")
});

app.get('/add-office', (req,res) => {
    res.sendFile(process.cwd()+"/public/index.html")
});
app.get('/view-employee', (req,res) => {
    res.sendFile(process.cwd()+"/public/index.html")
});
app.get('/view-office', (req,res) => {
    res.sendFile(process.cwd()+"/public/index.html")
});
//view office
app.get('/viewoffice',office);

//load office add form
app.get('/addoffice',office);

// office add form data
app.post('/addFormOffice',office);

//view employee
app.get('/viewemployee',employee);

// load employee page
app.get('/addemployee',employee);

// employee add form data
app.post('/addFormEmployee',employee);



//delete eployee
app.get('/deleteemployee/:id',employee);

// load employee page
app.get('/updateemployee/:id',employee);

//update employee 
app.post('/updateFormEmployee',employee);

module.exports = app;

