let memory = [];

const isDuplicateID = function(submission) {
    let result;
    memory.forEach(function(storedItem){
        if (storedItem.id === submission.id) {
            result = true;
        }
    })
    return result;
}

const store = function (obj) {
    if (isDuplicateID(obj)){
        console.log("ERROR: Cannot store the following. Duplicate ID");
        console.log(obj);
        return;
    };
    memory.push(obj);
    const location = memory.indexOf(obj);
    console.log("Stored in index " + location + ":");
    console.log(obj);
}

const retrieve = function (strID) {
    console.log("Retrieve:");
    console.log(strID);

    let match;
    let i = 0;
    while (!(match) && i < memory.length) {
        if (memory[i].id === strID) {
            match = memory[i];
        }
        i++
    }

   return match;
}

export {store, retrieve};