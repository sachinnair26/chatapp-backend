var mongoconnect = require('./constants').mongoconnect
ObjectID = require('mongodb').ObjectID,
    module.exports = function (name,offset,limit) {
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
                    $addFields:{'limit':{
                        $cond:{if:{$gte:[limit,'$mesg_size']},then:'$mesg_size',else:limit}
                    },
                    'offset':offset,
                }
                },
                {
                    $project:{
                        'contacts.mesg':'$contacts.mesg',
                        'contacts.name':'$contacts.name',
                        'mesg_size':'$mesg_size',
                       'offset':'$offset',
                       'limit':'$limit'
                        
                    }
                },
                {
                    $project: {
                        'contacts.mesg': { $slice: ['$contacts.mesg', offset,{$cond:{if:{$eq:['$limit',0]},then:1,else:'$limit'}}] },
                        'contacts.name': '$contacts.name',
                        'mesg_size': '$mesg_size',
                        'limit':'$limit',
                         'offset':'$offset'

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
                },
                { $unwind: "$contacts.mesg" },
                {
                    $group: {
                        _id: '$contacts.name',
                        mesg: { $push: '$contacts.mesg' },
                        'name': {$first:'$contacts.name'},
                        'mesg_size':{$first:'$mesg_size'},
                        'limit':{$first:'$limit'},
                        'offset':{$first:'$offset'}
                    }
                }, 
               


            ])


        })

    }

