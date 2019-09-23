var mongoCli = require('./constants.js').mongoCli;
var db_url = require('./constants').db_url;


module.exports.saveuserdetail = function(req,res){
    var body = '';
    req.on('data',function(value){
        body +=value
    });
    req.on('end',function(){
        mongoCli.connect(db_url,{ useNewUrlParser: true },function(err,db){
            db.db("test").collection("User").insertOne(JSON.parse(body),function(err,re){
                if(err) throw err;
                db.close();
                res.writeHead(200,{"Content-Type":'text/html'});
                res.write("details saved");
                res.end();
            })
            
            })
    })
}