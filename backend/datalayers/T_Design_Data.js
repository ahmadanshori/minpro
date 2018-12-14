const Database = require("../models/Database");
const ObjectId = require("mongodb").ObjectID;
const M_Design = require("../models/T_Design_Model");

const db = Database.getConnection();
const designData = {
  readAllData: callback => {
    db.collection("t_design")
      .find({ is_delete: false })
      .sort({ code: 1 })
      .toArray((err, designs) => {
        let tDesign = designs.map(design => {
          return new M_Design(design);
        });
        callback(tDesign);
      });
  },
  readByIdData: (callback, code) => {
    db.collection("t_design").findOne(
      { is_delete: false, code: code },
      (err, design) => {
        callback(design);
      }
    );
  },
  createData: (callback, formdata) => {
    let designData = new M_Design(formdata);
    db.collection("t_design").insertOne(designData, (err, design) => {
      callback(designData);
    });
  },
  updateData: (callback, designId, updateDesign) => {
    db.collection("t_design").updateOne(
      { _id: new ObjectId(designId) },
      { $set: updateDesign },
      (err, souvenir) => {
        callback(updateDesign);
      }
    );
  },
  lastCodeData: callback => {
    db.collection("t_design")
      .find({})
      .sort({ code: -1 })
      .limit(1)
      .toArray((err, docs) => {
        let t_design = docs.map(doc => {
          return new M_Design(doc);
        });
        callback(t_design);
      });
  }
};

module.exports = designData;
