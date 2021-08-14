let memory = [];

const init = function() {
    memory = JSON.parse(localStorage.database);
}

const isDuplicateID = function(submission) {
    
    let result;
    memory.forEach(function(storedItem){
        if (storedItem.id === submission.id) {
            result = true;
        }
    })
    return result;
}

const lookup = function (strID,property) {
    const obj = retrieve(strID);
    return obj[property];
}

const store = function (obj) {
    if (isDuplicateID(obj)){
        console.log("ERROR: Cannot store the following. Duplicate ID");
        console.log(obj);
        return;
    };
    memory.push(obj);
    storeLocal();
}

const remove = function (strID) {
    const obj = retrieve(strID);
    if (!(obj)) {return;};
    const index = memory.indexOf(obj);
    memory.splice(index,1);
    storeLocal();
}

const retrieve = function (strID) {
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

const show = function () {
    console.table(memory);
}

const storeLocal = function() {
    localStorage.database = JSON.stringify(memory);
}

export {init, lookup, store, remove, retrieve, show};