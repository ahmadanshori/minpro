const Database = require("../models/Database");
const ObjectId = require("mongodb").ObjectID;
const M_Promotion = require("../models/T_Promotion_Item_File_Model");

const db = Database.getConnection();
const promotionData = {
  readAllData: callback => {
    db.collection("t_promotion_item_file")
      .find({ is_delete: false })
      .sort({ code: 1 })
      .toArray((err, docs) => {
        let tPromotion = docs.map(row => {
          return new M_Promotion(row);
        });
        callback(tPromotion);
      });
  },
  readByIdData: (callback, promotionId) => {
    db.collection("t_promotion_item_file")
      .find({ is_delete: false, t_promotion_id: promotionId })
      .sort({ code: 1 })
      .toArray((err, docs) => {
        let tPromotion = docs.map(row => {
          return new M_Promotion(row);
        });
        callback(tPromotion);
      });
  },
  createData: (callback, formdata) => {
    let promotionData = new M_Promotion(formdata);
    db.collection("t_promotion_item_file").insertOne(
      promotionData,
      (err, docs) => {
        callback(docs);
      }
    );
  },
  updateData: (callback, updatePromotion, promotionId) => {
    db.collection("t_promotion_item_file").updateOne(
      { t_promotion_id: promotionId },
      { $set: updatePromotion },
      (err, docs) => {
        callback(docs);
      }
    );
  },

  updateCloseRequest: (callback, data) => {
    let _ids = [];
    const formdata = data;
    formdata.map((row, index) => {
      _ids.push(new ObjectId(row._id));
      delete row._id;
    });

    _ids.map((row, index) => {
      db.collection("t_promotion_item_file").updateOne(
        { _id: new ObjectId(row) },
        { $set: formdata[index] },
        (err, docs) => {
          if (index == _ids.length - 1) {
            callback(docs);
          }
        }
      );
    });
  },

  deleteData: (callback, id) => {
    db.collection("t_promotion_item_file").updateOne(
      { t_promotion_id: id },
      { $set: { is_delete: true } },
      (err, docs) => {
        callback(docs);
      }
    );
  }
};

module.exports = promotionData;
