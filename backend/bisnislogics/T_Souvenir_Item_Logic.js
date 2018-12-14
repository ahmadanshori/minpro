const ResponseHelper = require("../helpers/Response_Helper");
const souvenirItem = require("../datalayers/T_Souvenir_Item_Data");
const moment = require('moment');

const T_Souvenir_Data = {
  //GET TRANSACTION SOUVENIR
  readSouvenirAllHandler: (req, res, next) => {
    souvenirItem.readSouvenirAllHandler(items => {
      ResponseHelper.sendResponse(res, 200, items);
    });
  },

  readSouvenirItemAllHandler: (req, res, next) => {
    souvenirItem.readSouvenirItemAllHandler(function (items) {
      ResponseHelper.sendResponse(res, 200, items);
      //console.log(JSON.stringify(items))
    });
  },

  readByHandler: (req, res, next) => {
    let id = req.params.souvenirId;
    souvenirItem.readByHandler(items => {
      ResponseHelper.sendResponse(res, 200, items);
    }, id);
  },
  
  //GET TRANSACTION SOUVENIR BY ID
  readByIdHandler: (req, res, next) => {
    let id = req.params.souvenirId;
    souvenirItem.readByIdHandler(items => {
      ResponseHelper.sendResponse(res, 200, items);
    }, id);
  },

  //DELETE TRANSACTION SOUVENIR
  deleteHandler: (req, res, next) => {
    let id = req.params.souvenirId;
    souvenirItem.deleteHandler(items => {
      ResponseHelper.sendResponse(res, 200, items);
    }, id);
  },

  //EDIT TRANSACTION SOUVENIR
  updateHandler: (req, res, next) => {
    let id = req.params.souvenirId;
    const data = {
      request_due_date: req.body.request_due_date,
      note: req.body.note,
      updated_by: req.body.updated_by,
      updated_date: req.body.moment().format('YYYY-MM-DD'),
      //update_by: ""
    };
    souvenirItem.updateHandler(
      items => {
        ResponseHelper.sendResponse(res, 200, items);
        //console.log(JSON.stringify(items))
      },
      data,
      id
    );
  },

  approveHandler: (req, res, next) => {
    let id = req.params.souvenirId;
    const data = {
      status: req.body.status,
      approved_by: req.body.approved_by,
      approved_date: req.body.approved_date,
      //update_by: ""
    };
    souvenirItem.approveHandler(
      items => {
        ResponseHelper.sendResponse(res, 200, items);
        //console.log(JSON.stringify(items))
      }, data, id
    );
  },

  rejectHandler: (req, res, next) => {
    let id = req.params.souvenirId;
    const data = {
      reject_reason: req.body.reject_reason,
      status: req.body.status,
      //update_by: ""
    };
    souvenirItem.rejectHandler(
      items => {
        ResponseHelper.sendResponse(res, 200, items);
        //console.log(JSON.stringify(items))
      }, data, id
    );
  },

  // RECEIVED SOUVENIR REQUEST
  receivedHandler: (req, res, next) => {
    let id = req.params.souvenirId;
    const data = {
      status: req.body.status,
      received_by: req.body.received_by,
      received_date: req.body.received_date,
    };
    souvenirItem.receivedHandler(
      items => {
        ResponseHelper.sendResponse(res, 200, items);
      }, data, id
    );
  },

  // SETTLEMENT SOUVENIR REQUEST
  settlementHandler: (req, res, next) => {
    // console.log(a)
    let id = req.body.code
    const status = {
      status: req.body.stat.status
    }
    const sett ={
      qty_settlement: req.body.sett
    }
    souvenirItem.settlementHandler(items => {
      souvenirItem.settlementItemHandler(item => {
        let message = [items, item]
        ResponseHelper.sendResponse(res, 200, message);
      }, sett, id);
    }, status, id);
  },

  // APPROVAL SETTLEMENT SOUVENIR REQUEST
  approveSettlementHandler: (req, res, next) => {
    // console.log("masukin lah");
    let id = req.params.souvenirId;
    const data = {
      status: req.body.status,
      settlement_approved_by: req.body.settlement_approved_by,
      settlement_approved_date: req.body.settlement_approved_date
    };
    souvenirItem.approveSettlementHandler(
      items => {
        ResponseHelper.sendResponse(res, 200, items);
      }, data, id
    );
  },

  // CLOSE ORDER SOUVENIR HANDLER
  closeOrderHandler: (req, res, next) => {
    let id = req.params.souvenirId;
    const data = {
      status: req.body.status
    };
    souvenirItem.closeOrderHandler(
      items => {
        ResponseHelper.sendResponse(res, 200, items);
      }, data, id
    );
  },

  // SOUVENIR ITEM
  createHandlerItem: (req, res, next) => {
    const data = req.body;
    //console.log("ini data yang harus ke souvenir", data[0])
    // console.log("ini data yang harus ke souvenir item", data[1])
    let thisDate = new Date();
    // ambil masing-masing yy, mm, dd
    let date = thisDate.getDate().toString();
    let month = (thisDate.getMonth() + 1).toString();
    let year = thisDate.getFullYear().toString().substr(2, 2);
    let year1 = thisDate.getFullYear().toString();
    if (month.length == 1) {
      month = "0" + month;
    }
    if (date.length == 1) {
      date = "0" + date;
    }
    // Untuk mendapatkan format yy.mm.dd
    let newDate = "TRSV" + date + month + year;
    let CD = year1 + "-" + month + "-" + date
    souvenirItem.countCode(count => {
      let codeDate = newDate;
      for (let i = 0; i < 5 - (count + 1).toString().length; i++) {
        codeDate += '0';
      }
      codeDate += count + 1;
      data[0].code = codeDate;
      data[0].type = 100;
      data[0].is_delete = false;
      data[0].created_date = CD
      const func = (input, code) => {
        return input.map(content => {
          content.t_souvenir_id = code;
          return content;
        });
      }

      souvenirItem.createHandler(function (items) {
        souvenirItem.createItem(item => {
          let message = [items, item]
          ResponseHelper.sendResponse(res, 200, message);
        }, func(data[1], codeDate));
      }, data[0]);
    }, newDate, CD)

  }
}

