console.log("Start");

function aFunction(param1, param2, callback) {
    setTimeout(() => {
        console.log("Data found!");
        const varForParam3 = param1 + " " + param2;
        callback(varForParam3);
    }, 2000);
}

const aVar = aFunction("data 1", "data 2", (param3) => {
    console.log(param3);
});

console.log("Finish");
