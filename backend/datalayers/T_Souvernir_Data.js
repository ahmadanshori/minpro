const DB = require("../models/Database");
const ObjectID = require("mongodb").ObjectID;
const T_souvernir = require("../models/T_Souvernir_Model")
const db = DB.getConnection()

const dt = {
     //GET TRANSACTION SOUVERNIR
     readSouvernirAllHandler: callback => {
        db.collection("t_souvenir")
          .find({ is_delete: false })
          .sort({ code: 1 })
          .toArray((err, docs) => {
            let t_souvenir = docs.map(row => {
              return new T_souvernir(row);
            });
            callback(t_souvenir);
        });
    },

    readByIdHandler: (callback, id) => {
      db.collection("t_souvenir")
        .find({ code: id })
        .sort({ code: 1 })
        .toArray((err, docs) => {
          let t_souvenir = docs.map(row => {
            return new T_souvernir(row);
          });
          callback(t_souvenir);
        });
    },

     //AUTO INCREMENT
     countCode: (callback, newDate)=>{
      console.log(newDate)
      db.collection('t_souvenir').find(
        { code : { $regex : new RegExp(newDate) } } ).count(
        (err, count)=>{
          callback(count)
        }
      );
    },

    //POST TRANSACTION SOUVERNIR
     createHandler: (callback, data) => {
        db.collection("t_souvenir").insert(data, (err, docs) => {
          callback(docs);
        });
    },

    //DELETE TRANSACTION SOUVERNIR
    deleteHandler: (callback, id) => {
      db.collection("t_souvenir").updateOne(
        { code: id },
        { $set: { is_delete: true } },
        (err, docs) => {
          callback(docs);
        }
      );
    },

    //EDIT TRANSACTION SOUVERNIR
    updateHandler: (callback, data, id) => {
      console.log(data);
      db.collection("t_souvenir").updateOne(
        { code: id },
        { $set: data },
        (err, docs) => {
          callback(docs);
        }
      );
    },

}

module.exports = dt