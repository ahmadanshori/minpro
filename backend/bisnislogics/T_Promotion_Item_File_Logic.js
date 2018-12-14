const responseHelper = require("../helpers/Response_Helper");
const promotionFile = require("../datalayers/T_Promotion_Item_File_Data");
const moment = require("moment");

const T_Promotion_Logic = {
  readAllPromotionHandler: (req, res, next) => {
    promotionFile.readAllData(promotion => {
      responseHelper.sendResponse(res, 200, promotion);
    });
  },
  readByIdHandler: (req, res, next) => {
    const promotionId = req.params.promotionId;

    promotionFile.readByIdData(promotion => {
      if (promotion) {
        responseHelper.sendResponse(res, 200, promotion);
      } else {
        responseHelper.sendResponse(
          res,
          404,
          "404. Transaction Promotion Data Not Found"
        );
      }
    }, promotionId);
  },
  createPromotionHandler: (req, res, next) => {
    const today = moment().format("DD/MM/YYYY");
    let formdata = {
      t_promotion_id: req.body.t_promotion_id,
      filename: req.body.filename,
      size: req.body.size,
      extention: req.body.extention,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      request_due_date: req.body.request_due_date,
      qty: req.body.qty,
      todo: req.body.todo,
      note: req.body.note,
      is_delete: false,
      created_by: req.body.created_by,
      created_date: today
    };

    promotionFile.createData(function(items) {
      responseHelper.sendResponse(res, 200, items);
    }, formdata);
  },

  updatePromotionHandler: (req, res, next) => {
    const promotionId = req.params.promotionId;
    const today = moment().format("DD/MM/YYYY");
    const data = {
      filename: req.body.filename,
      size: req.body.size,
      extention: req.body.extention,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      request_due_date: req.body.request_due_date,
      qty: req.body.qty,
      todo: req.body.todo,
      note: req.body.note,
      is_delete: false,
      updated_by: req.body.updated_by,
      updated_date: today
    };
    promotionFile.updateData(
      items => {
        responseHelper.sendResponse(res, 200, items);
      },
      data,
      promotionId
    );
  },

  updatePromotionCloseRequest: (req, res, next) => {
    let data = req.body;
    promotionFile.updateCloseRequest(items => {
      responseHelper.sendResponse(res, 200, items);
    }, data);
  },

  deletePromotionHandler: (req, res, next) => {
    let id = req.params.promotionId;
    promotionFile.deleteData(items => {
      responseHelper.sendResponse(res, 200, items);
    }, id);
  }
};
module.exports = T_Promotion_Logic;
