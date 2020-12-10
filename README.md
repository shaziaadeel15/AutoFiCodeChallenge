# Auto Fi Coding Challenge

This appliocation provides the functioanlity of uploading vehicles data from CSV file into SQLite database.
After downloading code

- Use following command to add dependencies
  "npm install"

- Use following command to run server
  "node app.js"
  
This application support following API calls

## Get "/"

    Get call to root "/" returns a html page.
    This html page provide GUI, which can be used for uploading file.

## Post "/upload"

    POST request to "/upload" accept two parameters

    - **companyName**  Name of company or data provider
    - **uploadFile**  An object containing uploaded file data

        This call converts the CSV data in JSON format.
        Then this JSON format is given to database module along with "comapnyName".
        Database module store data in SQLite database file.

        Database module open/create database of company name
        ( i.e. if given name is "autofi", then it will create database of name "autofi.db").
        If database do not exist the it will create a new database of this name.
        and create a table of "vehicles".

        The format of "vehicles" table is as follows

        Table : vehicles

                Column name         Column Type
                ----------------------------------------
                uuid                text            primary key
                vin                 text
                make                text
                model               text
                mileage             text
                year                integer
                price               integer
                zipcode             text
                createdate          date
                updatedate          date

        "uuid" is primary key so it must be present in provied file.

        API return a JSON object telling whether uploading is successful or fail.
