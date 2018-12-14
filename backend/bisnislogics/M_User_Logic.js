const responseHelper = require("../helpers/Response_Helper");
const userData = require("../datalayers/M_User_Data");
const authConfig = require("../config/Auth_Config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");

const M_user_Logic = {
  readUserAllHandler: (req, res, next) => {
    userData.readUserAllData(items => {
      responseHelper.sendResponse(res, 200, items);
    });
  },
  readEmployeeFromUser: (req, res, next) => {
    userData.readEmployeeFromUser(items => {
      //sebelumnya dtl ganti userData
      responseHelper.sendResponse(res, 200, items);
      //responhelper jadi camelcase
    });
  },
  readStaffFromUser: (req, res, next) => {
    userData.readStaffFromUser(items => {
      //sebelumnya dtl ganti userData
      responseHelper.sendResponse(res, 200, items);
      //responhelper jadi camelcase
    });
  },
  readUserByUsername: (req, res, next) => {
    let username = req.params.userid;
    userData.readUserByUsername(items => {
      responseHelper.sendResponse(res, 200, items);
    }, username);
  },
  deleteUserHandler: (req, res, next) => {
    let id = req.params.id;
    userData.deleteUserData(items => {
      responseHelper.sendResponse(res, 200, items);
    }, id);
  },
  createUserHandler: (req, res, next) => {
    let username = req.body.username;
    userData.readUserByUsername(docs => {
      if (docs) {
        responseHelper.sendResponse(res, 401, "User telah ada");
      } else {
        const today = moment().format("YYYY-MM-DD");
        const newUser = {
          username: req.body.username,
          password: req.body.password,
          m_role_id: req.body.m_role_id,
          m_employee_id: req.body.m_employee_id,
          is_delete: false,
          created_by: req.body.created_by,
          created_date: today
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            userData.createUserData(function(items) {
              responseHelper.sendResponse(res, 200, items);
            }, newUser);
          });
        });
      }
    }, username);
  },
  loginUserHandler: (req, res, nex) => {
    let username = req.body.username;
    let password = req.body.password;
    userData.readUserByUsername(docs => {
      if (docs) {
        if (bcrypt.compareSync(password, docs.password)) {
          let token = jwt.sign(docs, authConfig.secretKey);
          delete docs.password;
          let berkas = {
            userdata: docs,
            token: token
          };

          responseHelper.sendResponse(res, 200, berkas);
        } else {
          responseHelper.sendResponse(res, 404, "Password not match");
        }
      } else {
        responseHelper.sendResponse(res, 404, "User not Found");
      }
    }, username);
  },
  updateUserById: (req, res, next) => {
    //param melalui object ID & tidak boleh ganti username
    const today = moment().format("YYYY-MM-DD");
    let id = req.params.id;
    const data = {
      username: req.body.username,
      password: req.body.password,
      m_role_id: req.body.m_role_id,
      m_employee_id: req.body.m_employee_id,
      updated_by: req.body.updated_by,
      updated_date: today
    };

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(data.password, salt, (err, hash) => {
        data.password = hash;
        userData.updateUserData(
          items => {
            responseHelper.sendResponse(res, 200, items);
          },
          data,
          id
        );
      });
    });
  },
  rePassword: (req, res, nex) => {
    let id = req.params.userid;
    let username = req.body.username;
    let password = req.body.password;
    userData.readUserByUsername(docs => {
      //sebelumnya dtl ganti userData
      if (docs) {
        if (bcrypt.compareSync(password, docs.password)) {
          const data = {
            password: req.body.newPassword,
            updated_by: username,
            updated_date: new Date().toDateString()
          };

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(data.password, salt, (err, hash) => {
              data.password = hash;
              userData.rePassword(
                items => {
                  responseHelper.sendResponse(res, 200, items);
                },
                data,
                id
              );
            });
          });
        } else {
          responseHelper.sendResponse(res, 404, "Password not match");
        }
      } else {
        responseHelper.sendResponse(res, 404, "User not found");
      }
    }, username);
  },
  forgotPassword: (req, res, nex) => {
    let id = req.params.userid;
    let username = req.body.username;
    userData.readUserByUsername(docs => {
      if (docs) {
        const data = {
          password: req.body.password,
          updated_by: username,
          updated_date: new Date().toDateString()
        };
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(data.password, salt, (err, hash) => {
            data.password = hash;
            userData.rePassword(
              items => {
                responseHelper.sendResponse(res, 200, items);
              },
              data,
              id
            );
          });
        });
      } else {
        responseHelper.sendResponse(res, 404, "User not found");
      }
    }, username);
  },
  readNotifAdmin: (req, res, next) => {
    userData.readNotifAdmin(items => {
      responseHelper.sendResponse(res, 200, items);
    });
  },
  readNotifStaff: (req, res, next) => {
    let id = req.params.staffid;
    userData.readNotifStaff(items => {
      responseHelper.sendResponse(res, 200, items);
    }, id);
  }
};

module.exports = M_user_Logic;
