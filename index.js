var http = require('http');
var url = require('url');
var saveuser= require('./saveuserdetail.js');
var getcontacts = require('./getcontacts');
var socket = require('socket.io')
const server = http.createServer((req,res) =>{
    
    const reqUrl = url.parse(req.url,true)
    
    if(reqUrl.pathname === '/saveuser' && req.method === 'POST'){
        saveuser.saveuserdetail(req,res);
    }else if(reqUrl.pathname === '/home' && req.method === 'GET'){
        var io = socket.listen(server) 
        
        io.on('connect',function(socket) {
            console.log('thenga');
            
        socket.emit('name',{i:'am'})
   
        })
        
        getcontacts.getcontacts(req,res)
    }
   
    
    
});

server.listen(3001,'127.0.0.2',()=>{
    console.log('====================================');
    console.log("server started ");
    console.log('====================================');
})
