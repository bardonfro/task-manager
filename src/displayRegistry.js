
const list = {};

const test = function (strID) {
    if(list[strID]) {
        console.log(strID + " value is: " + list[strID]);
    } else {
        console.log(strID + " not found.");
    }
};

const add = function(strID,element) {
    if (!_isRegistered(strID)) {
        list[strID] = [];
    };

    list[strID].push(element);
};

const log = function() {
    console.table(list);
};

const _isRegistered = function(strID) {
    if(list[strID]) {
        return true;
    } 
    return false;
};

const remove = function(strID,element) {
    let arr = read(strID);
    if (Array.isArray(arr) &&
        arr.length > 0 &&
        arr.includes(element)) {
            arr = arr.splice(arr.indexOf(element,1));
    }
    list[strID] = arr;
}

const read = function(strID) {
    if(!_isRegistered(strID)) {
        return;
    }

    return list[strID];
}


export {add,log,read,remove,test};

