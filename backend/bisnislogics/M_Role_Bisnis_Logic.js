const response = require('../helpers/Response_Helper');
const datalayer = require('../datalayers/M_Role_Data');

const roleLogic = {
    
    createRole: (req, res, next) => {
        const data = req.body;
        const username = req.userdata.username;
        datalayer.countLength((itemLen)=>{
            datalayer.createRole((items)=>{
                response.sendResponse(res, 200, itemLen);
            }, data, itemLen, username);
        });   
    },

    readAllRole: (req, res, next) => {
        datalayer.readAllRole(items=>{
            response.sendResponse(res,200,items);
        });
    },

    readOneRole: (req, res, next) => {
        let id = req.params.id;
        datalayer.readOneRole(items=>{
            response.sendResponse(res,200,items);
        }, id);
    },
    updateRole: (req, res, next) => {
        let id = req.params.id;
        let data = {
            name : req.body.name,
            description : req.body.description,
            updated_date : new Date().toDateString(),
            updated_by : req.userdata.username,
        }
        datalayer.updateRole((items)=>{
            response.sendResponse(res,200,items);
        }, data, id);
    },
    deleteRole: (req, res, next) => {
        let id = req.params.id;
        let data = {
            updated_date : new Date().toDateString(),
            updated_by : req.userdata.username,
            is_delete: true
        }
        datalayer.findUser((itemUser)=>{
            if(itemUser.length == 0){
                datalayer.updateRole((itemUpdate)=>{
                    response.sendResponse(res, 200, itemUpdate);        
                }, data, id);
            }
            else{
                response.sendResponse(res, 400, null);
            }
        }, id);
    },
}

module.exports = roleLogic;