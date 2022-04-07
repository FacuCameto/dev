console.log("Start");

function aFunction(param1, param2) {
    setTimeout(() => {
        console.log("Data found!");
        const varForParam3 = param1 + " " + param2;
        return varForParam3;
    }, 2000);
}

const aVar = aFunction("data 1", "data 2");
console.log(aVar);

console.log("Finish");
