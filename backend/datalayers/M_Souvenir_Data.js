const ObjectId = require("mongodb").ObjectID;
const Database = require("../models/Database");
const M_Souvenir = require("../models/M_Souvenir_Model");

const db = Database.getConnection();
const souvenirData = {
  readAllData: callback => {
    db.collection("m_souvenir")
      .find({ is_delete: false })
      .sort({ code: 1 })
      .toArray((err, souvenirs) => {
        let mSouvenir = souvenirs.map(souvenir => {
          return new M_Souvenir(souvenir);
        });
        // Return Data to Callback
        if (err) {
          callback(err);
        } else {
          callback(mSouvenir);
        }
      });
  },
  readByIdData: (callback, souvenirId) => {
    db.collection("m_souvenir").findOne(
      { is_delete: false, _id: new ObjectId(souvenirId) },
      (err, souvenir) => {
        // Return Data to Callback
        if (err) {
          callback(err);
        } else {
          callback(souvenir);
        }
      }
    );
  },
  createData: (callback, newSouvenir) => {
    let SouvenirData = new M_Souvenir(newSouvenir);
    db.collection("m_souvenir").insertOne(SouvenirData, (err, souvenir) => {
      // Return Data to Callback
      if (err) {
        callback(err);
      } else {
        callback(SouvenirData);
      }
    });
  },
  updateData: (callback, souvenirId, updateSouvenir) => {
    db.collection("m_souvenir").updateOne(
      { _id: new ObjectId(souvenirId) },
      { $set: updateSouvenir },
      (err, souvenir) => {
        // Return Data to Callback
        if (err) {
          callback(err);
        } else {
          callback(updateSouvenir);
        }
      }
    );
  },
  deleteData: (callback, code, deleteSouvenir) => {
    db.collection("m_souvenir").updateOne(
      { code: code },
      { $set: deleteSouvenir },
      (err, souvenir) => {
        // Return Data to Callback
        if (err) {
          callback(err);
        } else {
          callback(deleteSouvenir);
        }
      }
    );
  },
  lastCodeData: callback => {
    db.collection("m_souvenir")
      .find({})
      .sort({ code: -1 })
      .limit(1)
      .toArray((err, souvenirs) => {
        let mSouvenir = souvenirs.map(doc => {
          return new M_Souvenir(doc);
        });
        // Return Data to Callback
        if (err) {
          callback(err);
        } else {
          callback(mSouvenir);
        }
      });
  },
  isRelated: (callback, code) => {
    db.collection("m_souvenir")
      .aggregate([
        {
          $lookup: {
            from: "t_souvenir_item",
            localField: "code",
            foreignField: "m_souvenir_id",
            as: "items"
          }
        },
        {
          $match: { "items.m_souvenir_id": code }
        }
      ])
      .toArray((err, item) => {
        // Return Data to Callback
        if (err) {
          callback(err);
        } else {
          callback(item);
        }
      });
  },
  isNameRelated: (callback, name, souvenirId) => {
    db.collection("m_souvenir")
      .find({
        $and: [
          { _id: { $ne: new ObjectId(souvenirId) } },
          { is_delete: false },
          { name: { $regex: name } }
        ]
      })
      .toArray((err, souvenir) => {
        // Return Data to Callback
        if (err) {
          callback(err);
        } else {
          const names = [];
          souvenir.map(item => {
            let newName = item.name.split(" ")[0];
            names.push({ name: newName });
          });
          callback(names);
        }
      });
  }
};

module.exports = souvenirData;
