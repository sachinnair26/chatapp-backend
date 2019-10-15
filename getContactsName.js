var mongoconnect = require('./constants').mongoconnect
ObjectID = require('mongodb').ObjectID,
    module.exports = function (name) {
        var contacts = {}

        return mongoconnect.then(function (db) {
            return db.db('test').collection('Data').aggregate([
                { $match: { _id: name } },
                { $unwind: "$contacts" },
                {
                    $project: {
                        'contacts.name': '$contacts.name',
                        'mesg_size': { $size: "$contacts.mesg" },
                        'contacts.mesg': {
                            $cond: { if: { $eq: [[], '$contacts.mesg'] }, then: [ObjectID('5da2a2071219e2106aafe6ef')], else: '$contacts.mesg' },
                        },
                    },
                },
                {
                    $project: {
                        'contacts.mesg': { $slice: ['$contacts.mesg', 0, 1] },
                        'contacts.name': '$contacts.name',
                        'mesg_size': '$mesg_size'
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
                }
                , {
                    $project: {
                        'mesg': '$contacts.mesg',
                        'name': '$contacts.name',
                        "mesg_size": '$mesg_size',
                    }
                }
                // {
                //     $group: {
                //         _id: '$contacts.name',
                //         mesg: { $push: '$contacts.mesg' },
                //         'name': {$first:'$contacts.name'},
                //         'mesg_size':{$first:'$mesg_size'}
                //     }
                // }, 
                // {
                //     $set: {
                //         "contacts.mesg": '$mesg',
                //         "contacts.mesg_size":'$mesg_size',
                //         'mesg': null
                //     },
                // },
                // }


            ])


        })

    }

