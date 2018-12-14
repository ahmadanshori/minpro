const response = require('../helpers/Response_Helper');
const datalayer = require('../datalayers/M_Menu_Access_Data');

const accessLogic = {
    readAllAccess: (req, res, next) => {
        datalayer.readAllAccess(items=>{
            response.sendResponse(res,200,items);
        });
    },
    readOneAccess: (req, res, next) => {
        let id = req.params.id;
        datalayer.readOneAccess(items=>{
            response.sendResponse(res,200,items);
        }, id);
    },
    updateAccess: (req, res, next) => {
        let id = req.params.id;
        let username = req.userdata.m_employee_id;
        let data = {
            m_menu_id : req.body
        }
        //console.log("dari bisnis logic m_menu_id",data.m_menu_id)
        datalayer.getReqAndDB((items)=>{
            datalayer.createAccess((itemCreate)=>{
                datalayer.makeFalseIsDelete((itemFalse)=>{
                    datalayer.deleteAccess((itemTrue)=>{
                        let message = {
                            "is_delete tobe false": itemFalse,
                            "is_delete tobe true" : itemTrue,
                            "create new access": itemCreate
                        };
                        response.sendResponse(res, 200, message);
                    }, id, items[0], username);
                }, items[2], id, username);  
            }, items[1], id, username);
        }, data, id);
    }
}

module.exports = accessLogic;