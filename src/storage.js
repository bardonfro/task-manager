let arrItems = [{name:"Test",id:"1",isActionable:true}];
let projects = [];
let tasks = [];

class Project {
    constructor (name) {
        this.name = name;
        this.id = "p" + new Date().valueOf();
    }
}

class Task {
    constructor(name) {
        this.name = name;
        this.id = "t" + new Date().valueOf();
    }
}

const getNextActions = function () {
    let nextActions = [];
    arrItems.forEach(function(item) {
        if (item.isActionable === true) {
            nextActions.push(item.id);
        }
    });
    return nextActions;
}

const init = function() {
    arrItems = JSON.parse(localStorage.database);
}

const _lookupItem = function(id) {
    return arrItems.find(item => item.id === id);
}

const lookupKey = function (strID,property) {
    const obj = _lookupItem(strID);
    return obj[property];
}

const modify = function(strID,property,value) {
    const obj = _lookupItem(strID);
    obj[property] = value;
}

const newProject = function(name) {
    const project = new Project(name);
    arrItems.push(project);
    storeLocal();
    return project;
}

const newTask = function(name) {
    const task = new Task(name);
    arrItems.push(task);
    storeLocal();
    return task;
}

const remove = function (strID) {
    const obj = _lookupItem(strID);
    if (!(obj)) {return;};
    const index = arrItems.indexOf(obj);
    arrItems.splice(index,1);
    storeLocal();
}

const show = function () {
    console.table(arrItems);
}

const storeLocal = function() {
    localStorage.database = JSON.stringify(arrItems);
}

export {getNextActions,
        init,
        lookupKey,
        modify,
        newProject,
        newTask,
        remove,
        show,
        _lookupItem as returnItem, //For development testing purposes
    };