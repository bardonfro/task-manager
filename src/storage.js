let memory = [];

const store = function (obj) {
    memory.push(obj);
    const location = memory.indexOf(obj);
    console.log("Stored in index " + location);
    console.log(obj);
}

const retrieve = function (obj) {
    console.log("Retrieve:");
    console.log(obj);
}

export {store, retrieve};