const Database = require("../models/Database");
const ObjectID = require("mongodb").ObjectID;
const M_Menu = require("../models/M_Menu_Model");

const db = Database.getConnection();
const menuData = {
  readMenuAlHandlerData: callback => {
    db.collection("m_menu")
      .find({ is_delete: false })
      .sort({ code: 1 })
      .toArray((err, docs) => {
        let m_menu = docs.map(row => {
          return new M_Menu(row);
        });
        callback(m_menu);
      });
  },
  readMenuSidebar: callback => {
    db.collection("m_menu")
      .aggregate([
        {
          $lookup: {
            from: "m_menu",
            localField: "parent_id",
            foreignField: "code",
            as: "new"
          }
        },
        {
          $match: {
            parent_id: {
              $ne: null
            }
          }
        },
        {
          $group: {
            _id: "$new.name",
            name: {
              $push: "$name"
            },
            controller: {
              $push: "$controller"
            }
          }
        }
      ])
      .toArray((err, docs) => {
        let m_menu = docs.map(row => {
          return new M_Menu(row);
        });
        callback(m_menu);
      });
  },
  readMenuOneById: (callback, id) => {
    db.collection("m_menu")
      .find({ _id: new ObjectID(id) })
      .toArray((err, docs) => {
        let m_menu = docs.map(row => {
          return new M_Menu(row);
        });
        callback(m_menu);
      });
  },
  readMenuLastId: callback => {
    db.collection("m_menu")
      .find({})
      .sort({
        code: -1
      })
      .limit(1)
      .toArray((err, docs) => {
        let m_menu = docs.map(row => {
          return new M_Menu(row);
        });
        callback(m_menu);
      });
  },
  deleteMenuHandler: (callback, id) => {
    db.collection("m_menu").updateOne(
      { code: id },
      { $set: { is_delete: true } },
      (err, docs) => {
        callback(docs);
      }
    );
  },
  updateMenuHandler: (callback, data, id) => {
    db.collection("m_menu").updateOne(
      { _id: new ObjectID(id) },
      { $set: data },
      (err, docs) => {
        callback(data);
      }
    );
  },
  createMenuHandler: (callback, data) => {
    db.collection("m_menu").insertOne(data, (err, docs) => {
      callback(data);
    });
  }
};

module.exports = menuData;
