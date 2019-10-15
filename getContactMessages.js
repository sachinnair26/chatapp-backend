var url = require('url')
var mongoconnect = require('./constants').mongoconnect
ObjectID = require('mongodb').ObjectID,
module.exports = function (name,contact,offset,limit) {
    return mongoconnect.then(function (db) {
        return db.db('test').collection('Data').aggregate([
            { $match: { _id: name } },
            { $unwind: "$contacts" },
            {$match:{'contacts.name':contact}},
            {
                $project: {

                    'contacts.mesg': {
                        $cond: { if: { $eq: [[], '$contacts.mesg'] }, then: [ObjectID('5da172a5e75e7b0d6785d555')], else: '$contacts.mesg' }
                    },
                    'contacts.name':'$contacts.name'
                }
            },
            {
               
                    $project: {
                        'contacts.mesg': { $slice: ['$contacts.mesg', offset, limit+offset] },
                        'contacts.name': '$contacts.name',
                    }
            },
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
                    _id:'$contacts.name',
                mesg:{$push:'$contacts.mesg'},
                'contacts': { $addToSet:{name:'$contacts.name'}}

                }
            },{
                $set:{
                    "contacts.mesg":'$mesg',
                    'mesg':null
                },
            }


        ])


    })

}

