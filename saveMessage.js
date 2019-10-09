var url = require('url')
var mongoconnect = require('./constants').mongoconnect

module.exports.saveMessage = function (messageBody) {

    var reciver = messageBody.contact
    var sender = messageBody.user
    var message = messageBody.message

    var obj = {}
    obj = {
        sender: sender,
        reciver: reciver,
        message: message,
        timestamp: Date.now(),
        status: 0
    }
    mongoconnect.then(db => {
        db.db('test').collection('Messages').insertOne(obj, function (err, res) {
            res.ops.forEach(wish => {
                db.db('test').collection('Data').updateOne(
                    { _id: sender },
                    { $push: { "contacts.$[wis].mesg": wish['_id'] } },
                    { arrayFilters: [{ "wis.name": { $eq: reciver } }] },
                    { upsert: true }).then(twist => {
                        db.db('test').collection('Data').updateOne(
                            { _id: reciver },
                            { $push: { "contacts.$[wis].mesg": wish['_id'] } },
                            { arrayFilters: [{ "wis.name": { $eq: sender } }] },
                            { upsert: true })
                    }).then(timp => {
                        db.close();

                    })
            })

        })
    })
}