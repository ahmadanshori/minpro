const Database = require("../models/Database");
const ObjectId = require("mongodb").ObjectID;
const M_Promotion = require("../models/T_Promotion_Model");

const db = Database.getConnection();
const promotionData = {
  readAllData: callback => {
    db.collection("t_promotion")
      .aggregate([
        { $match: { is_delete: false } },
        {
          $lookup: {
            from: "m_employee",
            localField: "request_by",
            foreignField: "employee_number",
            as: "key1"
          }
        },
        {
          $lookup: {
            from: "m_employee",
            localField: "approved_by",
            foreignField: "employee_number",
            as: "key2"
          }
        },
        {
          $lookup: {
            from: "m_employee",
            localField: "assign_to",
            foreignField: "employee_number",
            as: "key3"
          }
        },
        {
          $lookup: {
            from: "m_employee",
            localField: "created_by",
            foreignField: "employee_number",
            as: "key4"
          }
        },
        {
          $lookup: {
            from: "m_employee",
            localField: "updated_by",
            foreignField: "employee_number",
            as: "key5"
          }
        },
        { $unwind: { path: "$key1", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$key2", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$key3", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$key4", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$key5", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            code: 1,
            flag_design: 1,
            title: 1,
            t_event_id: 1,
            t_design_id: 1,
            request_date: 1,
            approved_date: 1,
            close_date: 1,
            note: 1,
            reject_reason: 1,
            is_delete: 1,
            updated_date: 1,
            created_date: 1,
            assign_to: 1,
            request_by: {
              $concat: ["$key1.first_name", " ", "$key1.last_name"]
            },
            approved_by: {
              $concat: ["$key2.first_name", " ", "$key2.last_name"]
            },
            name_assign: {
              $concat: ["$key3.first_name", " ", "$key3.last_name"]
            },
            created_by: {
              $concat: ["$key4.first_name", " ", "$key4.last_name"]
            },
            updated_by: {
              $concat: ["$key5.first_name", " ", "$key5.last_name"]
            },
            status: {
              $cond: {
                if: { $eq: ["$status", 0] },
                then: "Rejected",
                else: {
                  $cond: {
                    if: { $eq: ["$status", 1] },
                    then: "Submited",
                    else: {
                      $cond: {
                        if: { $eq: ["$status", 2] },
                        then: "In Progress",
                        else: "Done"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        { $sort: { code: 1 } }
      ])
      .toArray((err, docs) => {
        let tPromotion = docs.map(row => {
          return new M_Promotion(row);
        });
        callback(tPromotion);
      });
  },
  readByIdData: (callback, promotionId) => {
    db.collection("t_promotion")
      .aggregate([
        { $match: { is_delete: false, code: promotionId } },
        {
          $lookup: {
            from: "m_employee",
            localField: "request_by",
            foreignField: "employee_number",
            as: "key1"
          }
        },
        {
          $lookup: {
            from: "m_employee",
            localField: "approved_by",
            foreignField: "employee_number",
            as: "key2"
          }
        },
        {
          $lookup: {
            from: "m_employee",
            localField: "assign_to",
            foreignField: "employee_number",
            as: "key3"
          }
        },
        {
          $lookup: {
            from: "m_employee",
            localField: "created_by",
            foreignField: "employee_number",
            as: "key4"
          }
        },
        {
          $lookup: {
            from: "m_employee",
            localField: "updated_by",
            foreignField: "employee_number",
            as: "key5"
          }
        },
        { $unwind: { path: "$key1", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$key2", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$key3", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$key4", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$key5", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            code: 1,
            flag_design: 1,
            title: 1,
            t_event_id: 1,
            t_design_id: 1,
            request_date: 1,
            approved_date: 1,
            close_date: 1,
            note: 1,
            status: 1,
            reject_reason: 1,
            is_delete: 1,
            updated_date: 1,
            created_date: 1,
            assign_to: 1,
            approved_by: 1,
            updated_by: 1,
            request_by: {
              $concat: ["$key1.first_name", " ", "$key1.last_name"]
            },
            name_approve: {
              $concat: ["$key2.first_name", " ", "$key2.last_name"]
            },
            name_assign: {
              $concat: ["$key3.first_name", " ", "$key3.last_name"]
            },
            created_by: {
              $concat: ["$key4.first_name", " ", "$key4.last_name"]
            },
            name_updated: {
              $concat: ["$key5.first_name", " ", "$key5.last_name"]
            }
          }
        },
        { $sort: { code: 1 } }
      ])
      .toArray((err, docs) => {
        callback(docs[0]);
      });
  },
  createData: (callback, formdata) => {
    let promotionData = new M_Promotion(formdata);
    db.collection("t_promotion").insertOne(promotionData, (err, docs) => {
      callback(docs);
    });
  },
  updateData: (callback, updatePromotion, promotionId) => {
    db.collection("t_promotion").updateOne(
      { code: promotionId },
      { $set: updatePromotion },
      (err, docs) => {
        callback(docs);
      }
    );
  },
  lastCodeData: callback => {
    db.collection("t_promotion")
      .find({})
      .sort({ code: -1 })
      .limit(1)
      .toArray((err, docs) => {
        let t_promotion = docs.map(doc => {
          return new M_Promotion(doc);
        });
        callback(t_promotion);
      });
  },
  deleteData: (callback, id) => {
    db.collection("t_promotion").updateOne(
      { code: id },
      { $set: { is_delete: true } },
      (err, docs) => {
        callback(docs);
      }
    );
  }
};

module.exports = promotionData;
