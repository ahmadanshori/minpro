const DB = require("../models/Database");
const ObjectID = require("mongodb").ObjectID;
const T_souvenir = require("../models/T_Souvenir_Item_Model");
const T_souvenir_item_view = require("../models/T_Souvenir_item_view_Model");
const db = DB.getConnection();

const dt = {
  //GET TRANSACTION SOUVENIR ITEM
  readSouvenirAllHandler: callback => {
    db.collection("t_souvenir")
      .aggregate([
        {
          $lookup: {
            from: "m_employee",
            localField: "request_by",
            foreignField: "employee_number",
            as: "employee"
          }
        },
        { $unwind: "$employee" },
        {
          $project: {
            code: "$code",
            type: "$type",
            t_event_id: "$t_event_id",
            first_name_requester: "$employee.first_name",
            last_name_requester: "$employee.last_name",
            request_date: "$request_date",
            request_due_date: "$request_due_date",
            approved_by: "$approved_by",
            approved_date: "$approved_date",
            note: "$note",
            recieved_by: "$recieved_by",
            recieved_date: "$recieved_date",
            settlement_approved_by: "$settlement_approved_by",
            settlement_approved_date: "$settlement_approved_date",
            status: "$status",
            is_delete: "$is_delete",
            created_by: "$created_by",
            created_date: "$created_date",
            updated_by: "$updated_by",
            updated_date: "$updated_date",
            note: "$note",
            _id: 1
          }
        },
        { $match: { is_delete: false } }
      ])
      .toArray((err, docs) => {
        let t_souvenir = docs.map(row => {
          return new T_souvenir(row);
        });
        callback(t_souvenir);
      });
  },

  readSouvenirItemAllHandler: callback => {
    db.collection("t_souvenir_item")
      .aggregate([
        {
          $lookup: {
            from: "m_souvenir",
            localField: "m_souvenir_id",
            foreignField: "code",
            as: "a"
          }
        },
        { $unwind: "$a" },
        {
          $project: {
            id: "$id",
            t_souvenir_id: "$t_souvenir_id",
            m_souvenir_id: "$m_souvenir_id",
            name: "$a.name",
            qty: "$qty",
            qty_settlement: "$qty_settlement",
            note: "$note",
            is_delete: "$is_delete",
            _id: 1
          }
        },
        { $match: { is_delete: false } }
      ])
      .toArray((err, docs) => {
        let souvernir_item = docs.map(row => {
          return new T_souvenir_item_view(row);
        });
        callback(souvernir_item);
      });
  },

  readByIdHandler: (callback, id) => {
    db.collection("t_souvenir_item")
      .find({ t_souvenir_id: id })
      .toArray((err, docs) => {
        let t_souvenir = docs.map(row => {
          return new T_souvenir(row);
        });
        callback(t_souvenir);
      });
  },

  readByHandler: (callback, id) => {
    db.collection("t_souvenir_item")
      .find({ t_souvenir_id: id })
      .toArray((err, docs) => {
        let t_souvenir = docs.map(row => {
          return new T_souvenir(row);
        });
        callback(t_souvenir);
      });
  },

  //AUTO INCREMENT
  countCode: (callback, newDate) => {
    console.log(newDate);
    db.collection("t_souvenir")
      .find({ code: { $regex: new RegExp(newDate) } })
      .count((err, count) => {
        callback(count);
      });
  },

  //POST TRANSACTION SOUVENIR ITEM
  createHandler: (callback, data) => {
    db.collection("t_souvenir").insert(data, (err, docs) => {
      callback(docs);
    });
  },

  //DELETE TRANSACTION SOUVENIR ITEM
  deleteHandler: (callback, id) => {
    db.collection("t_souvenir_item").updateOne(
      { code: id },
      { $set: { is_delete: true } },
      (err, docs) => {
        callback(docs);
      }
    );
  },

  //EDIT TRANSACTION SOUVENIR ITEM
  updateHandler: (callback, data, id) => {
    //console.log(data);
    db.collection("t_souvenir").updateOne(
      { code: id },
      { $set: data },
      (err, docs) => {
        callback(docs);
      }
    );
  },

  //APPROVE TRANSACTION SOUVENIR ITEM
  approveHandler: (callback, data, id) => {
    db.collection("t_souvenir").updateOne(
      { code: id },
      { $set: data },
      (err, docs) => {
        callback(docs);
      }
    );
  },

  rejectHandler: (callback, data, id) => {
    db.collection("t_souvenir").updateOne(
      { code: id },
      { $set: data },
      (err, docs) => {
        callback(docs);
      }
    );
  },

  // RECEIVED SOUVENIR REQUEST
  receivedHandler: (callback, data, id) => {
    db.collection("t_souvenir").updateOne(
      { code: id },
      { $set: data },
      (err, docs) => {
        callback(docs);
      }
    );
  },

  // SETTLEMENT SOUVENIR REQUEST
  settlementHandler: (callback, data, id) => {
    db.collection("t_souvenir").updateOne(
      { code: id },
      { $set: data },
      (err, docs) => {
        callback(docs);
      }
    );
  },

  settlementItemHandler: (callback, sett, id) => {
    let a = sett.qty_settlement;
    let tampung = [];
    a.nilai.map((row, index) => {
      let kodeDua = a.kode[index];
      // console.log("ini nilai " + row)
      db.collection("t_souvenir_item").updateOne(
        { t_souvenir_id: id, m_souvenir_id: kodeDua },
        { $set: { qty_settlement: row } },
        (err, docs) => {
          tampung.push(docs);
        }
      );
    });
    callback(tampung);
  },

  // APPROVAL SETTLEMENT SOUVENIR REQUEST
  approveSettlementHandler: (callback, data, id) => {
    db.collection("t_souvenir").updateOne(
      { code: id },
      { $set: data },
      (err, docs) => {
        callback(docs);
      }
    );
  },

  // CLOSE ORDER SOUVENIR REQUEST
  closeOrderHandler: (callback, data, id) => {
    db.collection("t_souvenir").updateOne(
      { code: id },
      { $set: data },
      (err, docs) => {
        callback(docs);
      }
    );
  },

  createItem: (callback, data) => {
    //console.log("ini dari datalayer yang benar", data);
    const func = input => {
      return input.map(content => {
        return content;
      });
    };
    db.collection("t_souvenir_item").insertMany(func(data), (err, docs) => {
      callback(docs);
    });
  }
};

module.exports = dt;
