var http = require('http');
var url = require('url');
var saveuser= require('./saveuserdetail.js');
var getcontacts = require('./getcontacts');
const server = http.createServer((req,res) =>{
    
    const reqUrl = url.parse(req.url,true)
    console.log(reqUrl);
    
    if(reqUrl.pathname === '/saveuser' && req.method === 'POST'){
        saveuser.saveuserdetail(req,res);
    }else if(reqUrl.pathname === '/home' && req.method === 'GET'){
        getcontacts.getcontacts(req,res)
    }
          

});
server.listen(8080,'127.0.0.2',()=>{
    console.log('====================================');
    console.log("server started ");
    console.log('====================================');
})