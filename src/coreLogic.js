let items = [{name:"Test",id:"1"}];
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

const _lookupItem = function(id) {
    return items.find(item => item.id === id);
}

const lookupKey = function (strID,property) {
    const obj = _lookupItem(strID);
    return obj[property];
}


const newProject = function(name) {
    const project = new Project(name);
    items.push(project);
    return project;
}

const newTask = function(name) {
    const task = new Task(name);
    items.push(task);
    return task;
}

const returnItem = function(id) {
    // I would like to not return the actual item (for closure)
    return _lookupItem(id);
}


const log = function() {
    console.table(items);

}

export {
    lookupKey,
    newProject,
    newTask,
    log,
}