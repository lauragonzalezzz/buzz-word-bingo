var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended : true })
var buzzObj = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : true }))

app.get('/buzzwords', function(res){
  res.json({ buzzWords : buzzObj});
});

app.post('/buzzwords', urlencodedParser, function(req, res){
  if (!req.body){
    return res.sendStatus(400);
  }
  if (typeof req.body.buzzword === 'string' &&
    req.body.hasOwnProperty('score')){
    req.body.score = Number(req.body.score);
    buzzObj.push(req.body);
  }
});

var server = app.listen(8080, function(){
  console.log("App Listening!");
});