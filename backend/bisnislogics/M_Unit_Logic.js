const responseHelper = require("../helpers/Response_Helper");
const unitData = require("../datalayers/M_Unit_Data");
const moment=require('moment')
const M_Unit_BisnisLogic = {
  readUnitHandler: (req, res, next) => {
    unitData.readUnitData(function(items) {
      responseHelper.sendResponse(res, 200, items);
    });
  },
  readOneByIdHandler: (req, res, next) => {
    const id = req.params.unitId;

    unitData.readOneByIdData(function(items) {
      responseHelper.sendResponse(res, 200, items);
    }, id);
  },
  createUnitHandler: (req, res, next) => {
    let data = req.body;
    unitData.countAll(item => {
      unitData.createUnitData(
        function(items) {
          responseHelper.sendResponse(res, 200, items);
        },
        data,item
      );
    });
  },
  updateUnitHandler: (req, res, next) => {
    const id = req.params.unitId;
    const data = {
      code: req.body.code,
      name: req.body.name,
      description: req.body.description,
      updated_by: req.body.updated_by,
      updated_date: moment().format("DD/MM/YYYY")
    };

    unitData.updateUnitData(
      function(items) {
        responseHelper.sendResponse(res, 200, items);
      },
      data,
      id
    );
  },
  deleteUnitHandler: (req, res, next) => {
    const id = req.params.unitId;
    unitData.deleteUnitData(function(items) {
      responseHelper.sendResponse(res, 200, items);
    }, id);
  }
};

module.exports = M_Unit_BisnisLogic;
