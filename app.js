var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended : true })
var buzzObj = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : true }))

app.get('/buzzwords', function(req, res){
  res.json({ buzzWords : buzzObj});
});

app.post('/buzzword', urlencodedParser, function(req, res){
  if (!req.body){
    return res.sendStatus(400);
  }
  if (typeof req.body.buzzword === 'string' &&
    req.body.hasOwnProperty('score')){
    req.body.score = Number(req.body.score);
    buzzObj.push(req.body);
    console.log('buzzObj',buzzObj);
    return res.send({ "success" : true })
  }
  else {
    return res.send({ "success" : false })
  }
});

app.put('/buzzwords', urlencodedParser, function(req, res){
  if (!req.body){
    return res.sendStatus(400);
  }
  for (var i = 0; i < buzzObj.length; i++){
    console.log('buzzObj.buzzword',buzzObj[i].buzzword);
    console.log('req.body.buzzword',req.body.buzzword);
    console.log(req.body.buzzword === buzzObj[i].buzzword);
    if ((buzzObj[i].buzzword == req.body.buzzword) &&
      req.body.hasOwnProperty('heard')){
      buzzObj[i].heard = Boolean(req.body.heard);
    console.log('buzzObj[i]',buzzObj[i]);
      return res.send({ "success" : true, "newScore" : buzzObj.score });
    }

  }
  // buzzObj.forEach(function(){
    // else {
    //   return res.send({ "success" : false });
    // }

  // }); //ends FOR EACH
  // }
});


var server = app.listen(8080, function(){
  console.log("App Listening!");
});