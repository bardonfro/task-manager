import * as storage from './storage.js'
import * as index from './index.js'

const currentVersion = "0.5.0.555";

class Project {
    constructor (name) {
        this.name = name;
        this.id = "p" + new Date().valueOf() + Math.random();
        this.type = "project";
        this.domain = undefined;
        this.date = undefined;
        this.tasks = [];
    }
}

class Task {
    constructor(name) {
        this.name = name;
        this.id = "t" + new Date().valueOf() + Math.random();
        this.type = "task";
        this.project = undefined;
        this.domain = undefined;
        this.date = undefined;
        this.isActionable = true;
        this.isComplete = false;
    }
}

const assignProject = function(taskID,projectID) {
    unassignProject(taskID);
    if (!projectID) {return;}
    setField(taskID,'project',projectID);
    setField(projectID,'tasks',taskID,true);
}

const unassignProject = function (taskID) {
    const projectID = storage.lookupKey(taskID,'project');
    if (!projectID) {return;}
    const projectTasks = storage.lookupKey(projectID,'tasks');
    const index = projectTasks.indexOf(taskID);
    if (index >= 0) {
        projectTasks.splice(index,1);
    }

    setField(projectID,'tasks',projectTasks);
    setField(taskID,'project',undefined);


}

const deleteItem = function(strID) {
    if (prompt("Are you sure you want to delete [this] item?")) {
        storage.remove(strID);
    }

    //Tell display to remove the item from all panes and places
}

const getCompletedTasks = function(num = 50) {
    return storage.getCompletedTasks(num);
}

const getActionableTasks = function (num = 250) {
    return storage.getActionableTasks(num);
}

const getProjects = function(num = 150) {
    return storage.getProjects(num);
}

const logDatabase = function() {
    storage.logDatabase();
}

const lookupKey = function(strID,key) {
    return storage.lookupKey(strID,key)
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

const retrieveItem = function (strID) {
    return storage.retrieveItem(strID);
}

const setField = function(strID,field,value,isAppend) {
    storage.setField(strID,field,value,isAppend);
    index.modify(strID,field,value,isAppend);
}

const toggleIsComplete = function(strID) {
    const item = retrieveItem(strID);
    let value;
    if (item.isComplete) {
        value = false
    } else {
        value = true;
    }

    setField(strID,"isComplete",value);

}

export {assignProject,
            unassignProject,
        deleteItem,
        getCompletedTasks,
        getActionableTasks,
        getProjects,
        logDatabase,
        lookupKey,
        newProject,
        newTask,
        retrieveItem,
        setField,
        toggleIsComplete,
    };