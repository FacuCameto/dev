var Q = require("q");

console.log("Start");

function aFunction(param1, param2) {
    var deferred = Q.defer();
    setTimeout(() => {
        console.log("Data found!");
        const varForParam3 = param1 + " " + param2;
        deferred.resolve(varForParam3);
    }, 2000);
    return deferred.promise;
}

const aVar = aFunction("data 1", "data 2").then(function (prom) {
    console.log(prom);
});

console.log("Finish");
