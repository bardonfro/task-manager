import * as storage from './storage.js'
import * as index from './index.js'

class Project {
    constructor (name) {
        this.name = name;
        this.id = "p" + new Date().valueOf() + Math.random();
    }
}

class Task {
    constructor(name) {
        this.name = name;
        this.id = "t" + new Date().valueOf() + Math.random();
        this.isActionable = true;
        this.isComplete = false;
    }
}

const deleteItem = function(strID) {
    if (prompt("Are you sure you want to delete [this] item?")) {
        storage.remove(strID);
    }

    //Tell display to remove the item from all panes and places
}

const getCompletedTasks = function() {
    return storage.getCompletedTasks();
}

const getActionableTasks = function () {
    return storage.getActionableTasks();
}

const getProjects = function() {
    return storage.getProjects();
}

const logDatabase = function() {
    storage.logDatabase();
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
    index.modify(strID,field,value);
}

const toggleIsComplete = function(strID) {
    const item = storage.retrieveItem(strID);
    let value;
    if (item.isComplete) {
        value = false
    } else {
        value = true;
    }

    setField(strID,"isComplete",value);

}

export {deleteItem,
        getCompletedTasks,
        getActionableTasks,
        getProjects,
        logDatabase,
        newProject,
        newTask,
        setField,
        toggleIsComplete,
    };