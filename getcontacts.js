var url = require('url')
var mongoconnect = require('./constants').mongoconnect
module.exports.getcontacts = function(req,res){
    var contacts = {}
    var reqUrl = url.parse(req.url,true)
    
    mongoconnect.then(function(db){
         db.db('test').collection('Data').find({_id:reqUrl.query["_id"]}).forEach(val =>{
            contacts = val["contacts"]
            db.close();
           
        }).then(val =>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(JSON.stringify(contacts));
        })
   
    })}