const jwt = require("jsonwebtoken");
const auth = require("../config/Auth_Config.json");
const responseHandler = require("../helpers/Response_Helper");

module.exports = {
  checkToken: (req, res, next) => {
    if (!req.headers.authorization) {
      responseHandler.sendResponse(res, 403, "You doesnt have autorization");
    } else {
      let token = req.headers.authorization;
      jwt.verify(token, auth.secretKey, (err, decoded) => {
        if (decoded == undefined) {
          responseHandler.sendResponse(
            res,
            403,
            "You doesnt have autorization"
          );
        } else {
          req.userdata = decoded;
          next();
        }
      });
    }
  }
};
