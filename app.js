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

app.get('/buzzwords',function(req, res){
  res.json({ buzzWords : buzzObj});
});

app.post('/buzzword', validation(['buzzword', 'points']),function(req, res){
  if (buzzObj.length > 4){
    return res.status(400).send('Please remove a word before adding more, the limit is 5 words.')
  };
  if (isNaN(Number(req.body.points))){
    return res.status(400).send('Please enter a valid numerical points value');
  }
  req.body.points = Number(req.body.points);
  buzzObj.push(req.body);
  return res.send({ "success" : true })
});

app.put('/buzzword', validation(['buzzword', 'heard']), function(req, res){
  for (var i = 0; i < buzzObj.length; i++){
    if (buzzObj[i].buzzword == req.body.buzzword){
      if (req.body.heard === true || req.body.heard === false){
        return res.status(400).send('Please enter a valid boolean value for "heard"');
      }
      buzzObj[i].heard = Boolean(req.body.heard);
      score += buzzObj[i].points;
      return res.send({ "success" : true, "newScore" : score });
    }
  }
  return res.send({ "success" : false });
});

app.delete('/buzzword', validation(['buzzword']), function(req, res){
  for (var i = 0; i < buzzObj.length; i++){
    if (buzzObj[i].buzzword === req.body.buzzword){
      var index = i;
      buzzObj.splice(i, 1);
      return res.send({"success" : true });
    }
  }
  return res.send(400, {"success" : false });
});

app.post('/reset', function(req , res){
  if (req.body.reset === 'true'){
    buzzObj = [];
  }
  return res.send({ "success" : true });
});

if(!module.parent){
  var server = app.listen(8080, function(){
  console.log("App Listening!");
  });
}

module.exports = app