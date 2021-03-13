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

const save = (name, position, office, extn, startDate, salary) => {
    const db = getDB(); // connect to mongo db
    let dbOperation;

    dbOperation = db.collection('data').insertOne({
        name : name,
        position: position,
        office : office,
        extn: extn,
        startDate: startDate,
        salary: salary
    });
    

    return dbOperation.then(result => {
        console.log("success");
    })
    .catch(error => {
        throw error;
    });
}

const fetchAll = () => {
    const db = getDB();

    return db.collection("data").find().toArray()
    .then(function(data) {
        return data;
    })
    .catch(error=> {
        console.log("Failed to fetch all data");
    });
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
exports.fetchAll = fetchAll;
exports.save = save;