function DropDownValidator(dropDownField, unwantedValue) {
    var ddfValue = VV.Form.GetFieldValue(dropDownField);
    if (ddfValue == unwantedValue) {
        return false;
    } else {
        return true;
    }
}