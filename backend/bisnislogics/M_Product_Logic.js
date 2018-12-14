const ResponseHelper = require("../helpers/Response_Helper");
const dtl = require("../datalayers/M_Product_Data");

const M_Product_Data = {
    //GET PRODUCT TABLE
    readAllHandler: (req, res, next) => {
        //console.log("disini");
        dtl.readAllHandlerData(items => {
          ResponseHelper.sendResponse(res, 200, items);
          //console.log(JSON.stringify(items))
        });
    },

    //GET PRODUCT BY ID
    readByIdHandler: (req, res, next) => {
      let id = req.params.productId;
        dtl.readByIdHandler(items => {
          ResponseHelper.sendResponse(res, 200, items);
      }, id);
    },

    //VALIDATION
    

    //ADD PRODUCT TABLE
    createHandler: (req, res, next) => {
        let name = (req.body.name).toUpperCase();
       dtl.readByUsername(docs => {
         if(docs){
          ResponseHelper.sendResponse(res, 401, "PRODUCT SUDAH ADA")
          }else{
          dtl.readLastId(companies => {
            if (companies.length > 0) {
              let pattern = companies[0].code.substr(-4);
              let lastestCode = parseInt(pattern) + 1;
              let generatePattern = pattern.substr(
              0,
              pattern.length - lastestCode.toString().length
              );
              var newCode = "PR" + generatePattern + lastestCode;
            } else {
                var newCode = "PR0001";
              }
    
            const data = {
              code: newCode,
              name: (req.body.name).toUpperCase(),
              description: req.body.description,
              is_delete: false,
              created_by: req.body.created_by,
              created_date: new Date().toDateString()
            }

            dtl.createHandler(function(items) {
              ResponseHelper.sendResponse(res, 200, items);
            }, data);
          });
         }
       },name)
    },

    //DELETE PRODUCT
    deleteHandler: (req, res, next) => {
        let id = req.params.productId;
        dtl.deleteHandler(items => {
          ResponseHelper.sendResponse(res, 200, items);
        }, id);
    },

    //EDIT PRODUCT
    updateHandler: (req, res, next) => {
        console.log(req.body);
        let id = req.params.productId;
        const data = {
          name: req.body.name,
          description: req.body.description,
          update_date: new Date().toDateString(),
          update_by : req.body.update_by
          //update_by: ""
        };
        dtl.updateHandler(
          items => {
            ResponseHelper.sendResponse(res, 200, items);
          },
          data,
          id
        );
      },
}

module.exports = M_Product_Data