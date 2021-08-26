let arrItems = [{name:"Test",id:"1",isActionable:true}];
let sdirectory = [];

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
        if (item.isActionable === true &&
            item.isComplete === false) {
            arrActionables.push(item);
        }
    });
    return arrActionables.sort().reverse().slice(0,num);
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
        if (item.id[0] === "p") {
            arrProjects.push(item);
        }
    });
    return arrProjects.sort().reverse().slice(0,num);
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

const modify = function(strID,property,value,isAppend) {
    const obj = retrieveItem(strID);
    if (!obj) {return};
    console.log(isAppend);
    if (isAppend === true) {
        console.log("True");
        obj[property].push(value);
    } else {
        console.log("not true");
        obj[property] = value;
    }
    storeItem(obj);
}

const newItem = function(obj) {
    storeItem(obj);
    directory.add(obj.id);
}

const remove = function (strID) {
    if (localStorage[strID]) {
        localStorage.removeItem(strID);
        directory.remove(strID);
    }
}

const retrieveItem = function(strID) {
    if (localStorage[strID]) { 
        return JSON.parse(localStorage[strID]);
    }
}

const storeItem = function(obj) {
    localStorage[obj.id] = JSON.stringify(obj);
}

export {
        logDatabase,
        lookupKey,
        modify,
        newItem,
        remove,
        retrieveItem,
        getActionableTasks,
        getCompletedTasks, 
        getProjects,
    };