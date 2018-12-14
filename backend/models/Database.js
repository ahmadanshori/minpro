const MongoClient = require("mongodb").MongoClient;
const dbConfig = require("../config/Db_Config.json").local;

let connection = null;

const DatabaseConnection = {
  connect: cb => {
    let url = dbConfig.host + ":" + dbConfig.port + "/" + dbConfig.name;
    MongoClient.connect(
      url,
      {
        useNewUrlParser: true
      },
      (err, db) => {
        if (!err) {
          connection = db.db(dbConfig.name);
        }
        cb(err, db);
      }
    );
  },
  getConnection: () => {
    return connection;
  }
};

module.exports = DatabaseConnection;
