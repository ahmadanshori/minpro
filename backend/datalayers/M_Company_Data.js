const DB = require('../models/Database')
const ObjectID = require('mongodb').ObjectId
const M_Company = require('../models/M_Company_Model')


const db = DB.getConnection()
const dt = {
    //CRUD Company

    readCompanyAllHandlerData: (callback) => { //res=lempar data ke client
        db.collection('m_company').aggregate([
                { $lookup: { from: "m_employee", localField: "code", foreignField: "m_company_id", as: "creater" } },
                { $lookup: { from: "m_employee", localField: "code", foreignField: "m_company_id", as: "updater"}},
                { $unwind: "$creater" }, { $unwind: "$updater" },
                {
                    $project: {
                        "code": "$code",
                        "name": "$name",
                        "address": "$address",
                        "phone": "$phone",
                        "email": "$email",
                        "is_delete": "$is_delete",
                        "created_by": { $concat: ["$creater.first_name", " ", "$creater.last_name"] },
                        "created_date": "$created_date",
                        "updated_by": { $concat: ["$updater.first_name", " ", "$updater.last_name"] },
                        "updated_date": "$updated_date",
                        _id: 1
                    }
                },
                { $match: { "is_delete": false } },
                {$sort : {"code":1}}
            ])
            .toArray((err, docs) => {
                callback(docs)
            })
    },

    readOneByIdCompanyData: (callback) => { //res=lempar data ke client
        db.collection('m_company').find({ _id: new ObjectID(id) }).sort({ code: 1 })
            .toArray((err, docs) => {
                let m_company =
                    docs.map((row) => {
                        return new M_Company(row)
                    })
                callback(m_company)
            })
    },

    createCompanyHandlerData: (callback, data) => { //res=lempar data ke client
        let company_object = new M_Company(data)
        company_object._id = new ObjectID()
        db.collection('m_company').insert(
            company_object, ((err, docs) => {
                callback(docs)
            }))
    },

    updateCompanyHandlerData: (callback, id, data) => { //res=lempar data ke client
        db.collection('m_company').updateOne({ code: id }, { $set: data },
            ((err, docs) => {
                callback(docs)
            }))
    },

    deleteCompanyHandlerData: (callback, id) => { //res=lempar data ke client
        db.collection('m_company').updateOne({ code: id }, { $set: { is_delete: true } },
            ((err, docs) => {
                callback(docs)
            }))
    },

    generateCompanyCode: (callback) => {
        db.collection('m_company').find().sort({ code: -1 }).limit(1)
            .toArray((err, docs) => {
                let m_company =
                    docs.map((row) => {
                        return new M_Company(row)
                    })
                callback(m_company)
            })
    },

    isUsed: (callback, id) => {
        db.collection("m_employee").find({ $and: [{ m_company_id: id }, { is_delete: false }] }).toArray((err, docs) => {
            let user = docs.map((row) => {
                return new M_Company(row);
            });
            callback(user);
        });
    }
}

module.exports = dt