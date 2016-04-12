var request = require('supertest');
var app = require("../app.js");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : true }))

describe('GET /buzzwords', function(){

  it('respond with json object', function(done){
    request(app)
      .get('/buzzwords')
      .expect(200, done);
  });
});

describe('GET /buzzword', function(){
  it('should not return the buzzwords object', function(done){
    request(app)
      .get('/buzzword')
      .expect(404, done);
  });
});

describe('POST /buzzword', function(){

  it('should save buzzword to memory', function(done){
    var body = {'buzzword' : 'scala', 'points' : '2'};
    request(app)
    .post('/buzzword')
    .type('form')
    .send(body)
    .expect(200, { 'success' : true }, function(err, res){
      if (err){
        return done(err);
      }
      request(app)
      .get('/buzzwords')
      .expect(200, { "buzzWords" : [{'buzzword' : 'scala', 'points' : '2'}]}, done)
    });
  });

  it('should return a success message', function(done){
    var body2 = {'buzzword' : 'responsive', 'points' : '2'};
    request(app)
    .post('/buzzword')
    .type('form')
    .send(body2)
    .expect(200, { 'success' : true }, done);
  });

  it('should return an error message upon incorrect data', function(done){
    var body3 = {'buzzword' : 'elm', 'score' : 'five'};
    request(app)
    .post('/buzzword')
    .type('form')
    .send(body3)
    .expect(400, done);
  });

describe('PUT /buzzword', function(){

  it('should return an error', function(done){
    var body4 = {'buzzword' : 'elm', 'hapi' : 'five'};
    request(app)
    .put('/buzzword')
    .type('form')
    .send(body4)
    .expect(400, done);
  });

  it('should return a success message and new score', function(done){
    var body5 = {'buzzword' : 'regression testing', 'points' : '2'};
    var body6 = {'buzzword' : 'regression testing', 'heard' : true}
    request(app)
    .post('/buzzword')
    .type('form')
    .send(body5)
    .expect(200, { 'success' : true }, function(err, res){
      request(app)
      .put('/buzzword')
      .type('form')
      .send(body6)
      .expect(200, { 'success' : true, newScore : 2 }, done);
    });
  });
});

describe('DELETE /buzzword', function(){

  it('should return an error message', function(done){
    var body7 = {'buzzword' : 'big o complexity', 'points' : '2'};
    var body8 = { 'buzzword' : 'closure'}
    request(app)
    .post('/buzzword')
    .type('form')
    .send(body7)
    .expect(200, { 'success' : true }, function(err, res){
      request(app)
      .delete('/buzzword')
      .type('form')
      .send(body8)
      .expect(400, { 'success' : false }, done)
    });
  });

  it('should delete the buzzword from memory', function(done){
    var body9 = {'buzzword' : 'hoisting', 'points' : '2'};
    var body10 = { 'buzzword' : 'hoisting'}
    request(app)
    .post('/buzzword')
    .type('form')
    .send(body9)
    .expect(200, { 'success' : true }, function(err, res){
      request(app)
      .delete('/buzzword')
      .type('form')
      .send(body10)
      .expect(200, { 'success' : true }, done)
    });
  });

});

});

