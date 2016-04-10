// var validation = function(req, res, next){
//   if (req.method === 'POST' && req.path === '/buzzword'){
//     if (typeof req.body.buzzword === 'string' && req.body.hasOwnProperty('points')){
//       return next();
//       }
//     }
//   if (req.method === 'PUT' && req.path === '/buzzword'){
//     if (req.body.hasOwnProperty('buzzword') && req.body.hasOwnProperty('heard')){
//       return next();
//     };
//   }
//   if(req.method === 'DELETE' && req.path === '/buzzword'){
//     if (req.body.hasOwnProperty('buzzword')){
//       return next();
//     }
//   }
//   if (req.method === 'POST' && req.path === '/reset'){
//     if (req.body.hasOwnProperty('reset')){
//       return next();
//     }
//   }
//   return res.send({ "success" : false });
// };


var validation = function(buzzObj, array){
  return function(req, res, next){
    array.every(function(key){
          console.log(key);
          console.log('buzzObj',buzzObj);
      for (var i = 0; i < buzzObj.length; i++){
        if (buzzObj.hasOwnProperty(key)){
          console.log("key2", key)
          continue;
        }

        // else {
        //   return res.send({ "success" : false });
        // }
      }
      return;
    });
    console.log('done');
    next();
  } //End of middleware function
} //End of Val
module.exports = validation;