const authenticate = require("../helpers/Auth_Helper").checkToken;
const souvenirLogic = require("../bisnislogics/M_Souvenir_Logic");
const menuLogic = require("../bisnislogics/M_Menu_Bisnis_Logic");
const productLogic = require("../bisnislogics/M_Product_Logic");
const tSouvernirLogic = require("../bisnislogics/T_Souvernir_Logic");
const employeeLogic = require("../bisnislogics/M_Employee_Logic");
const tEventLogic = require("../bisnislogics/T_Event_Logic");
const userLogic = require("../bisnislogics/M_User_Logic");
const unitLogic = require("../bisnislogics/M_Unit_Logic");
const designLogic = require("../bisnislogics/T_Design_Logic");
const promotionLogic = require("../bisnislogics/T_Promotion_Logic");
const promotionItemLogic = require("../bisnislogics/T_Promotion_Item_Logic");
const promotionFileLogic = require("../bisnislogics/T_Promotion_Item_File_Logic");
const roleLogic = require("../bisnislogics/M_Role_Bisnis_Logic");
const accessLogic = require("../bisnislogics/M_Menu_Access_Bisnis_Logic");
const companyLogic = require("../bisnislogics/M_Company_Logic");
const tSouvenirItemLogic = require("../bisnislogics/T_Souvenir_Item_Logic");

