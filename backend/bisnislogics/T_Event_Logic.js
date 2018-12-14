const ResponseHelper = require("../helpers/Response_Helper");
const eventData = require("../datalayers/T_Event_Data");

const T_Event_Logic = {
  readAllHandler: (req, res, next) => {
    eventData.readAllData(function(items) {
      ResponseHelper.sendResponse(res, 200, items);
    });
  },
  readByIdHandler: (req, res, next) => {
    let param = req.params.teventId;
    eventData.readByIdData(items => {
      ResponseHelper.sendResponse(res, 200, items);
    }, param);
  },
  createHandler: (req, res, next) => {
    let ThisDate = new Date();
    // ambil masing-masing yy, mm, dd
    let date = ThisDate.getDate().toString();
    let month = (ThisDate.getMonth() + 1).toString();
    let year = ThisDate.getFullYear()
      .toString()
      .substr(2, 2);
    // Untuk mendapatkan format yy.mm.dd
    let newDate = date + month + year;

    eventData.countTEvent(count => {
      let codeTEvent = "TRWOEV" + newDate;
      for (let i = 0; i < 5 - (count + 1).toString().length; i++) {
        codeTEvent += "0";
      }
      codeTEvent += count + 1;

      let body = req.body;
      body.code = codeTEvent;
      body.is_delete = false;

      eventData.createData(function(items, newDate) {
        ResponseHelper.sendResponse(res, 200, items);
      }, body);
    }, newDate);
  },
  updateHandler: (req, res, next) => {
    let param = req.params.teventId;
    let body = req.body;

    eventData.updateData(
      items => {
        ResponseHelper.sendResponse(res, 200, items);
      },
      param,
      body
    );
  },
  deleteHandler: (req, res, next) => {
    let param = req.params.teventId;

    eventData.deleteData(items => {
      ResponseHelper.sendResponse(res, 200, items);
    }, param);
  }
};

module.exports = T_Event_Logic;
