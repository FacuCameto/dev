/*
1. Choose code blocks from ValidationExamples.js to insert
2. In the Script Editor of a VisualVault Template, click "New Template Script"
3. In the first text box after VV.Form.Template., type in "FormValidation"
4. In the next text box, to the right of "FormValidation," type in "ControlName"
5. In the large text box under FormValidatoin and ControlName, paste this entire script.
6. Save!
7. Under Event Handlers, find the form field that you want to validate. The name of this field should appear somewhere in this script. (e.g. 'Customer Name')
8. Select the blur event.
9. Place your cursor in the large text box under 'function'
10. In the "Template" tab at the top right of the Script Editor, select VV.Form.Template.FormValidation. Click "Add Function"
11. Put a semi-colon at the end of the function.
12. Replace ControlName with 'FieldName' (ex: 'Customer Name') Include the apostrophes.
13. Save!

*/

//pass in ControlName to validate a single item or nothing to validate everything.
var ErrorReporting = true;

var RunAll = false;
if (ControlName == null) {
    RunAll = true;
}

//Choose code blocks from ValidationExamples.js to insert here
//Drop-down must be selected
if (ControlName == 'Option selector 1' || RunAll) {
    if (VV.Form.Global.CentralValidation(VV.Form.GetFieldValue('Option selector 1'), 'DDSelect') == false) {
        VV.Form.SetValidationErrorMessageOnField('Option selector 1', 'A value needs to be selected.');
        ErrorReporting = false;
    }
    else {
        VV.Form.ClearValidationErrorOnField('Option selector 1');
    }
}
if (ControlName == 'Option selector 2' || RunAll) {
    if (VV.Form.Global.CentralValidation(VV.Form.GetFieldValue('Option selector 2'), 'DDSelect') == false) {
        VV.Form.SetValidationErrorMessageOnField('Option selector 2', 'A value needs to be selected.');
        ErrorReporting = false;
    }
    else {
        VV.Form.ClearValidationErrorOnField('Option selector 2');
    }
}
if (ControlName == 'Option selector 3' || RunAll) {
    if (VV.Form.Global.CentralValidation(VV.Form.GetFieldValue('Option selector 3'), 'DDSelect') == false) {
        VV.Form.SetValidationErrorMessageOnField('Option selector 3', 'A value needs to be selected.');
        ErrorReporting = false;
    }
    else {
        VV.Form.ClearValidationErrorOnField('Option selector 3');
    }
}
if (ControlName == 'Option selector 4' || RunAll) {
    if (VV.Form.Global.CentralValidation(VV.Form.GetFieldValue('Option selector 4'), 'DDSelect') == false) {
        VV.Form.SetValidationErrorMessageOnField('Option selector 4', 'A value needs to be selected.');
        ErrorReporting = false;
    }
    else {
        VV.Form.ClearValidationErrorOnField('Option selector 4');
    }
}
if (ControlName == 'Option selector 5' || RunAll) {
    if (VV.Form.Global.CentralValidation(VV.Form.GetFieldValue('Option selector 5'), 'DDSelect') == false) {
        VV.Form.SetValidationErrorMessageOnField('Option selector 5', 'A value needs to be selected.');
        ErrorReporting = false;
    }
    else {
        VV.Form.ClearValidationErrorOnField('Option selector 5');
    }
}
if (ControlName == 'Option selector 6' || RunAll) {
    if (VV.Form.Global.CentralValidation(VV.Form.GetFieldValue('Option selector 6'), 'DDSelect') == false) {
        VV.Form.SetValidationErrorMessageOnField('Option selector 6', 'A value needs to be selected.');
        ErrorReporting = false;
    }
    else {
        VV.Form.ClearValidationErrorOnField('Option selector 6');
    }
}
if (ControlName == 'TextField recomendations' || RunAll) {
    if (VV.Form.Global.CentralValidation(VV.Form.GetFieldValue('TextField recomendations'), 'Blank') == false) {
        VV.Form.SetValidationErrorMessageOnField('TextField recomendations', 'A value needs to be entered.');
        ErrorReporting = false;
    }
    else {
        VV.Form.ClearValidationErrorOnField('TextField recomendations');
    }
}
if (ControlName == 'Phone number' || RunAll) {
    if (VV.Form.Global.CentralValidation(VV.Form.GetFieldValue('Phone number'), 'Phone') == false) {
        VV.Form.SetValidationErrorMessageOnField('Phone number', 'A phone number must be entered in the format of (XXX) XXX-XXXX.');
        ErrorReporting = false;
    }
    else {
        VV.Form.ClearValidationErrorOnField('Phone number');
    }
}
if (ControlName == 'Email' || RunAll) {
    if (VV.Form.Global.CentralValidation(VV.Form.GetFieldValue('Email'), 'Email') == false) {
        VV.Form.SetValidationErrorMessageOnField('Email', 'Please enter the Email in the form of a valid Email Address.');
        ErrorReporting = false;
    }
    else {
        VV.Form.ClearValidationErrorOnField('Email');
    }
}

return ErrorReporting;