console.log("Start");

function aFunction(param1, param2) {
    return new Promise((res, reject) => {
        setTimeout(() => {
            console.log("Data found!");
            const varForParam3 = param1 + " " + param2;
            res(varForParam3);
        }, 2000);
    });
}

async function showDataFunc() {
    try {
        const aVar = await aFunction("data 1", "data 2");
        console.log(aVar);
    } catch (error) {
        console.log(error);
    }
}

showDataFunc();

console.log("Finish");
