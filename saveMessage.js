var url = require('url')
var mongoconnect = require('./constants').mongoconnect

module.exports.saveMessage = function(messageBody){

    var reciver = messageBody.contact
    var sender = messageBody.user
    var message = messageBody.message
    var message_node = ''
    if(sender.length > reciver.length){
        message_node = sender+'-'+reciver
    }else if(sender.length < reciver.length){
        message_node=reciver+'-'+sender
    }else{
        if(sender>reciver){
            message_node = sender+'-'+reciver
        }else if(reciver>sender){
            message_node=reciver+'-'+sender
        }else{
            message_node = reciver+'-'+sender
        }
    }
var obj = {}
obj ={
    user_val:message_node,   
    message:message,
    timestamp:Date.now()
}

    mongoconnect.then(db =>{
        db.db('test').collection('Messages').insertOne(obj,function(err,res){
            res.ops.forEach(wish=>{
                db.db('test').collection('Data').updateOne({_id:'sachinnair26'},
                    {$push:{
                        "contacts.mesg_ref":wish['_id']
                    }
                    
                }, { upsert: true })
            })
            
            db.close();  
        })
    })
}