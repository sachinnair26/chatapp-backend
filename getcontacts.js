var url = require('url')
var mongoconnect = require('./constants').mongoconnect
module.exports.getcontacts = function (name) {

    var contacts = {}
    return mongoconnect.then(function (db) {
        return db.db('test').collection('Data').find({ _id: name }).forEach(val => {
            contacts[val['_id']] = []
            val['contacts'].forEach(diff => {
                diff.mesg.map(wirl => {
                   return db.db('test').collection('Data').find({ _id: wirl }).forEach(tim => {
                        contacts[val['_id']].push(tim)
                    }).then(pint =>{
                        db.close()
                    })
                })
            })
            db.close();
        }).then(point => {
            return contacts
        })
    }).then(echo =>{
       return echo
        
    })
}