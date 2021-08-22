let arrItems = [{name:"Test",id:"1"}];
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

const getByID = function(strID) {
    const obj = retrieve(strID);
    return JSON.stringify(obj);
}

const getNextActions = function () {
    let nextActions = [];
    tasks.forEach(function(task) {
        if (task.isActionable === true) {
            nextActions.push(task);
        }
    });
    return JSON.stringify(nextActions);
}

const init = function() {
    arrItems = JSON.parse(localStorage.database);
    projects = JSON.parse(localStorage.projects);
    tasks = JSON.parse(localStorage.tasks);
}

const _lookupItem = function(id) {
    return arrItems.find(item => item.id === id);
}

const lookupKey = function (strID,property) {
    const obj = retrieve(strID);
    return obj[property];
}

const modify = function(strID,property,value) {
    const obj = retrieve(strID);
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
    const obj = retrieve(strID);
    if (!(obj)) {return;};
    const index = arrItems.indexOf(obj);
    arrItems.splice(index,1);
    storeLocal();
}

const retrieve = function (strID) {
    let match;
    let i = 0;
    while (!(match) && i < arrItems.length) {
        if (arrItems[i].id === strID) {
            match = arrItems[i];
        }    
        i++
    }    
    
    return match; 
}   

const show = function () {
    console.table(arrItems);
}

const storeLocal = function() {
    localStorage.database = JSON.stringify(arrItems);
    localStorage.projects = JSON.stringify(projects);
    localStorage.tasks = JSON.stringify(tasks);
}

const showProjects = function () {
    console.table(projects);
}

const showTasks = function () {
    console.table(tasks);
}

export {getByID,
        getNextActions,
        init,
        lookupKey,
        modify,
        newProject,
        newTask,
        remove,
        show,
        showProjects,
        showTasks,
    };