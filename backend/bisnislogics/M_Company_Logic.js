const moment = require('moment');
const ResponseHelper = require('../helpers/Response_Helper')
const dtl = require('../datalayers/M_Company_Data')


const M_Company_Logic = {
    readAllHandler: (req, res, next) => {
        dtl.readCompanyAllHandlerData(function (items) {
            ResponseHelper.sendResponse(res, 200, items)
        })
    },

    readOneByIdHandler: (req, res, next) => {
        id = req.params.companyId;
        dtl.readOneByIdCompanyData(function (items) {
            ResponseHelper.sendResponse(res, 200, items)
        })
    },

    createHandler: (req, res, next) => {
        dtl.generateCompanyCode(companies => {
            let pattern = companies[0].code.substr(-4);
            let latestCode = parseInt(pattern) + 1;
            let generatedPattern = pattern.substr(0, pattern.length - latestCode.toString().length);
            const newCode = "CP" + generatedPattern + latestCode;
            var date = new Date();
            const data = {
                code: newCode,
                name: req.body.name,
                address: req.body.address,
                // province: req.body.province,
                // city:req.body.city,
                phone: req.body.phone,
                email: req.body.email,
                is_delete: false,
                created_by: req.body.created_by,
                created_date: moment().format('YYYY-MM-DD')
            }
            //console.log(JSON.stringify(data))
            dtl.createCompanyHandlerData(function (items) {
                ResponseHelper.sendResponse(res, 200, items)
            }, data)
        })
    },

    updateHandler: (req, res, next) => {
        var date = new Date();
        id = req.params.companyId;
        const data =
            {
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                updated_by: req.body.updated_by,
                updated_date: moment().format('YYYY-MM-DD')
            }
        dtl.updateCompanyHandlerData(function (items) {
            ResponseHelper.sendResponse(res, 200, items)
        }, id, data)
    },

    deleteHandler: (req, res, next) => {
        code = req.params.companyId;
        const data = req.body
        dtl.isUsed((itemEmployee)=>{
            if(itemEmployee.length == 0){
                dtl.updateCompanyHandlerData((itemUpdate)=>{
                    ResponseHelper.sendResponse(res, 200, itemUpdate);        
                }, code, data);
            }
            else{
                ResponseHelper.sendResponse(res, 400, "");
            }
        }, code);
    }
}
// test

module.exports = M_Company_Logic