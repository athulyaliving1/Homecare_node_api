const app = require("express"); //import express
const router = app.Router();

const ReportModule_1 = require("../controllers/ReportModule");
const BranchModule = require("../controllers/BranchModule");


router.post("/test", ReportModule_1.Reports);

router.post("/active_clients", ReportModule_1.ActiveClients);

router.get("/getbranches", BranchModule.branchlocation);

router.post("/getinvoicesbranches", ReportModule_1.getInvoicesPieChart);

router.post("/getinvoices", ReportModule_1.getInvoices);

router.post("/getinvoicesplitup", ReportModule_1.getInvoiceSplitUp);

router.post("/getserviceinvoice", ReportModule_1.getServiceInvoice);

router.post("/getserviceinvoicesplitup", ReportModule_1.getServiceInvoiceSplitup);

router.post("/getsummary", ReportModule_1.getSummary);

router.post("/getreceipts", ReportModule_1.getreceipts);
router.post("/getpendingreceipts", ReportModule_1.getpendingreceipts);

router.post("/getalldayinvoice", ReportModule_1.getalldayinvoice);
router.post("/getcompletedschedules", ReportModule_1.getcompletedschedules);
router.post("/getpendingschedules", ReportModule_1.getpendingschedules);
router.post("/getschedulerevenue", ReportModule_1.getschedulerevenue);
router.post("/getschedulecategoryrevenue", ReportModule_1.getschedulecategoryrevenue);
router.post("/getschedulesubcategoryrevenue", ReportModule_1.getschedulesubcategoryrevenue);
router.post("/getschedulesummary", ReportModule_1.getschedulesummary);


router.get("/getmasterservices", BranchModule.masterServices);
router.get("/getmastercategories", BranchModule.masterCategories);

module.exports = router; // export to use in server.js