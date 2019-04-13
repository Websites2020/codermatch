var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser')

var port = process.env.PORT || 8080;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var con = mysql.createConnection({
  // host: process.env.RDS_HOSTNAME,
  // user: process.env.RDS_USERNAME,
  // password: process.env.RDS_PASSWORD,
  // port: process.env.RDS_PORT,
  // database: "ebdb"
  host: "localhost",
  user: "root",
  password: "",
  database: "toursDB"
});

// Add headers
// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

app.get('/',function(req,res){
  res.sendfile("public/index.html");
  app.use(express.static(__dirname + '/public'));
});

app.get('/resources',function(req,res){
  res.sendfile("public/resources.html");
  app.use(express.static(__dirname + '/public'));
});

app.get('/page1', function (req, res) {
  res.sendfile("public/page1.html");
  app.use(express.static(__dirname + '/public'));
})

app.get('/page2', function (req, res) {
  res.sendfile("public/page2.html");
  app.use(express.static(__dirname + '/public'));
})

app.get('/page3', function(req,res) {
  res.sendfile("public/page3.html");
  app.use(express.static(__dirname + '/public'));
});

app.get('/page4', function(req,res) {
  res.sendfile("public/page4.html");
  app.use(express.static(__dirname + '/public'));
});

app.get('/page5', function(req,res) {
  res.sendfile("public/page5.html");
  app.use(express.static(__dirname + '/public'));
});

app.get('/page6', function(req,res) {
  res.sendfile("public/page6.html");
  app.use(express.static(__dirname + '/public'));
});

app.get('/page7', function(req,res) {
  res.sendfile("public/page7.html");
  app.use(express.static(__dirname + '/public'));
});

app.get('/page8', function(req,res) {
  res.sendfile("public/page8.html");
  app.use(express.static(__dirname + '/public'));
});

app.get('/page9', function(req,res) {
  res.sendfile("public/page9.html");
  app.use(express.static(__dirname + '/public'));
});

app.get('/page10', function(req,res) {
  res.sendfile("public/page10.html");
  app.use(express.static(__dirname + '/public'));
});

app.get('/page11', function(req,res) {
  res.sendfile("public/page11.html");
  app.use(express.static(__dirname + '/public'));
});

app.get('/page12', function(req,res) {
  res.sendfile("public/page12.html");
  app.use(express.static(__dirname + '/public'));
});

app.get('/test',function(req,res){
  res.sendfile("public/test.html");
  app.use(express.static(__dirname + '/public'));
});

app.get('/reading',function(req,res){
  res.sendfile("public/reading.html");
  app.use(express.static(__dirname + '/public'));
});

app.get('/b',function(req,res){
  res.sendfile("public/indexb.html");
  app.use(express.static(__dirname + '/public'));
});

app.get('/thankyou',function(req,res){
  res.sendfile("public/thankyou.html");
  app.use(express.static(__dirname + '/public'));
});

