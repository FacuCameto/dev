const logger = require("../log");

module.exports.getCredentials = function () {
    var options = {};
    options.customerAlias = "FacundoCameto";
    options.databaseAlias = "Main";
    options.userId = "FacundoCameto.api";
    options.password = "p";
    options.clientId = "ccf9502d-c505-47b4-85df-7061903aa6b2";
    options.clientSecret = "NI9okI291hu8atC9EYq0V1wF8ofUlVJdLbeaehDVuPE=";
    return options;
};

module.exports.main = async function (ffCollection, vvClient, response) {
    /*
    Script Name:    WebService name 
    Customer:       Project Name
    Purpose:        Brief description of the purpose of the script
    Parameters:     The following represent variables passed into the function:
                    parameter1: Description of parameter1
                    parameter2: Description of parameter2
    Return Object:
                    outputCollection[0]: Status
                    outputCollection[1]: Short description message
                    outputCollection[2]: Data
    Pseudo code: 
              1° Does this
              2° Does that
              ...
 
    Date of Dev:   10/19/2021
    Last Rev Date: 
 
    Revision Notes:
     07/30/2021 - DEVELOPER NAME HERE:  First Setup of the script
    */

    logger.info("Start of the process SCRIPT NAME HERE at " + Date());

    /**************************************
     Response and error handling variables
    ***************************************/

    // Response array to be returned
    let outputCollection = [];
    // Array for capturing error messages that may occur during the process
    let errorLog = [];

    /***********************
     Configurable Variables
    ************************/

    const wSTemplateName = "Milestone 8 Form";
    const postWSTemplateName = "Milestone 8 Post Form";

    /*****************
     Script Variables
    ******************/

    // Describes the process being checked using the parsing and checking helper functions
    let shortDescription = "";

    /*****************
     Helper Functions
    ******************/

    function getFieldValueByName(fieldName, isRequired = true) {
        /*
        Check if a field was passed in the request and get its value
        Parameters:
            fieldName: The name of the field to be checked
            isRequired: If the field is required or not
        */

        let resp = null;

        try {
            // Tries to get the field from the passed in arguments
            const field = ffCollection.getFormFieldByName(fieldName);

            if (!field && isRequired) {
                throw new Error(`The field '${fieldName}' was not found.`);
            } else if (field) {
                // If the field was found, get its value
                let fieldValue = field.value ? field.value : null;

                if (typeof fieldValue === "string") {
                    // Remove any leading or trailing spaces
                    fieldValue.trim();
                }

                if (fieldValue) {
                    // Sets the field value to the response
                    resp = fieldValue;
                } else if (isRequired) {
                    // If the field is required and has no value, throw an error
                    throw new Error(`The value property for the field '${fieldName}' was not found or is empty.`);
                }
            }
        } catch (error) {
            // If an error was thrown, add it to the error log
            errorLog.push(error);
        }
        return resp;
    }

    function parseRes(vvClientRes) {
        /*
        Generic JSON parsing function
        Parameters:
            vvClientRes: JSON response from a vvClient API method
        */
        try {
            // Parses the response in case it's a JSON string
            const jsObject = JSON.parse(vvClientRes);
            // Handle non-exception-throwing cases:
            if (jsObject && typeof jsObject === "object") {
                vvClientRes = jsObject;
            }
        } catch (e) {
            // If an error occurs, it's because the resp is already a JS object and doesn't need to be parsed
        }
        return vvClientRes;
    }

    function checkMetaAndStatus(vvClientRes, shortDescription, ignoreStatusCode = 999) {
        /*
        Checks that the meta property of a vvClient API response object has the expected status code
        Parameters:
            vvClientRes: Parsed response object from a vvClient API method
            shortDescription: A string with a short description of the process
            ignoreStatusCode: An integer status code for which no error should be thrown. If you're using checkData(), make sure to pass the same param as well.
        */

        if (!vvClientRes.meta) {
            throw new Error(`${shortDescription} error. No meta object found in response. Check method call parameters and credentials.`);
        }

        const status = vvClientRes.meta.status;

        // If the status is not the expected one, throw an error
        if (status != 200 && status != 201 && status != ignoreStatusCode) {
            const errorReason = vvClientRes.meta.errors && vvClientRes.meta.errors[0] ? vvClientRes.meta.errors[0].reason : "unspecified";
            throw new Error(`${shortDescription} error. Status: ${vvClientRes.meta.status}. Reason: ${errorReason}`);
        }
        return vvClientRes;
    }

    function checkDataPropertyExists(vvClientRes, shortDescription, ignoreStatusCode = 999) {
        /*
        Checks that the data property of a vvClient API response object exists 
        Parameters:
            res: Parsed response object from the API call
            shortDescription: A string with a short description of the process
            ignoreStatusCode: An integer status code for which no error should be thrown. If you're using checkMeta(), make sure to pass the same param as well.
        */
        const status = vvClientRes.meta.status;

        if (status != ignoreStatusCode) {
            // If the data property doesn't exist, throw an error
            if (!vvClientRes.data) {
                throw new Error(`${shortDescription} data property was not present. Please, check parameters and syntax. Status: ${status}.`);
            }
        }

        return vvClientRes;
    }

    function checkDataIsNotEmpty(vvClientRes, shortDescription, ignoreStatusCode = 999) {
        /*
        Checks that the data property of a vvClient API response object is not empty
        Parameters:
            res: Parsed response object from the API call
            shortDescription: A string with a short description of the process
            ignoreStatusCode: An integer status code for which no error should be thrown. If you're using checkMeta(), make sure to pass the same param as well.
        */
        const status = vvClientRes.meta.status;

        if (status != ignoreStatusCode) {
            const dataIsArray = Array.isArray(vvClientRes.data);
            const dataIsObject = typeof vvClientRes.data === "object";
            const isEmptyArray = dataIsArray && vvClientRes.data.length == 0;
            const isEmptyObject = dataIsObject && Object.keys(vvClientRes.data).length == 0;

            // If the data is empty, throw an error
            if (isEmptyArray || isEmptyObject) {
                throw new Error(`${shortDescription} returned no data. Please, check parameters and syntax. Status: ${status}.`);
            }
            // If it is a Web Service response, check that the first value is not an Error status
            if (dataIsArray) {
                const firstValue = vvClientRes.data[0];

                if (firstValue == "Error") {
                    throw new Error(`${shortDescription} returned an error. Please, check called Web Service. Status: ${status}.`);
                }
            }
        }
        return vvClientRes;
    }

    /**********
     MAIN CODE 
    **********/

    try {
        // 1.GET THE VALUES OF THE FIELDS

        const formID = getFieldValueByName("Form ID");
        const formID2 = getFieldValueByName("CartResult");
        const item1 = getFieldValueByName("Item1");
        const item2 = getFieldValueByName("Item2");
        const item3 = getFieldValueByName("Item3");
        const item4 = getFieldValueByName("Item4");
        const total = getFieldValueByName("Total");

        /* const items = [
            getFieldValueByName("Cell Item1"),
            getFieldValueByName("Cell Item2"),
            getFieldValueByName("Cell Item3"),
            getFieldValueByName("Cell Item4"),
        // ]; */
        //const firstName = getFieldValueByName("First Name");

        // 2.CHECKS IF THE REQUIRED PARAMETERS ARE PRESENT

        if (!formID) {
            // It could be more than one error, so we need to send all of them in one response
            throw new Error(errorLog.join("; "));
        }

        // 3.YOUR CODE GOES HERE
        shortDescription = `Get form ${formID}`;
        //var itemsString = [];
        /* for (let i = 0; i < items.length; i++) {
            var string = "Item " + (i + 1) + ", quantity: " + items[i] + "\n";
            itemsString.push(string);
        } */
        //console.log(itemsString);

        const getFormsParams2 = {
            q: `[Form ID] eq '${formID2}'`,
            expand: true, // true to get all the form's fields
            // fields: 'id,name', // to get only the fields 'id' and 'name'
        };

        const getFormsRes2 = await vvClient.forms
            .getForms(getFormsParams2, postWSTemplateName)
            .then((res) => parseRes(res))
            .then((res) => checkMetaAndStatus(res, shortDescription))
            .then((res) => checkDataPropertyExists(res, shortDescription))
            .then((res) => checkDataIsNotEmpty(res, shortDescription));
        //  If you want to throw an error and stop the process if no data is returned, uncomment the line above

        shortDescription = `Post form ${postWSTemplateName}`;
        var textFieldText =
            "Item 1 quantity: " +
            item1 +
            "\n" +
            "Item 2 quantity: " +
            item2 +
            "\n" +
            "Item 3 quantity: " +
            item3 +
            "\n" +
            "Item 4 quantity: " +
            item4 +
            "\n" +
            "Total: " +
            total;
        const modifyDate = new Date();

        const formGUID = getFormsRes2.data[0]["revisionId"];
        shortDescription = `Update form ${formGUID}`;
        const formFieldsToUpdate = {
            Main: textFieldText,
            "Edit Date": modifyDate.toLocaleDateString("en-US"),
        };

        await vvClient.forms
            .postFormRevision(null, formFieldsToUpdate, postWSTemplateName, formGUID)
            .then((res) => parseRes(res))
            .then((res) => checkMetaAndStatus(res, shortDescription))
            .then((res) => checkDataPropertyExists(res, shortDescription))
            .then((res) => checkDataIsNotEmpty(res, shortDescription));

        // 4.BUILD THE SUCCESS RESPONSE ARRAY

        outputCollection[0] = "Success";
        outputCollection[1] = "Success short description here";

        // Remember to add the helper functions parseRes, checkMetaAndStatus, checkDataPropertyExists and checkDataIsNotEmpty
    } catch (error) {
        logger.info("Error encountered" + error);

        // BUILDS THE ERROR RESPONSE ARRAY

        outputCollection[0] = "Error";

        if (errorLog.length > 0) {
            outputCollection[1] = "Errors encountered";
            outputCollection[2] = `Error/s: ${errorLog.join("; ")}`;
        } else {
            outputCollection[1] = error.message ? error.message : `Unhandled error occurred: ${error}`;
        }
    } finally {
        // SENDS THE RESPONSE

        response.json(200, outputCollection);
    }
};
