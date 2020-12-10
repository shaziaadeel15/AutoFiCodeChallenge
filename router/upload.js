/* Module for uploading data in database*/

var express = require('express');
var csvtojson = require("csvtojson"); //package for converting csv to json
var db = require('../module/db.js');
var router = express.Router();

//configure csvtojson module
csvtojson({
  noheader:true,
  output: "csv"
})

/// Handling post request
router.post('/upload', function(req,res)
  {
      //Hanle error case when no file was send in post request
      if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
      }
       
      // Get compnay name and csv data
      var companyName = req.body.companyName;
      var uploadFile = req.files.uploadFile;
      console.log('uploadFile.data >>>', uploadFile.data); 
      console.log('companyName >>>', companyName); 

      csvData = uploadFile.data.toString('utf8');

      /// save uploaded data 
      saveData(companyName, csvData).then(result => {
        return res.status(201).json({status:result});
      }).catch(err => {
        return res.status(400).json({error:err});
      });
  }
  );

/* Function nfor converting csv data in JSON format and upload the data in SQLite databsse
*/
saveData = (companyName, csvData) => {
      return new Promise((resolve, reject) => {
        console.log("csvData="+csvData);
        csvtojson().fromString(csvData).then(elements => 
          {
              if(elements.length> 0 && elements[0].uuid == null)
              {
                console.log("UUID field is missing in loaded file")
                reject("UUID field is missing in loaded file"); 
                return;
              }
                

              db.saveVehicleData(companyName, elements);
              resolve("Data is succesfully loaded");
          }
        ).catch( err => {reject("Invalid CSV file"); });
      });
    }


module.exports = router;
