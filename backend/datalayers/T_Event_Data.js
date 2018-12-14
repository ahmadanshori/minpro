const DB = require("../models/Database");
const ObjectId = require("mongodb").ObjectId;
const T_Event = require("../models/T_Event_Model");

const db = DB.getConnection();
const eventData = {
  readAllData: callback => {
    db.collection("t_event")
      .find({ is_delete: false })
      .toArray((err, docs) => {
        let tEventData = docs.map(row => {
          return new T_Event(row);
        });
        callback(tEventData);
      });
  },
  readByIdData: (callback, param) => {
    db.collection("t_event")
      .find({ _id: new ObjectId(param) }, { is_delete: false })
      .toArray((err, docs) => {
        let tEventData = docs.map(row => {
          return new T_Event(row);
        });
        callback(tEventData);
      });
  },
  countTEvent: (callback, newDate) => {
    db.collection("t_event")
      .find({ code: { $regex: new RegExp(newDate) } })
      .count((err, count) => {
        callback(count);
      });
  },
  createData: (callback, body) => {
    let NewBody = new T_Event(body);
    db.collection("t_event").insertOne(NewBody, (err, docs) => {
      callback(docs);
    });
  },
  updateData: (callback, param, body) => {
    db.collection("t_event").updateOne(
      { _id: ObjectId(param) },
      { $set: body },
      (err, docs) => {
        callback(docs);
      }
    );
  },
  deleteData: (callback, param) => {
    db.collection("t_event").updateOne(
      { _id: ObjectId(param) },
      { $set: { is_delete: true } },
      (err, docs) => {
        callback(docs);
      }
    );
  }
};

module.exports = eventData;
