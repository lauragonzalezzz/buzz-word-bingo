var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended : true });
var score = 0;
var buzzObj = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : true }))

app.get('/buzzwords', function(req, res){
  res.json({ buzzWords : buzzObj});
});

app.post('/buzzword', function(req, res){
  if (!req.body){
    return res.sendStatus(400);
  }
  if (typeof req.body.buzzword === 'string' &&
    req.body.hasOwnProperty('points')){
    req.body.points = Number(req.body.points);
    buzzObj.push(req.body);
    return res.send({ "success" : true })
  }
  else {
    return res.send({ "success" : false })
  }
});

app.put('/buzzwords', function(req, res){
  if (!req.body){
    return res.sendStatus(400);
  }
  for (var i = 0; i < buzzObj.length; i++){
    if ((buzzObj[i].buzzword == req.body.buzzword) &&
      req.body.hasOwnProperty('heard')){
      buzzObj[i].heard = Boolean(req.body.heard);
      score += buzzObj[i].points;
      return res.send({ "success" : true, "newScore" : score });
    }
  }
  return res.send({ "success" : false });
});

app.delete('/buzzwords', function(req, res){
  if (!req.body){
    return res.send({ "success" : false })
  }
  for (var i = 0; i < buzzObj.length; i++){
    if (buzzObj[i].buzzword === req.body.buzzword){
      var index = i;
      buzzObj.splice(i, 1);
      return res.send({"success" : true });
    }
  }
  return res.send({"success" : false });
});

app.post('/reset', function(req , res){
  if (!req.body){
    return res.send({ "success" : false });
  }
  if (req.body.reset === 'true'){
    buzzObj = [];
  }
  return res.send({ "success" : true });
});

var server = app.listen(8080, function(){
  console.log("App Listening!");
});

//make validation for 5 words
//set option to overwrite a particular word