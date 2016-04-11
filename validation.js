var validation = function(array){
  return function(req, res, next){
    var missingReqs = array.filter(function(key){
      return !req.body.hasOwnProperty(key) || req.body[key].length === 0;
    });
    if (missingReqs.length !== 0){
      return res.sendStatus(400);
    }
    else {
      next();
    }
  } //End of middleware function
} //End of Val
module.exports = validation;