const responseHelper = require("../helpers/Response_Helper");
const souvenirData = require("../datalayers/M_Souvenir_Data");
const moment = require("moment");

const M_Souvenir_Logic = {
  readAllHandler: (req, res, next) => {
    souvenirData.readAllData(souvenir => {
      responseHelper.sendResponse(res, 200, souvenir);
    });
  },
  readByIdHandler: (req, res, next) => {
    const souvenirId = req.params.souvenirId;

    souvenirData.readByIdData(souvenir => {
      if (souvenir) {
        responseHelper.sendResponse(res, 200, souvenir);
      } else {
        responseHelper.sendResponse(res, 404, "404. Souvenir Data Not Found");
      }
    }, souvenirId);
  },
  createHandler: (req, res, next) => {
    // Generate Souvenir Code
    souvenirData.lastCodeData(souvenir => {
      if (souvenir.length > 0) {
        let pattern = souvenir[0].code.substr(-4);
        let latestCode = parseInt(pattern) + 1;
        let generatedPattern = pattern.substr(
          0,
          pattern.length - latestCode.toString().length
        );

        // Return New Souvenir Code
        var newCode = "SV" + generatedPattern + latestCode;
      } else {
        var newCode = "SV0001";
      }

      // Containing Souvenir Data
      const newSouvenir = {
        code: newCode,
        name: req.body.name.toLowerCase(),
        description: req.body.description,
        m_unit_id: req.body.m_unit_id,
        is_delete: false,
        created_by: req.body.created_by,
        created_date: moment().format("DD/MM/YYYY")
      };

      // *Validaton
      // Check is First Letter of Souvenir Name
      // is not the same with exist Souvenir Data
      let newName = newSouvenir.name.split(" ");

      let checkName = [];
      newName.forEach(name => {
        if (name !== "") {
          checkName.push(name);
        }
      });

      souvenirData.isNameRelated(names => {
        // Check if any Related Name Exist
        if (names.length > 0) {
          // Check is the first letter of new souvenir item
          // is the same with the existing one
          names.forEach(souvenir => {
            if (checkName[0] === souvenir.name) {
              responseHelper.sendResponse(
                res,
                201,
                "Create New Souvenir Failed! The First Letter of the Name of the Souvenir may NOT be the same as the name of the Existing Souvenir!"
              );
            } else {
              souvenirData.createData(souvenir => {
                responseHelper.sendResponse(res, 200, souvenir);
              }, newSouvenir);
            }
          });
        } else {
          souvenirData.createData(souvenir => {
            responseHelper.sendResponse(res, 200, souvenir);
          }, newSouvenir);
        }
      }, checkName[0]);
    });
  },
  updateHandler: (req, res, next) => {
    const souvenirId = req.params.souvenirId;
    const updateSouvenir = {
      name: req.body.name.toLowerCase(),
      description: req.body.description,
      m_unit_id: req.body.m_unit_id,
      updated_by: req.body.updated_by,
      updated_date: moment().format("DD/MM/YYYY")
    };

    // *Validaton
    // Check is First Letter of Souvenir Name
    // is not the same with exist Souvenir Data
    let newName = updateSouvenir.name;
    souvenirData.isNameRelated(
      names => {
        // Check if any Related Name Exist
        if (names.length > 0) {
          // Check is the first letter of new souvenir item
          // is the same with the existing one
          names.forEach(souvenir => {
            if (newName.split(" ")[0] === souvenir.name) {
              responseHelper.sendResponse(
                res,
                201,
                "Update Failed! The First Letter of the Name of the Souvenir may NOT be the same as the name of the Existing Souvenir!"
              );
            } else {
              souvenirData.updateData(
                souvenir => {
                  responseHelper.sendResponse(res, 200, souvenir);
                },
                souvenirId,
                updateSouvenir
              );
            }
          });
        } else {
          souvenirData.updateData(
            souvenir => {
              responseHelper.sendResponse(res, 200, souvenir);
            },
            souvenirId,
            updateSouvenir
          );
        }
      },
      newName.split(" ")[0],
      souvenirId
    );
  },
  deleteHandler: (req, res, next) => {
    const code = req.params.code;
    const deleteSouvenir = req.body.deleteData;
    deleteSouvenir.updated_date = moment().format("DD/MM/YYYY");

    souvenirData.isRelated(related => {
      if (related.length > 0) {
        responseHelper.sendResponse(res, 201, "Souvenir Cannot Be Deleted!");
      } else {
        souvenirData.deleteData(
          souvenir => {
            responseHelper.sendResponse(res, 200, souvenir);
          },
          code,
          deleteSouvenir
        );
      }
    }, code);
  }
};

module.exports = M_Souvenir_Logic;
