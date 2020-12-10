/** Module for saving uploaded data in SQLite database */
const sqlite3 = require('sqlite3').verbose();
var db = null;

///Export saveVehicleData function, it is called from /upload POST request
exports.saveVehicleData = (companyName, dataRows) => {
    // Save data in companyName database, i.e. if user has provide comapny name as "autofi" 
    // then data will be store in "autofi.db" database
    var dbName = companyName+".db";

    // Open database
    if(db==null)
      openDatabase(dbName);

    // Create 'vehicles' table if it is not exist
    createVehicleTable(dbName);

    /// Now add each row in database table, each row must contain 'uuid' as it is primary key of db table
    for( dataRow of dataRows)
    {
         if(dataRow.uuid==null) continue;

         console.log("Saving data for ...uuid:"+dataRow.uuid+"\n");
         insertUUID(dataRow.uuid);

        if(dataRow.vin!=null) insertData("vin", dataRow.vin, dataRow.uuid);
        if(dataRow.make!=null) insertData("make", dataRow.make, dataRow.uuid);
        if(dataRow.model!=null) insertData("model", dataRow.model, dataRow.uuid);
        if(dataRow.mileage!=null) insertData("mileage", dataRow.mileage, dataRow.uuid);
        if(dataRow.year!=null) insertData("year", dataRow.year, dataRow.uuid);
        if(dataRow.price!=null) insertData("price", dataRow.price, dataRow.uuid);
        if(dataRow.zipcode!=null) insertData("zipcode", dataRow.zipcode, dataRow.uuid);
        if(dataRow.createdate!=null) insertData("createdate", dataRow.createdate, dataRow.uuid);
        if(dataRow.updatedate!=null) insertData("updatedate", dataRow.updatedate, dataRow.uuid);
    }

    /// Close Database
    closeDatabse();
}

/**
 * Function for saving uuid in database
 * @param  uuid 
 */
function insertUUID(uuid)
{
  db.run("INSERT INTO vehicles(UUID) VALUES(?) ", [uuid], function(err) {
    if (err) {
      return console.log("insertUUID...Error:"+err.message);
    }
    // get the last insert id
    console.log('A row has been inserted with uuid'+uuid);
  });
}
/**
 * Function for updating database row of given uuid with name & value pair
 * @param {*} name 
 * @param {*} value 
 * @param {*} uuid 
 */
function insertData(name, value, uuid)
{
  console.log("updating "+name+"="+value+" uuid="+uuid);

  db.run("UPDATE  vehicles SET "+name+"= \""+value+"\" WHERE UUID="+uuid,  function(err) {
    if (err) {
      return console.log(err.message);
    }
  });
}

/**
 * Function for opening database
 * @param {*} dbName 
 */
function openDatabase(dbName)
{
    db = new sqlite3.Database(dbName, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
      });
}

/**
 * Function for creating 'vehicle' table if it do not exist in database
 * @param  dbName 
 */
function createVehicleTable(dbName) {
  if(db==null)
      openDatabase(name);
  
  try {
      db.serialize(() => {
          db.run("CREATE TABLE IF NOT EXISTS vehicles (uuid text primary key, vin text, make text, model text, mileage text, year integer, price integer, zipcode text, createdate date, updatedate date)",
           (err) => { 
             if(err) 
             { 
               console.log(`Problem with Table? ${err}`)
            }
          });
      });  
  } catch(err) {
      console.log(err);
  }
}

/**
 * Function for closing database
 */
function closeDatabse()
{
  if( db==null) return;

  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });

  // assign null value
  db=null;
}
 