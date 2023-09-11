const app = require("express"); //import express
const router = app.Router();

const ReportModule_1 = require("../controllers/ReportModule");
const BranchModule=require("../controllers/BranchModule");
const { branchlocation } = require("../controllers/BranchModule");

router.post("/test", ReportModule_1.Reports);

router.post("/active_clients", ReportModule_1.ActiveClients);

router.get("/getbranches", BranchModule.branchlocation);

router.post("/getinvoices",ReportModule_1.getInvoices);

router.post("/getinvoicesplitup",ReportModule_1.getInvoiceSplitUp);

router.post("/getserviceinvoice",ReportModule_1.getServiceInvoice);

router.post("/getsummary",ReportModule_1.getSummary);

module.exports = router; // export to use in server.js