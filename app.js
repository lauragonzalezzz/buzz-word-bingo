var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var validation = require('./validation.js');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended : true });
var score = 0;
var buzzObj = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : true }))
app.use(function(req, res, next){
  return validation(req, res, next, buzzObj);
});

app.get('/buzzwords', function(req, res){
  res.json({ buzzWords : buzzObj});
});

app.post('/buzzword', function(req, res){
  if (buzzObj.length > 4){
    return res.status(400).send('Please remove a word before adding more, the limit is 5 words.')
  };
  req.body.points = Number(req.body.points);
  buzzObj.push(req.body);
  console.log(buzzObj);
  return res.send({ "success" : true })
});

app.put('/buzzword', function(req, res){
  for (var i = 0; i < buzzObj.length; i++){
    if (buzzObj[i].buzzword == req.body.buzzword){
      buzzObj[i].heard = Boolean(req.body.heard);
      score += buzzObj[i].points;
      return res.send({ "success" : true, "newScore" : score });
    }
  }
  return res.send({ "success" : false });
});

app.delete('/buzzword', function(req, res){
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
  if (req.body.reset === 'true'){
    buzzObj = [];
  }
  return res.send({ "success" : true });
});

var server = app.listen(8080, function(){
  console.log("App Listening!");
});