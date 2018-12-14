const responseHelper = require("../helpers/Response_Helper");
const promotionData = require("../datalayers/T_Promotion_Data");
const moment = require("moment");

const T_Promotion_Logic = {
  readAllPromotionHandler: (req, res, next) => {
    promotionData.readAllData(promotion => {
      responseHelper.sendResponse(res, 200, promotion);
    });
  },
  readByIdHandler: (req, res, next) => {
    const promotionId = req.params.promotionId;

    promotionData.readByIdData(promotion => {
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
    promotionData.lastCodeData(promotion => {
      if (promotion.length > 0) {
        let pattern = promotion[0].code.substr(-5);
        let latestCode = parseInt(pattern) + 1;
        let generatedPattern = pattern.substr(
          0,
          pattern.length - latestCode.toString().length
        );

        // return new code
        var newCode = `TRWOMP${moment().format(
          "DDMMYY"
        )}${generatedPattern}${latestCode}`;
      } else {
        var newCode = `TRWOMP${moment().format("DDMMYY")}00001`;
      }

      const today = moment().format("DD/MM/YYYY");

      let formdata = {
        code: newCode,
        flag_design: req.body.flag_design,
        title: req.body.title,
        t_event_id: req.body.t_event_id,
        t_design_id: req.body.t_design_id,
        request_by: req.body.request_by,
        request_date: today,
        approved_by: req.body.approved_by,
        approved_date: req.body.approved_date,
        assign_to: req.body.assign_to,
        close_date: req.body.close_date,
        note: req.body.note,
        status: 1,
        reject_reason: req.body.reject_reason,
        is_delete: false,
        created_by: req.body.created_by,
        created_date: today
      };

      promotionData.createData(function(items) {
        responseHelper.sendResponse(res, 200, items);
      }, formdata);
    });
  },

  updatePromotionHandler: (req, res, next) => {
    const promotionId = req.params.promotionId;
    const today = moment().format("DD/MM/YYYY");
    const data = {
      title: req.body.title,
      approved_by: req.body.approved_by,
      approved_date: req.body.approved_date,
      assign_to: req.body.assign_to,
      close_date: req.body.close_date,
      note: req.body.note,
      status: req.body.status,
      reject_reason: req.body.reject_reason,
      is_delete: false,
      updated_by: req.body.updated_by,
      updated_date: today
    };
    promotionData.updateData(
      items => {
        responseHelper.sendResponse(res, 200, items);
      },
      data,
      promotionId
    );
  },
  deletePromotionHandler: (req, res, next) => {
    let id = req.params.promotionId;
    promotionData.deleteData(items => {
      responseHelper.sendResponse(res, 200, items);
    }, id);
  }
};
module.exports = T_Promotion_Logic;
