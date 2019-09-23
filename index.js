var http = require('http');
var url = require('url');
var saveuser= require('./saveuserdetail.js');
const server = http.createServer((req,res) =>{
    
    const reqUrl = url.parse(req.url,true)
    if(reqUrl.pathname === '/saveuser' && req.method === 'POST'){
        saveuser.saveuserdetail(req,res);
    }
          

});
server.listen(8080,'127.0.0.2',()=>{
    console.log('====================================');
    console.log("server started ");
    console.log('====================================');
})