module.exports = server => {
  // Root Route
  // server.get("/", (req, res, next) => {});
  //   // var result = "welcom bray";
  //   // res.writeHead(200, {
  //   //   "Content-Length": Buffer.byteLength(result),
  //   //   "Content-Type": "text/html"
  //   // }) 

  // Master Souvenir Route
  server.get("/api/souvenir", authenticate, souvenirLogic.readAllHandler);
  server.get("/api/souvenir/:souvenirId", authenticate, souvenirLogic.readByIdHandler);
  server.post("/api/souvenir", authenticate, souvenirLogic.createHandler);
  server.put("/api/souvenir/:souvenirId", authenticate, souvenirLogic.updateHandler);
  server.del("/api/souvenir/:souvenirId",authenticate,souvenirLogic.deleteHandler);
  //== End of Master Souvenir Route

  // Master Company Route
  server.get("/api/company", authenticate, companyLogic.readAllHandler);
  server.get("/api/company/:companyid", authenticate, companyLogic.readOneByIdHandler);
  server.post("/api/company",authenticate, companyLogic.createHandler);
  server.put("/api/company/:companyid", authenticate, companyLogic.updateHandler);
  server.del("/api/company/:companyid",authenticate, companyLogic.deleteHandler);
  //== End of Master Company Route

  // Master Role Route
  server.get("/api/role", authenticate, roleLogic.readAllRole);
  server.get("/api/role/:id", authenticate, roleLogic.readOneRole);
  server.post("/api/role", authenticate, roleLogic.createRole);
  server.put("/api/role/:id", authenticate, roleLogic.updateRole);
  server.del("/api/role/:id", authenticate, roleLogic.deleteRole);
  //== End of Master Role Route

  // Master Access Menu Route
  server.get("/api/accessmenu", authenticate, accessLogic.readAllAccess);
  server.get("/api/accessmenu/:id", authenticate, accessLogic.readOneAccess);
  server.put("/api/accessmenu/:id", authenticate, accessLogic.updateAccess);
  //== End of Master Access Menu Route

  // Master Menu Route
  server.get("/api/menu", authenticate, menuLogic.readMenuAlHandler);
  server.get("/api/menusidebar", authenticate, menuLogic.readMenuSidebar);
  server.get("/api/menu/:menuid", authenticate, menuLogic.readMenuOneById);
  server.post("/api/menu", authenticate, menuLogic.createMenuHandler);
  server.put("/api/menu/:menuid", authenticate, menuLogic.updateMenuHandler);
  server.del("/api/menu/:menuid", authenticate, menuLogic.deleteMenuHandler);
  //== End of Master Menu Route

  // Master Product Route
  server.get("/api/product", authenticate, productLogic.readAllHandler);
  server.get("/api/product/:productId", authenticate, productLogic.readByIdHandler);
  server.post("/api/product", authenticate, productLogic.createHandler);
  server.put("/api/product/:productId", authenticate, productLogic.updateHandler);
  server.del("/api/product/:productId", authenticate, productLogic.deleteHandler);
  //== End of Master Product Route

  // Master Employee Route
  server.get("/api/employee", authenticate, employeeLogic.readAllHandler);
  server.get("/api/employee/:employeeId", authenticate, employeeLogic.readByIdHandler);
  server.post("/api/employee", authenticate, employeeLogic.createHandler);
  server.put("/api/employee/:employeeId",authenticate,employeeLogic.updateHandler);
  server.del("/api/employee/:employeeId",authenticate,employeeLogic.deleteHandler);
  //== End of Master Employee Route

  // Transaction Event Route
  server.get("/api/tevent", authenticate, tEventLogic.readAllHandler);
  server.get("/api/tevent/:teventId",authenticate,tEventLogic.readByIdHandler);
  server.post("/api/tevent", authenticate, tEventLogic.createHandler);
  server.put("/api/tevent/:teventId", authenticate, tEventLogic.updateHandler);
  server.del("/api/tevent/:teventId", authenticate, tEventLogic.deleteHandler);
  //== End of Transaction Event Route

  // Transaction Souvernir Route
  server.get("/api/tsouvenir",authenticate,tSouvernirLogic.readSouvernirAllHandler);
  server.get("/api/tsouvenir/:souvernirId",authenticate,tSouvernirLogic.readByIdHandler);
  server.post("/api/tsouvenir", authenticate, tSouvernirLogic.createHandler);
  server.put("/api/tsouvenir/:souvernirId",authenticate,tSouvernirLogic.updateHandler);
  server.del("/api/tsouvenir/:souvernirId",authenticate,tSouvernirLogic.deleteHandler);
  //==End of Transaction Souvernir Route

  // Master User Route - Login Process
  server.post("/api/user/login", userLogic.loginUserHandler);
  server.put("/api/user/repass/:userid", authenticate, userLogic.rePassword);
  server.put("/api/user/forgot/:userid", userLogic.forgotPassword);
  server.get("/api/user/notifadmin", authenticate, userLogic.readNotifAdmin);
  server.get("/api/user/notifstaff/:staffid",authenticate,userLogic.readNotifStaff);

  // Master User Route - CRUD - ADMIN
  server.get("/api/useremployee", authenticate, userLogic.readEmployeeFromUser);
  server.get("/api/userstaff", authenticate, userLogic.readStaffFromUser);
  server.get("/api/user", authenticate, userLogic.readUserAllHandler);
  server.get("/api/user/:userid", authenticate, userLogic.readUserByUsername);
  server.post("/api/user", authenticate, userLogic.createUserHandler);
  server.put("/api/user/:id", userLogic.updateUserById);
  server.del("/api/user/:id", authenticate, userLogic.deleteUserHandler);
  //==End of Master User Route

  // Master Unit Route
  server.get("/api/unit", authenticate, unitLogic.readUnitHandler);
  server.get("/api/unit/:unitId", authenticate, unitLogic.readOneByIdHandler);
  server.post("/api/unit", authenticate, unitLogic.createUnitHandler);
  server.put("/api/unit/:unitId", authenticate, unitLogic.updateUnitHandler);
  server.del("/api/unit/:unitId", authenticate, unitLogic.deleteUnitHandler);
  //==End of Master Unit Route

  // Transaction Design Route
  server.get("/api/design", authenticate, designLogic.readAllDesignHandler);
  server.get("/api/design/:code", authenticate, designLogic.readByIdHandler);
  server.post("/api/design", authenticate, designLogic.createDesignHandler);
  server.put("/api/design/:designId", authenticate, designLogic.updateDesignHandler);
  //== End of Transaction Design Route

  // Transaction Promotion Route
  server.get("/api/promotion", authenticate, promotionLogic.readAllPromotionHandler);
  server.get("/api/promotion/:promotionId", authenticate, promotionLogic.readByIdHandler);
  server.post("/api/promotion", authenticate, promotionLogic.createPromotionHandler);
  server.put("/api/promotion/:promotionId", authenticate, promotionLogic.updatePromotionHandler);
  server.del("/api/promotion/:promotionId", authenticate, promotionLogic.deletePromotionHandler);

  server.get("/api/promotionitem", authenticate, promotionItemLogic.readAllPromotionHandler);
  server.get("/api/promotionitem/:promotionId", authenticate, promotionItemLogic.readByIdHandler);
  server.post("/api/promotionitem", authenticate, promotionItemLogic.createPromotionHandler );
  server.put("/api/promotionitem/:promotionId", authenticate, promotionItemLogic.updatePromotionHandler);
  server.put("/api/promotionitemclose", authenticate, promotionItemLogic.updatePromotionCloseRequest);
  server.del("/api/promotionitem/:promotionId", authenticate, promotionItemLogic.deletePromotionHandler);

  server.get("/api/promotionfile", authenticate, promotionFileLogic.readAllPromotionHandler);
  server.get("/api/promotionfile/:promotionId", authenticate, promotionFileLogic.readByIdHandler);
  server.post("/api/promotionfile", authenticate, promotionFileLogic.createPromotionHandler );
  server.put("/api/promotionfile/:promotionId", authenticate, promotionFileLogic.updatePromotionHandler);
  server.put("/api/promotionfileclose", authenticate, promotionFileLogic.updatePromotionCloseRequest);
  server.del("/api/promotionfile/:promotionId", authenticate, promotionFileLogic.deletePromotionHandler);
  //== End of Transaction Promotion Route

  //== Transaction Souvenir Item
  server.get("/api/tsouveniritem", authenticate,tSouvenirItemLogic.readSouvenirAllHandler);
  server.get("/api/tsouveniritemview", authenticate,tSouvenirItemLogic.readSouvenirItemAllHandler);
  server.get("/api/tsouveniritemview/:souvenirId", authenticate,tSouvenirItemLogic.readByHandler);
  server.get("/api/tsouveniritem/:souvenirId", tSouvenirItemLogic.readByIdHandler);
  server.post("/api/tsouveniritem",authenticate, tSouvenirItemLogic.createHandlerItem);
  server.put("/api/tsouveniritem/:souvenirId",authenticate, tSouvenirItemLogic.updateHandler);
  server.put("/api/tsouveniritemapprove/:souvenirId",authenticate, tSouvenirItemLogic.approveHandler);
  server.put("/api/tsouveniritemreject/:souvenirId",authenticate, tSouvenirItemLogic.rejectHandler);
  server.put("/api/tsouveniritemreceived/:souvenirId",authenticate, tSouvenirItemLogic.receivedHandler);
  server.put("/api/tsouveniritemsettlement/:souvenirId",authenticate, tSouvenirItemLogic.settlementHandler);
  server.put("/api/tsouveniritemapprovesettlement/:souvenirId",authenticate, tSouvenirItemLogic.approveSettlementHandler);
  server.put("/api/tsouveniritemcloseorder/:souvenirId",authenticate, tSouvenirItemLogic.closeOrderHandler);
  server.del("/api/tsouveniritem/:souvenirId",authenticate,tSouvenirItemLogic.deleteHandler);
  //== End Transaction Souvenir Item
  
};
