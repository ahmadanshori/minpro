const ResponseHelper = require("../helpers/Response_Helper");
const dtl = require("../datalayers/T_Souvernir_Data");

const T_Souvernir_Data = {
     //GET TRANSACTION SOUVERNIR
     readSouvernirAllHandler: (req, res, next) => {
        dtl.readSouvernirAllHandler(items => {
          ResponseHelper.sendResponse(res, 200, items);
          //console.log(JSON.stringify(items))
        });
    },

    //GET TRANSACTION SOUVERNIR BY ID
    readByIdHandler: (req, res, next) => {
      let id = req.params.souvernirId;
      dtl.readByIdHandler(items => {
        ResponseHelper.sendResponse(res, 200, items);
      }, id);
    },

    //ADD TRANSACTION SOUVERNIER
     createHandler  : (req, res, next) => {
      let thisDate = new Date();
      // ambil masing-masing yy, mm, dd
      let date = thisDate.getDate().toString();
      let month = (thisDate.getMonth()+1).toString();
      let year = thisDate.getFullYear().toString().substr(2,2);
      // Untuk mendapatkan format yy.mm.dd
      let newDate = "TRSV" + date  + month + year;
  
      dtl.countCode(count => {
        let codeDate = newDate;
        for (let i = 0; i < 4-(count+1).toString().length; i++) {
          codeDate+='0';
        }
        codeDate+=count+1;
  
        const data = {
          code: codeDate,
          type : 100,
          received_by: req.body.received_by,
          received_date: req.body.received_date,
          note: req.body.note,
          is_delete: false,
          created_by: req.body.created_by,
          created_date: new Date().toDateString()
        }
  
        dtl.createHandler(function(items) {
          ResponseHelper.sendResponse(res, 200, items);
        }, data);
      }, newDate)
    },

    //DELETE TRANSACTION SOUVERNIR
    deleteHandler: (req, res, next) => {
      let id = req.params.souvernirId;
      dtl.deleteHandler(items => {
        ResponseHelper.sendResponse(res, 200, items);
      }, id);
  },

  //EDIT TRANSACTION SOUVERNIR
  updateHandler: (req, res, next) => {
    console.log(req.body);
    let id = req.params.souvernirId;
    const data = {
      received_by: req.body.received_by,
      received_date : req.body.received_date,
      note: req.body.note,
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

module.exports = T_Souvernir_Data