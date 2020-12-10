# Auto Fi Coding Challenge

This application provides following functionalities

## Get "/"

    Get call to root "/" provides a html page. This html page has GUI which can be used for uploading vehicle data "CSV" file.

## Post "/upload"

    POST request to "/upload" accept two parameters

    - **companyName**  Name of company or data provider
    - **uploadFile**  An object containing uploaded file data

      This call converts the CSV data in JSON format. Then this JSON format is given to database module along with "comapnyName".
      Database module store data in SQLite database file.
      Database module open database of company name ( i.e. if given name is "autofi", then it will create database of name "autofi.db").
      If database do not exist the it will create a new database of this name and creat a table of "vehicles". The format of table is as follows

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

      In given file user can have less of more columna but uui is primary key of table so it must be present in input data.

      API return a JSON object telling uploading is successful or fail.
