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
    var body = {'buzzword' : 'scala', 'points' : '2'};
    request(app)
    .post('/buzzword')
    .type('form')
    .send(body)
    .expect(200, { 'success' : true }, done);
  });

  it('should return an error message upon incorrect data', function(done){
    var body2 = {'buzzword' : 'elm', 'score' : 'five'};
    request(app)
    .post('/buzzword')
    .type('form')
    .send(body2)
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



});

});