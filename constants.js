var mongoCli = exports.mongoCli =require('mongodb').MongoClient;
var db_url = exports.db_url = 'mongodb://127.0.0.1:27017/'
exports.mongoconnect = mongoCli.connect(db_url,{ useNewUrlParser: true , useUnifiedTopology: true})
  