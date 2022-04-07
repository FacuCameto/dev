console.log("Start");

function aFunction(param1, param2) {
    var deferred = Q.defer();
    setTimeout(() => {
        console.log("Data found!");
        const varForParam3 = param1 + " " + param2;
        deferred.resolve(varForParam3);
        return deferred.promise;
    }, 2000);
}

const aVar = aFunction("data 1", "data 2");
console.log(aVar);

console.log("Finish");
