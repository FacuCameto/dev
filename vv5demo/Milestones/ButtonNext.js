var ddValue = VV.Form.GetFieldValue('Option selector 1');
var ddValue2 = VV.Form.GetFieldValue('Option selector 2');
var ddValue3 = VV.Form.GetFieldValue('Option selector 3');
var validatedDd = VV.Form.Global.CentralValidation(ddValue, "DDSelect");
var validatedDd2 = VV.Form.Global.CentralValidation(ddValue2, "DDSelect");
var validatedDd3 = VV.Form.Global.CentralValidation(ddValue3, "DDSelect");

if (validatedDd == true && validatedDd2 == true && validatedDd3 == true) {
        VV.Form.SetFieldValue('WizardSteps', '1');
        return true;
    } else {
        VV.Form.Global.DisplayMessaging("Please complete all the fields", "Error");
        return false;
    }