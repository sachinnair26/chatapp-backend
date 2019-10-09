var mongoconnect = require('./constants').mongoconnect

module.exports = function (search_query) {
    return mongoconnect.then(db => {
        return db.db('test').
            collection('User').
            find({ user_name: { '$regex': '^' + search_query, '$options': 'i' } })

    })
}