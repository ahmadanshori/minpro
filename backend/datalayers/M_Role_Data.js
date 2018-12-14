const DB = require("../models/Database");
const ObjectID = require("mongodb").ObjectID;
const roleModel = require("../models/M_Role_Model");
const userModel = require("../models/M_User_Model");

const db = DB.getConnection();


const datalayer = {
    readAllRole: (callback) => {
        db.collection("m_role").find({is_delete: false}).sort({ code: 1 }).toArray((err, docs) => {
            let role = docs.map((row) => {
              return new roleModel(row);
            });
            callback(role);
          });
      },
    
    readOneRole: (callback, id) => {
        db.collection("m_role").find({ code: id }).sort({ code: 1 }).toArray((err, docs) => {
            let role = docs.map((row) => {
              return new roleModel(row);
            });
            callback(role);
          });
    },
    
    countLength: (callback) => {
        db.collection("m_role").count((err, docs) => {
            callback(docs);
          });
    },
    
    updateRole: (callback, data, id) => {
        db.collection("m_role").updateOne({ code: id }, { $set: data }, (err, docs) => {
            callback(docs);
          }
        );
    },
    
    createRole: (callback, data, itemLen, username) => {
        let prototypeCode = "RO"
        for (i = 0; i<4-(itemLen + 1).toString().length; i++){
            prototypeCode += '0';
        }
        prototypeCode += itemLen + 1;
        let roleObject = new roleModel(data);
        roleObject.code = prototypeCode;
        roleObject.created_date = new Date().toDateString();
        roleObject.is_delete = false;
        roleObject.created_by = username;

        db.collection('m_role').insertOne(roleObject, (err,docs)=>{
            callback(docs);
        } );
    },
    findUser: (callback, id) =>{
        db.collection("m_user").find({$and:[{m_role_id: id}, {is_delete: false}]}).toArray((err, docs)=>{
            let user = docs.map(content=>{
                return new userModel(content);
            });
            callback(user);
        });
    }
}
module.exports = datalayer;