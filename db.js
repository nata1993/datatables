const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const db = "datatables";

let _db;

const mongoConnect = (cb) => {
    MongoClient.connect(`mongodb://localhost:27017/${db}`, {useUnifiedTopology: true})
    .then(client => {
        console.log("Connected to DB.");
        _db = client.db();
        cb();
    })
    .catch(error => {
        throw error;
    });
}

const getDB = () => {
    if(_db){
        return _db;
    }
    throw "No db found!";
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;