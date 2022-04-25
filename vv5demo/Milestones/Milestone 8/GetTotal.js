const arrayOfItems = [
    { "Cell Item": "Cell Item1", "Cell Item Value": 20 },
    { "Cell Item": "Cell Item2", "Cell Item Value": 50 },
    { "Cell Item": "Cell Item3", "Cell Item Value": 100 },
    { "Cell Item": "Cell Item4", "Cell Item Value": 200 },
];

function forLoop() {
    let total = 0;
    for (let i = 0; i < arrayOfItems.length; i++) {
        total = total + parseInt(VV.Form.GetFieldValue(arrayOfItems[i]["Cell Item"])) * arrayOfItems[i]["Cell Item Value"];
    }
    return total;
}
VV.Form.SetFieldValue("Cell Total", forLoop(), true);

var validated = VV.Form.Template.FormValidation();

if (validated == true) {
    VV.Form.DoAjaxFormSave().then(function () {
        var a = VV.Form.Template.CallToWSTest();
        console.log(a);
    });
} else {
    return false;
}
