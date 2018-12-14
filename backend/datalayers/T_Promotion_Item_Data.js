const Database = require("../models/Database");
const ObjectId = require("mongodb").ObjectID;
const M_Promotion = require("../models/T_Promotion_Item_Model");

const db = Database.getConnection();
const promotionData = {
  readAllData: callback => {
    db.collection("t_promotion_item")
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
    db.collection("t_promotion_item")
      .aggregate([
        { $match: { is_delete: false, t_promotion_id: promotionId } },
        {
          $lookup: {
            from: "m_product",
            localField: "m_product_id",
            foreignField: "code",
            as: "key"
          }
        },
        { $unwind: { path: "$key", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            t_promotion_id: 1,
            t_design_item: 1,
            m_product_id: 1,
            title: 1,
            start_date: 1,
            end_date: 1,
            request_due_date: 1,
            qty: 1,
            todo: 1,
            note: 1,
            is_delete: 1,
            created_date: 1,
            updated_date: 1,
            request_pic: 1,
            created_by: 1,
            updated_by: 1,
            product_name: "$key.name",
            description: "$key.description"
          }
        },
        { $sort: { m_product_id: 1 } }
      ])
      .toArray((err, docs) => {
        callback(docs);
      });
  },
  createData: (callback, formdata) => {
    let promotionData = new M_Promotion(formdata);
    db.collection("t_promotion_item").insertOne(promotionData, (err, docs) => {
      callback(docs);
    });
  },
  updateData: (callback, updatePromotion, promotionId) => {
    db.collection("t_promotion_item").updateOne(
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
      db.collection("t_promotion_item").updateOne(
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
    db.collection("t_promotion_item").updateOne(
      { t_promotion_id: id },
      { $set: { is_delete: true } },
      (err, docs) => {
        callback(docs);
      }
    );
  }
};

module.exports = promotionData;
