import * as storage from './storage.js'

let arrItems = [{name:"Test",id:"1",isActionable:true}];

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
        this.isActionable = true;
    }
}

const deleteItem = function(strID) {
    if (prompt("Are you sure you want to delete [this] item?")) {
        storage.remove(strID);
    }

    //Tell display to remove the item from all panes and places
}

const getNextActions = function () {
    return storage.getActionableTasks();
}

const newProject = function(name) {
    const project = new Project(name);
    storage.newItem(project);
    return project;
}

const newTask = function(name) {
    const task = new Task(name);
    storage.newItem(task);
    return task;
}

const setField = function(strID,field,value) {
    storage.modify(strID,field,value);
}

const show = function () {
    console.table(arrItems);
}

export {deleteItem,
        getNextActions,
        newProject,
        newTask,
        setField,
        show,
    };