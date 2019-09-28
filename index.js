var http = require('http');
var url = require('url');
var saveuser= require('./saveuserdetail.js');
var getcontacts = require('./getcontacts');
var socket = require('socket.io');
var saveMessage = require('./saveMessage');
var seacrhContact = require('./searchContact');
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
            socket.on('contact-search',function(value){
                var search_res = []
                seacrhContact(value).then(point =>{
                   point.forEach(wick =>{
                       search_res.push(wick.user_name)
                   }).then(tail=>{
                       socket.emit('search-result',search_res)
                   })
                    
                })
            })
   
        })
        
    }
   
    
    
});

server.listen(3001,'127.0.0.2',()=>{
    console.log('====================================');
    console.log("server started ");
    console.log('====================================');
})
