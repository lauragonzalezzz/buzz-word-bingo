var validation = function(req, res, next){
  if (req.method === 'POST' && req.path === '/buzzword'){
    if (typeof req.body.buzzword === 'string' && req.body.hasOwnProperty('points')){
      return next();
      }
    }
  if (req.method === 'PUT' && req.path === '/buzzword'){
    if (req.body.hasOwnProperty('buzzword') && req.body.hasOwnProperty('heard')){
      return next();
    };
  }
  if(req.method === 'DELETE' && req.path === '/buzzword'){
    if (req.body.hasOwnProperty('buzzword')){
      return next();
    }
  }
  if (req.method === 'POST' && req.path === '/reset'){
    if (req.body.hasOwnProperty('reset')){
      return next();
    }
  }
  return res.send({ "success" : false });
};
module.exports = validation;