con.connect(function(err) {

app.post('/insert', function(req, res) {
    if (err) throw err;
    // console.log("Connected!");
    var city = req.body.city;
    var country = req.body.country;
    var description = req.body.description;
    var people = req.body.people;
    var date = req.body.date;
    var time = req.body.time;
    var email = req.body.email;
    var budget = req.body.budget;
    var sql = `INSERT INTO tours (city, country, description, people, date, time, email, budget) VALUES ('${city}', '${country}', '${description}', '${people}', '${date}', '${time}', '${email}', '${budget}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      // console.log("1 record inserted");
    });
  res.sendfile("public/thankyou.html");
  app.use(express.static(__dirname + '/public'));
})

var ID;

app.post('/flag', function(req, res) {
  var tourID = req.body.tourID;
  console.log(tourID);
  con.query(`SELECT flag FROM toursDB.tours WHERE tourID = ${tourID}`, function (err, result, fields) {
    if (err) throw err;
    console.log(result[0].flag);
    if (result[0].flag == 1) {
      
      var sql = `UPDATE tours SET flag='2' WHERE tourID = ${tourID}`;
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("flagged twice")
  });
    } else if (result[0].flag == null) {
      
      var sql = `UPDATE tours SET flag='1' WHERE tourID = ${tourID}`;
  
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("flagged once")
      });
    } else if (result[0].flag >= 2) {
      
      var sql = `UPDATE tours SET flag='3' WHERE tourID = ${tourID}`;
  
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("final flag")
      })}
// res.sendfile("public/thankyou.html");
// app.use(express.static(__dirname + '/public'));
})
});

// app.get('/show',function(req,res){
//     if (err) throw err;
//     con.query("SELECT * FROM ebdb.tours WHERE reviewed LIKE '%' ORDER BY tourID DESC", function (err, result, fields) {
//       if (err) throw err;
//       // console.log(result);
//       res.json(result);
//     });
// });

app.get('/show',function(req,res){
  if (err) throw err;
  var currentTime = new Date();
  var month = currentTime.getMonth() + 1
  var day = currentTime.getDate()
  var year = currentTime.getFullYear()
  var date = year + "-" + month + "-" + day;
console.log(date);
  con.query(`SELECT * FROM toursDB.tours WHERE date >= '${date}' ORDER BY tourID DESC`, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.post('/addTourist', function(req,res) {
  if (err) throw err;
  // console.log(req.body);
    var usrName = req.body.usrName;
    console.log(usrName);
    var usrEmail = req.body.usrEmail;
    console.log(usrEmail);
    var usrPass = req.body.usrPass;
    console.log(usrPass);
    var usrLink = req.body.usrLink;
    console.log(usrLink);
    var sql2 = `INSERT IGNORE INTO tourists (username, email, password, linkedin) VALUES ('${usrName}', '${usrEmail}', '${usrPass}', '${usrLink}')`;
    con.query(sql2, function (err, result) {
      // if (err) throw err;
      // console.log(result)
      res.json(result)
    });
    // res.sendfile("public/thankyou.html");
    // app.use(express.static(__dirname + '/public'));
})

app.post('/addLocal', function(req,res) {
  if (err) throw err;
  // console.log(req.body);
    var usrName = req.body.usrName;
    var usrEmail = req.body.usrEmail;
    var usrPass = req.body.usrPass;
    var sql3 = `INSERT IGNORE INTO locals (username, email, password) VALUES ('${usrName}', '${usrEmail}', '${usrPass}')`;
    con.query(sql3, function (err, result) {
      // if (err) throw err;
      // console.log(result)
      res.json(result)
    });
    // res.sendfile("public/index.html");
    // app.use(express.static(__dirname + '/public'));
})

app.post('/torLogin', function(req, res) {
  if (err) throw err;
  // console.log(req.body);
    var adr = req.body.usrName
    var sql = `SELECT * FROM tourists WHERE username = ?`;
    con.query(sql, [adr], function (err, result) {
    if (err) throw err;
      // console.log(result);
      res.json(result);
  });
})

app.post('/locLogin', function(req, res) {
  if (err) throw err;
  // console.log(req.body);
    var adr = req.body.usrName
    var sql = `SELECT * FROM locals WHERE username = ?`;
    con.query(sql, [adr], function (err, result) {
    if (err) throw err;
      // console.log(result);
      res.json(result);
  });
})

app.post('/matchTourist', function(req, res) {
  if (err) throw err;
  // console.log(req.body);
    var usr = req.body.usrName
    var pass = req.body.usrPass
    var sql = `SELECT * FROM tourists WHERE username = "${usr}" AND password = "${pass}"`;
    con.query(sql, function (err, result) {
    if (err) throw err;
      // console.log(result);
      res.json(result);
  });
})

app.post('/matchLocal', function(req, res) {
  if (err) throw err;
  // console.log(req.body);
    var usr = req.body.usrName
    var pass = req.body.usrPass
    var sql = `SELECT * FROM locals WHERE username = "${usr}" AND password = "${pass}"`;
    con.query(sql, function (err, result) {
    if (err) throw err;
      // console.log(result);
      res.json(result);
  });
})

app.post('/insertAcc', function(req, res) {
  if (err) throw err;
  // console.log("Connected!");
  var city = req.body.city;
  var country = req.body.country;
  var description = req.body.description;
  var people = req.body.people;
  var date = req.body.date;
  var time = req.body.time;
  var email = req.body.email;
  var budget = req.body.budget;
  var user = req.body.user;
  var sql = `INSERT INTO tours (city, country, description, people, date, time, email, budget, userID) VALUES ('${city}', '${country}', '${description}', '${people}', '${date}', '${time}', '${email}', '${budget}',(SELECT userID from tourists where username = '${user}'))`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log("1 record inserted");
  });
  res.sendfile("public/thankyou.html");
  app.use(express.static(__dirname + '/public'));
})

app.post('/showTAcc',function(req,res){
  if (err) throw err;
  var usr = req.body.usrID
  con.query(`SELECT * FROM tours WHERE userID = "${usr}" ORDER BY tourID DESC`, function (err, result, fields) {
    if (err) throw err;
    // console.log(result);
    res.json(result);
  });
});

app.post('/deleteListing',function(req,res){
  if (err) throw err;
  var tourID = req.body.tourID
  con.query(`DELETE FROM tours WHERE tourID='${tourID}';`, function (err, result) {
    if (err) throw err;
    // console.log("Number of records deleted: " + result.affectedRows);
    res.json(result);
  });
});

}); //end con.connect

// app.listen(3000)
app.listen(port, function(){
  console.log("Started on PORT 8080");
})