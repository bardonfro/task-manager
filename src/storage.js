const directory = {
    add: function(strID) {
        const temp = this.get();
        temp.push(strID);
        temp.sort();
        localStorage.directory = JSON.stringify(temp);
    },

    get: function() {
        if (!localStorage.directory) {
            return [];
        } else {
            return JSON.parse(localStorage.directory);
        }
    },

    remove: function (strID) {
        temp = this.get();
        const index = temp.indexOf(strID);
        if (index < 0) {return};
        temp.splice(index,1);
        localStorage.directory = JSON.stringify(temp);
    },
}

const getActionableTasks = function(num) {
    const arrActionables = [];
    directory.get().forEach(function(strID) {
        const item = retrieveItem(strID);
        if (item.type === 'task' &&
            item.isActionable === true &&
            item.isComplete === false) {
            arrActionables.push(item);
        }
    });
    return arrActionables.sort().slice(0,num);
}

const getCompletedTasks = function(num) {
    const arrCompleted = [];
    directory.get().forEach(function(strID) {
        const item = retrieveItem(strID);
        if (item.isComplete === true) {
            arrCompleted.push(item);
        }
    });
    return arrCompleted.sort().reverse().slice(0,num);
}

const getProjects = function(num) {
    const arrProjects = [];
    directory.get().forEach(function(strID) {
        const item = retrieveItem(strID);
        if (item.type === 'project') {
            arrProjects.push(item);
        }
    });
    return arrProjects.sort().slice(0,num);
}

const logDatabase = function() {
    console.table(directory.get());
    const arr = [];
    directory.get().forEach(function(strID) {
        arr.push(retrieveItem(strID));
    })
    console.table(arr);
}

const lookupKey = function (strID,property) {
    const obj = retrieveItem(strID);
    if (!obj) {return};
    return obj[property];
}

const modify = function(a,b,c,d) {
    console.log("storage.modify used. Has been deprecited");
    setField(a,b,c,d);
}

const setField = function(strID,property,value,isAppend) {
    const obj = retrieveItem(strID);
    if (!obj) {return};
    if (!isAppend) {
        obj[property] = value;
    } else if (Array.isArray(obj[property]) && !obj[property].includes(value)) {
        obj[property].push(value);
    }

    _storeItem(obj);
}

const newItem = function(obj) {
    _storeItem(obj);
    directory.add(obj.id);
}

const remove = function (strID) {
    if (localStorage[strID]) {
        localStorage.removeItem(strID);
        directory.remove(strID);
    }
}

const retrieveAll = function() {
    let arrObj = [];
    directory.get().forEach(function(strID) {
        arrObj.push(retrieveItem(strID));
    });
    return arrObj;
}

const retrieveItem = function(strID) {
    if (localStorage[strID]) { 
        return JSON.parse(localStorage[strID]);
    }
}

const _storeItem = function(obj) {
    localStorage[obj.id] = JSON.stringify(obj);
}


export {
        logDatabase,
        lookupKey,
        setField,
        modify,
        newItem,
        remove,
        retrieveAll,
        retrieveItem,
        getActionableTasks,
        getCompletedTasks, 
        getProjects,
    };