// // put setlement bottom
  // updateSouvenirItemAllHandler: (req, res, next) => {
  //   let id = req.params.souvenirId;
  //   const data = {
  //     status: req.body.status,
  //     approved_by: req.body.approved_by,
  //     approved_date: req.body.approved_date,
  //     //update_by: ""
  //   };
  //   souvenirItem.updateSouvenirItemAllHandler(
  //     items => {
  //       ResponseHelper.sendResponse(res, 200, items);
  //       //console.log(JSON.stringify(items))
  //     }, data, id
  //   );
  // },

  // readByIdItemHandler: (req, res, next) => {
  //   let id = req.params.souvenirId;
  //   souvenirItem.readByIdItemHandler(items => {
  //     ResponseHelper.sendResponse(res, 200, items);
  //   }, id);
  // },

  //ADD TRANSACTION SOUVENIER
  // createHandler: (req, res, next) => {
  //   let thisDate = new Date();
  //   // ambil masing-masing yy, mm, dd
  //   let date = thisDate.getDate().toString();
  //   let month = (thisDate.getMonth() + 1).toString();
  //   let year = thisDate.getFullYear().toString().substr(2, 2);
  //   if (month.length == 1) {
  //     month = "0" + month;
  //   }
  //   if (date.length == 1) {
  //     date = "0" + date;
  //   }
  //   // Untuk mendapatkan format yy.mm.dd
  //   let newDate = "TRSV" + date + month + year;

  //   souvenirItem.countCode(count => {
  //     let codeDate = newDate;
  //     for (let i = 0; i < 5 - (count + 1).toString().length; i++) {
  //       codeDate += '0';
  //     }
  //     codeDate += count + 1;

  //     const data = {
  //       code: codeDate,
  //       type: 100,
  //       t_event_id: req.body.t_event_id,
  //       request_by: req.body.request_by,
  //       request_date: req.body.request_date,
  //       request_due_date: req.body.request_due_date,
  //       note: req.body.note,
  //       status: 1,
  //       is_delete: false,
  //       created_by: req.body.created_by,
  //       created_date: req.body.created_date
  //     }

  //     souvenirItem.createHandler(function (items) {
  //       ResponseHelper.sendResponse(res, 200, items);
  //     }, data);
  //   }, newDate)
  // },
module.exports = T_Souvenir_Data