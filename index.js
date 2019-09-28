var http = require('http');
var url = require('url');
var saveuser= require('./saveuserdetail.js');
var getcontacts = require('./getcontacts');
var socket = require('socket.io');
var saveMessage = require('./saveMessage');
const server = http.createServer((req,res) =>{
    
    const reqUrl = url.parse(req.url,true)
    
    if(reqUrl.pathname === '/saveuser' && req.method === 'POST'){
        saveuser.saveuserdetail(req,res);
    }else if(reqUrl.pathname === '/home' && req.method === 'GET'){
        getcontacts.getcontacts(req,res)
        var io = socket(server,{transports:['polling']}) 
        
        io.on('connect',function(socket) {
            console.log('thenga');
            
            socket.on('message',function(meg){
           saveMessage.saveMessage(meg)
                    
            })
   
        })
        
    }
   
    
    
});

server.listen(3001,'127.0.0.2',()=>{
    console.log('====================================');
    console.log("server started ");
    console.log('====================================');
})
