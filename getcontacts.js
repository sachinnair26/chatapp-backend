var url = require('url')
var mongoconnect = require('./constants').mongoconnect
module.exports.getcontacts = function (name) {
    var contacts = {}

   return mongoconnect.then(function (db) {
      return db.db('test').collection('Data').aggregate([
            { $match: { _id: name } },
            { $unwind: "$contacts" },
            { $unwind: "$contacts.mesg" },
            {
                $lookup: {
                    from: "Messages",
                    localField: "contacts.mesg",
                    foreignField: "_id",
                    as: "contacts.mesg"
                }
            },{ $unwind: "$contacts.mesg" },{
                $group:{
                    _id:'$_id',
                mesg:{$push:'$contacts.mesg'},
                'contacts': { $addToSet:{name:'$contacts.name'}}
                    
                }
            },{
                $set:{
                    "contacts.mesg":'$mesg',
                    'mesg':null
                },
            }
            
       
        ]).limit(10)


    })

}

