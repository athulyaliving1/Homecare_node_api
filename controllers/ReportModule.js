var db = require("../db/connection.js").mysql_pool;
const express = require('express');
const bodyParser = require('body-parser');

const Reports = (req, res) => {

    var query1="SELECT CASE WHEN DAYOFMONTH(CURRENT_DATE) > 25 THEN DATEDIFF(DATE_FORMAT(DATE_ADD(CURRENT_DATE, INTERVAL 1 MONTH), '%Y-%m-25'), CURRENT_DATE)+1 ELSE DATEDIFF(DATE_FORMAT(CURRENT_DATE, '%Y-%m-25'),CURRENT_DATE)+1 END AS days_until_adjusted_end_date";
    var query2="SELECT patients.id,patients.patient_id,patients.first_name,service_request_id,schedule_id,(amount * (SELECT CASE WHEN DAYOFMONTH(CURRENT_DATE) > 25 THEN DATEDIFF(DATE_FORMAT(DATE_ADD(CURRENT_DATE, INTERVAL 1 MONTH), '%Y-%m-25'), CURRENT_DATE)+1 ELSE DATEDIFF(DATE_FORMAT(CURRENT_DATE, '%Y-%m-25'),CURRENT_DATE)+1 END AS days_until_adjusted_end_date)) as projected_amount,(SELECT CASE WHEN DAYOFMONTH(CURRENT_DATE) > 25 THEN DATEDIFF(DATE_FORMAT(DATE_ADD(CURRENT_DATE, INTERVAL 1 MONTH), '%Y-%m-25'), CURRENT_DATE)+1 ELSE DATEDIFF(DATE_FORMAT(CURRENT_DATE, '%Y-%m-25'),CURRENT_DATE)+1 END AS days_until_adjusted_end_date) as remaning_days FROM `case_schedules` join patients on case_schedules.patient_id=patients.id where schedule_date=CURRENT_DATE and status!='Cancelled' and chargeable=1";
    db.query(query2,(err,result)=>{
      return res.status(200).json({success:result});
    });
    //return res.status(200).json({success:"Tested"});
  
  };

  const getSummary=async (req,res,next)=>{

    try{

        const { from_date, to_date,branch_id } = req.query;

        if (!from_date || !to_date) {
          return res.status(400).json({ error: 'Please provide both start and end dates' });
        }
    
        const default_branches=await new Promise((resolve,reject)=>{
        
          db.query("select distinct id from master_branches",(err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });

        });
        all_branches=default_branches.map(tt=>tt.id);
        
        const filter_branches=!(branch_id==undefined)?all_branches:branch_id;

        const query = `
        SELECT sum(case_invoices.total_amount) as total_invoice_amount
        FROM case_invoices 
        WHERE case_invoices.invoice_date >= ? AND case_invoices.invoice_date <= ? and status!='Cancelled'
       and case_invoices.branch_id in (?)`;
      
        const invoice_results = await new Promise((resolve, reject) => {
          db.query(query, [from_date, to_date, filter_branches], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
        //console.log(results);

        const receipt_query=`SELECT sum(case_receipts.receipt_amount) as total_receipt_amount FROM case_receipts WHERE case_receipts.receipt_date >= ? AND case_receipts.receipt_date <= ? and case_receipts.receipt_type='Payment Received' and case_receipts.branch_id in (?)`;
      
        const receipt_results = await new Promise((resolve, reject) => {
          db.query(receipt_query, [from_date, to_date, filter_branches], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
        console.log(receipt_results[0].total_receipt_amount);
        const result_json={};
        result_json['Invoice_Sum']=invoice_results[0].total_invoice_amount;
        result_json['Receipt_Sum']=receipt_results[0].total_receipt_amount;
        // const map1 = new Map();
        // map1.set('Invoice_Sum',invoice_results[0].total_invoice_amount);
        // map1.set('Receipt_Sum',receipt_results[0].total_receipt_amount);
        // console.log(map1);

        res.status(200).json({success:true,data:result_json});

      //console.log("Total Amount Sum: $" + totalAmountSum.toFixed(2)); // Rounded to 2 decimal places

    }catch(error){

    }
  }

  const getalldayinvoice=async (req,res,next)=>{

    try{

        const { from_date, to_date,branch_id } = req.query;

        if (!from_date || !to_date) {
          return res.status(400).json({ error: 'Please provide both start and end dates' });
        }
    
        const default_branches=await new Promise((resolve,reject)=>{
        
          db.query("select distinct id from master_branches",(err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });

        });
        all_branches=default_branches.map(tt=>tt.id);
        
        const filter_branches=!(branch_id==undefined)?all_branches:branch_id;

        const query = `
        SELECT case_invoices.invoice_date as label,sum(case_invoices.total_amount) as y
        FROM case_invoices 
        WHERE case_invoices.invoice_date >= ? AND case_invoices.invoice_date <= ? and status!='Cancelled'
       and case_invoices.branch_id in (?) group by case_invoices.invoice_date;`;
      
        const invoice_results = await new Promise((resolve, reject) => {
          db.query(query, [from_date, to_date, filter_branches], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
        console.log("Daily Results:");
        console.log(invoice_results);

        invoice_results.forEach(function(obj){

           
        //const timestamp = "2023-09-12T18:30:00.000Z";
        const dateObject = new Date(obj.label);
        
        // Extract year, month, and day components
        const year = dateObject.getUTCFullYear() % 100; // Get the last two digits of the year
        const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
        const day = dateObject.getUTCDate().toString().padStart(2, '0');
        
        // Create the formatted date string
        const formattedDate = `${day}-${month}-${year}`;
        
        console.log(formattedDate); // Output: "12-09-23"
        obj.label=formattedDate;
        
       
          //console.log(obj.label);
        })
        

        //console.log(results);


     

        res.status(200).json({success:true,data:invoice_results});

      //console.log("Total Amount Sum: $" + totalAmountSum.toFixed(2)); // Rounded to 2 decimal places

    }catch(error){

    }
  }
  const getInvoices= async (req,res,next)=>{

    try{

      
      const { from_date, to_date,branch_id } = req.query;

      if (!from_date || !to_date) {
        return res.status(400).json({ error: 'Please provide both start and end dates' });
      }
  
     const default_branches=await new Promise((resolve,reject)=>{
     
      db.query("select distinct id from master_branches",(err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });

     });
     all_branches=default_branches.map(tt=>tt.id);
     
     const filter_branches=!(branch_id==undefined)?all_branches:branch_id;

      const query = `
        SELECT case_invoices.id,master_branches.branch_name,patients.patient_id,patients.first_name,case_invoices.invoice_no,date_format(case_invoices.invoice_date,'%Y-%m-%d') as dates,case_invoices.total_amount,case_invoices.amount_paid,case_invoices.status 
        FROM case_invoices 
        join patients on case_invoices.patient_id=patients.id
        join master_branches on case_invoices.branch_id=master_branches.id
        WHERE case_invoices.invoice_date >= ? AND case_invoices.invoice_date <= ? and case_invoices.status!='Cancelled'
       and case_invoices.branch_id in (?)`;
      //const branches=!(req.query.branch_id)?req.query.branch_id:[;
      const results = await new Promise((resolve, reject) => {
        db.query(query, [from_date, to_date, filter_branches], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      console.log(results);
      
      const totalAmountSum = results.reduce((sum, invoice) => sum + invoice.total_amount, 0);

      console.log("Total Amount Sum: $" + totalAmountSum.toFixed(2)); // Rounded to 2 decimal places
     
     
     
      res.status(200).json({ success: true, data: results });


    }catch(error){
       console.log(error);
    }
  }

  const getInvoiceSplitUp=async (req,res,next)=>{

    try{

      //  const {invoice_no}=req.query;
        const {invoice_id}=req.query;
        
      //  const invoice_id_result=await new Promise((resolve,reject)=>{

      //         db.query("select distinct id from case_invoices where invoice_no=?",[invoice_no],(err,result)=>{
      //            if(err)
      //            {
      //             reject(err);
      //            }else{
      //             resolve(result);
      //            }
      //         })
      //  });
       //console.log(invoice_id_result[0].id);
       //const invoice_id=invoice_id_result[0].id;
        const query="select master_branches.branch_name,case_schedules.schedule_date,master_services.service_name,case_schedules.amount from case_schedules join case_invoice_items on case_invoice_items.item_id=case_schedules.id join master_services on case_schedules.service_required=master_services.id join master_branches on case_schedules.branch_id=master_branches.id where case_invoice_items.invoice_id=?";
        const results=await new Promise((resolve,reject)=>{

          db.query(query,[invoice_id],(err,query_result)=>{
              
             if(err){
              reject(err);
             }else{
              resolve(query_result);
             }

          });

        });

        res.status(200).json({success:results});

    }catch(error){
      console.log(error);
    }
  };

  const getServiceInvoiceSplitup=async (req,res,next)=>{

    try{

      //  const {invoice_no}=req.query;
        const {from_date,to_date,branch_id,service_name}=req.query;
        //console.log(service_name); 
        if (!from_date || !to_date) {
          return res.status(400).json({ error: 'Please provide both start and end dates' });
        }
    
       const default_branches=await new Promise((resolve,reject)=>{
       
        db.query("select distinct id from master_branches",(err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
  
       });
       all_branches=default_branches.map(tt=>tt.id);
       
       const filter_branches=!(branch_id==undefined)?all_branches:branch_id;
       
       console.log(from_date+" "+to_date+" "+branch_id+" "+service_name);
       
        const service_id=await new Promise((resolve,reject)=>{

          db.query("select id from master_services where service_name=?",[service_name],(err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });

        });
        console.log(service_id[0].id);

        query="SELECT master_branches.branch_name as branch_name,patients.patient_id as patient_id,patients.first_name as patient_name,master_services.service_name as service_name,case_invoices.invoice_no as invoice_no,case_schedules.schedule_date as service_date,case_schedules.amount as amount FROM `case_invoices` join case_invoice_items on case_invoice_items.invoice_id=case_invoices.id join case_schedules on case_invoice_items.item_id=case_schedules.id join patients on case_schedules.patient_id=patients.id join master_branches on case_schedules.branch_id=master_branches.id join master_services on case_schedules.service_required=master_services.id where invoice_date BETWEEN ? and ? and case_invoices.branch_id in (?) and case_schedules.service_required=?"
        const result=await new Promise((resolve,reject)=>{
          
          db.query(query,[from_date,to_date,filter_branches,service_id[0].id],(err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });


        });
        res.status(200).json({success:true,data:result});

    }catch(error){
      console.log(error);
    }
  };
  const getServiceInvoice=async (req,res)=>{

    const { from_date, to_date,branch_id } = req.query;

      if (!from_date || !to_date) {
        return res.status(400).json({ error: 'Please provide both start and end dates' });
      }
  
     const default_branches=await new Promise((resolve,reject)=>{
     
      db.query("select distinct id from master_branches",(err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });

     });
     all_branches=default_branches.map(tt=>tt.id);
     
     const filter_branches=!(branch_id==undefined)?all_branches:branch_id;
     
     const query = `
     select master_services.service_name as label, sum(case_schedules.amount) as y 
     from case_schedules join master_services on case_schedules.service_required=master_services.id 
     where case_schedules.id in (SELECT item_id FROM case_invoice_items WHERE invoice_id in (select id from case_invoices where invoice_date>=? and invoice_date<=? and case_invoices.branch_id in (?) and status!='Cancelled') and status!='Cancelled') group by case_schedules.service_required`;
     
     //const branches=!(req.query.branch_id)?req.query.branch_id:[;
      const results = await new Promise((resolve, reject) => {
        db.query(query, [from_date, to_date, filter_branches], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      console.log(results);
      res.status(200).json({ success: true, data: results });

  };

 const ActiveClients =async (req,res)=>{
  try{

    const countQuery = "select master_branches.branch_name,master_services.id,patients.patient_id,concat(patients.first_name,' ',patients.last_name) as full_name,case_schedules.membership_type,patients.contact_number,case_schedules.schedule_date,master_services.service_name,case_schedules.status,case_schedules.created_at from case_schedules join patients on case_schedules.patient_id=patients.id join master_branches on case_schedules.branch_id=master_branches.id join master_services on case_schedules.service_required=master_services.id where schedule_date>=? and schedule_date<=? and case_schedules.status=?  and case_schedules.service_required IN (?) and case_schedules.membership_type is not null and master_branches.id IN (?) ORDER BY `case_schedules`.`created_at` DESC";
    // const countResult = await db.query(countQuery,(error,result)=>{
    //   return res.status(200).json({success:result});
    // });
    const { filters, sort, page, pageSize, fields } = req.query;
    
    console.log(req.body);
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(pageSize) || 100; // You can adjust the batch size as needed
  
    const offset = (currentPage - 1) * itemsPerPage;

    
     from_date=req.body.from_date;
     to_date=req.body.to_date;
     status=req.body.status;
     service_required=req.body.service_required;
     branch_id=req.body.branch_id;
     
     var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd;
      if(from_date=="" && to_date=="")
      {
        from_date=today;
        to_date=today;
        console.log('sd');
      }
      if(branch_id=="")
      {
        
        branches="select distinct id from master_branches";
        const exists =await new Promise((resolve, reject) => {
          db.query(branches, (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
        var branch_id=[];
        exists.forEach((v) => branch_id.push(v.id));
        //console.log(branches);
      }
      if(service_required=="")
      {
        service_required_query="select distinct id from master_services";

        const services=await new Promise((resolve,reject)=>{
          db.query(service_required_query,(err,result)=>{
            if(err)
            {
             reject(err);
            }else{
             resolve(result);
            }
         });
        });
        var service_required=[];
        services.forEach((v)=>service_required.push(v.id));
         console.log(service_required);
      }
     const countResult = await db.query(countQuery,[from_date,to_date,status,service_required,branch_id],(err,result)=>{

       // Fetch the actual data in batches asynchronously
       console.log(result);
        return res.status(200).json(result);
        
      
    });
   
  
  }catch(error){
    console.log(error);
    return res.status(500).json({error:error});
  } 
 }

  module.exports={
    Reports,
    ActiveClients,
    getInvoices,
    getInvoiceSplitUp,
    getServiceInvoice,
    getSummary,
    getalldayinvoice,
    getServiceInvoiceSplitup
  }