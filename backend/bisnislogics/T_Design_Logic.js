const responseHelper = require("../helpers/Response_Helper");
const designData = require("../datalayers/T_Design_Data");
const moment = require("moment");

const T_Design_Logic = {
  readAllDesignHandler: (req, res, next) => {
    designData.readAllData(design => {
      responseHelper.sendResponse(res, 200, design);
    });
  },
  readByIdHandler: (req, res, next) => {
    const code = req.params.code;

    designData.readByIdData(design => {
      if (design) {
        responseHelper.sendResponse(res, 200, design);
      } else {
        responseHelper.sendResponse(
          res,
          404,
          "404. Transaction Design Data Not Found"
        );
      }
    }, code);
  },
  createDesignHandler: (req, res, next) => {
    designData.lastCodeData(design => {
      if (design.length > 0) {
        let pattern = design[0].code.substr(-4);
        let latestCode = parseInt(pattern) + 1;
        let generatedPattern = pattern.substr(
          0,
          pattern.length - latestCode.toString().length
        );

        // return new code
        var newCode = `TRWODS${moment().format(
          "DDMMYYYY"
        )}${generatedPattern}${latestCode}`;
      } else {
        var newCode = `TRWODS${moment().format("DDMMYYYY")}00001`;
        responseHelper.sendResponse(res, 200, newCode);
      }

      const today = moment().format("DD-MM-YYYY");

      let formdata = {
        code: newCode,
        t_event_id: req.body.t_event_id,
        title_header: req.body.title_header,
        note: req.body.note,
        request_by: req.body.request_by,
        request_date: today,
        created_by: req.body.created_by,
        created_date: today,
        status: 1,
        is_delete: false
      };

      designData.createData(function(items) {
        responseHelper.sendResponse(res, 200, items);
      }, formdata);
    });
  },
  updateDesignHandler: (req, res, next) => {
    const designId = req.params.designId;

    designData.readByIdData(design => {
      if (design) {
        if (design.status === 1) {
          const t_eventId =
            req.body.t_event_id === ""
              ? design.t_event_id
              : req.body.t_event_id;
          const title_header =
            req.body.title_header === ""
              ? design.title_header
              : req.body.title_header;
          const note = req.body.note === "" ? design.note : req.body.note;

          // contain formdata to an object
          const formdata = {
            t_eventId,
            title_header,
            note,
            updated_by: req.body.updated_by,
            updated_date: moment().format("DD-MM-YYYY")
          };

          designData.updateData(
            design => {
              responseHelper.sendResponse(res, 200, design);
            },
            designId,
            formdata
          );
        } else {
          responseHelper.sendResponse(
            res,
            401,
            "We Are Sorry. Transaction Design Cannot be Changed."
          );
        }
      } else {
        responseHelper.sendResponse(
          res,
          404,
          "404. Transaction Design Data Not Found"
        );
      }
    }, designId);
  }
};
module.exports = T_Design_Logic;
