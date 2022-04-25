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
    /*Script Name:  EmployeeAssignmentVerify
   Customer:      Florida Department of Health, Early Steps
   Purpose:       The purpose of this process is to verify if the form record is unique.
   Parameters:    Agency ID - (String, Required) Used in the query to verify if the record is unique or unique matched.
                  Email - (String, Required) Used in the query to verify if the record is unique or unique matched.
                  End Date - (String, Required) Used in the query to verify if the record is unique or unique matched.
                  Record ID - (String, Required) Used in the query to verify if the record is unique or unique matched and LibUserUpdate.
                  Start Date - (String, Required) Used in the query to verify if the record is unique or unique matched.
                  Status - (String, Required) Used in the query to verify if the record is unique or unique matched.
              
   Return Array:  1. Status: 'Success', 'Error'
                  2. Message
                  3. Status of the verify call
                  
   Pseudo code:   1. Call VerifyUniqueRecord to determine whether the template record is unique per the passed in information.
                  2. Send response with return array.
 
   Date of Dev:   4/7/2020
   Last Rev Date: 4/7/2020
   Revision Notes:
   4/7/2020  - Rocky Borg: Script created
   */

    logger.info("Start of the process EmployeeAssignmentVerify at " + Date());

    /**********************
   Configurable Variables
  ***********************/
    //Template ID for Employee Assignment
    let TemplateID = "Milestone 10 Form";

    // Error message guidances
    let missingFieldGuidance = "Please provide a value for the missing field and try again, or contact a system administrator if this problem continues.";

    // Response array populated in try or catch block, used in response sent in finally block.
    let outputCollection = [];
    // Array for capturing error messages that may occur within helper functions.
    let errorLog = [];
    let shortDescription = "";

    /****************
     Helper Functions
    *****************/
    // Check if field object has a value property and that value is truthy before returning value.
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

    try {
        /*********************
     Form Record Variables
    **********************/
        //Create variables for the values on the form record
        const formID = getFieldValueByName("Form ID");
        const firstName = getFieldValueByName("First Name");
        const lastName = getFieldValueByName("Last Name");
        const email = getFieldValueByName("Email");

        // Specific fields are detailed in the errorLog sent in the response to the client.
        if (errorLog.length > 0) {
            throw new Error(errorLog.join("; "));
        }

        shortDescription = `Get form ${formID}`;

        /****************
     BEGIN ASYNC CODE
    *****************/
        // STEP 1 - Call VerifyUniqueRecord to determine whether the template record is unique per the passed in information.
        // Query formatted variables

        const uniqueRecordArr = [
            {
                name: "templateId",
                value: TemplateID,
            },
            {
                name: "query",
                value: `[First Name] eq '${firstName}' AND [Last Name] eq '${lastName}' AND [Email] eq '${email}'`,
            },
            {
                name: "formId",
                value: formID,
            },
        ];

        const verifyUniqueResp = await vvClient.scripts
            .runWebService("VerifyUniqueLib", uniqueRecordArr)
            .then((res) => parseRes(res))
            .then((res) => checkMetaAndStatus(res, shortDescription))
            .then((res) => checkDataPropertyExists(res, shortDescription))
            .then((res) => checkDataIsNotEmpty(res, shortDescription));

        //Commented Call 2nd WS for debug mode

        /* const clientLibrary = require("../VVRestApi");
        const scriptToExecute = require("../files/VerifyUniqueLib.js");
        const ffcol = new clientLibrary.forms.formFieldCollection(uniqueRecordArr);
        const verifyUniqueResp = await scriptToExecute
            .main(ffcol, vvClient, response)
            .then((res) => checkMetaAndStatus(res, shortDescription))
            .then((res) => checkDataPropertyExists(res, shortDescription))
            .then((res) => checkDataIsNotEmpty(res, shortDescription)); */

        if (verifyUniqueResp.data.status === "Error") {
            throw new Error(`The call to VerifyUniqueLib returned with an error. ${verifyUniqueResp.data.statusMessage}.`);
        }
        if (verifyUniqueResp.data.status === "Not Unique") {
            throw new Error(
                "This Record is a duplicate of another Record. Another Employee Assignment record already exists with the same First Name, Last Name, Email and Role."
            );
        }
        if (verifyUniqueResp.data.status !== "Unique" && verifyUniqueResp.data.status !== "Unique Matched") {
            throw new Error(`The call to LibFormVerifyUniqueRecord returned with an unhandled error.`);
        }

        // STEP 2 - Send response with return array.
        outputCollection[0] = "Success";
        outputCollection[1] = "Message";
        outputCollection[2] = verifyUniqueResp.data.status;
    } catch (error) {
        // Log errors captured.
        logger.info(JSON.stringify(`${error} ${errorLog}`));
        outputCollection[0] = "Error";
        outputCollection[1] = `${errorLog.join(" ")} ${error.message}`;
    } finally {
        response.json(200, outputCollection);
    }
};
