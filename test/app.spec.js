var request = require('supertest');
var app = require("../app.js");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : true }))

// describe('GET /', function(){
//   it('should pull up the index file', function(){
//     request(app)
//       .get('/')
//       .expect("?")
//   });
// });

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

  it('should return a success message', function(done){
    var body = {'buzzword' : 'scala', 'points' : '2'};
    request(app)
    .post('/buzzword')
    .type('form')
    .send(body)
    .expect(200, done);
  });

  it('should return an error message', function(done){
    var body2 = {'buzzword' : 'elm', 'score' : 'five'};
    request(app)
    .post('/buzzword')
    .type('form')
    .send(body2)
    .expect(400, done);
  });
});