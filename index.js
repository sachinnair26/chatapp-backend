var http = require('http');
var url = require('url');
var saveuser = require('./saveuserdetail.js');
var getContactsName = require('./getContactsName');
var getContactMessages = require('./getContactMessages');
var socket = require('socket.io');
var saveMessage = require('./saveMessage');
var seacrhContact = require('./searchContact');
const server = http.createServer((req, res) => {

    const reqUrl = url.parse(req.url, true)

    if (reqUrl.pathname === '/saveuser' && req.method === 'POST') {
        saveuser.saveuserdetail(req, res);
    }
    var io = socket(server, { transports: ['polling'] })

    io.on('connect', function (socket) {
        console.log('thenga');
        socket.on('user-name', function (timp) {
            var offset = 0 ,limit =1
           getContactsName(timp.user_name).then(pint =>{
                pint.forEach(wish =>{
                    
                       socket.emit('save-contact',wish)
                })
            })
        })
        socket.on('fetch-more',function(point){
                getContactMessages(point.name,point.contact,point.offset,point.limit).then(chakka =>{
                    chakka.forEach(innge =>{
                     socket.emit('more-fetched',innge)

                    })
                })
        })
        socket.on('message', function (meg) {
            saveMessage.saveMessage(meg)
            
        })
        socket.on('contact-search', function (value) {

            var search_res = []
            seacrhContact(value).then(point => {
                point.forEach(wick => {
                    search_res.push(wick.user_name)
                }).then(tail => {
                    socket.emit('search-result', search_res)
                })

            })
        })

    })




});

server.listen(3001, '127.0.0.2', () => {
    console.log('====================================');
    console.log("server started ");
    console.log('====================================');
})
