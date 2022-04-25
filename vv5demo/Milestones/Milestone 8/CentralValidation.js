//pass in ControlName to validate a single item or nothing to validate everything.
var ErrorReporting = true;

var RunAll = false;
if (ControlName == null) {
    RunAll = true;
}

//Choose code blocks from ValidationExamples.js to insert here
//Cell (number) field must have a number entered.
if (ControlName == "Cell Item1" || RunAll) {
    if (VV.Form.Global.CentralValidation(VV.Form.GetFieldValue("Cell Item1"), "NumberOnly") == false) {
        VV.Form.SetValidationErrorMessageOnField("Cell Item1", "A number needs to be entered.");
        ErrorReporting = false;
    } else {
        VV.Form.ClearValidationErrorOnField("Cell Item1");
    }
}
if (ControlName == "Cell Item2" || RunAll) {
    if (VV.Form.Global.CentralValidation(VV.Form.GetFieldValue("Cell Item2"), "NumberOnly") == false) {
        VV.Form.SetValidationErrorMessageOnField("Cell Item2", "A number needs to be entered.");
        ErrorReporting = false;
    } else {
        VV.Form.ClearValidationErrorOnField("Cell Item2");
    }
}
if (ControlName == "Cell Item3" || RunAll) {
    if (VV.Form.Global.CentralValidation(VV.Form.GetFieldValue("Cell Item3"), "NumberOnly") == false) {
        VV.Form.SetValidationErrorMessageOnField("Cell Item3", "A number needs to be entered.");
        ErrorReporting = false;
    } else {
        VV.Form.ClearValidationErrorOnField("Cell Item3");
    }
}
if (ControlName == "Cell Item4" || RunAll) {
    if (VV.Form.Global.CentralValidation(VV.Form.GetFieldValue("Cell Item4"), "NumberOnly") == false) {
        VV.Form.SetValidationErrorMessageOnField("Cell Item4", "A number needs to be entered.");
        ErrorReporting = false;
    } else {
        VV.Form.ClearValidationErrorOnField("Cell Item4");
    }
}
if (ControlName == "Cell Total" || RunAll) {
    if (VV.Form.Global.CentralValidation(VV.Form.GetFieldValue("Cell Total"), "NumberOnly") == false) {
        VV.Form.SetValidationErrorMessageOnField("Cell Total", "A number needs to be entered.");
        ErrorReporting = false;
    } else {
        VV.Form.ClearValidationErrorOnField("Cell Total");
    }
}

return ErrorReporting;
