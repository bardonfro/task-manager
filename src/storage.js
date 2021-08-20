let memory = [];
let projects = [];
let tasks = [];

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
    memory = JSON.parse(localStorage.database);
    projects = JSON.parse(localStorage.projects);
    tasks = JSON.parse(localStorage.tasks);
}

const lookupKey = function (strID,property) {
    const obj = retrieve(strID);
    return obj[property];
}

const modify = function(strID,property,value) {
    const obj = retrieve(strID);
    obj[property] = value;
}

const newProject = function(jsonString) {
    const obj = JSON.parse(jsonString);
    projects.push(obj);
    storeLocal();
}

const newTask = function(jsonString) {
    const obj = JSON.parse(jsonString);
    tasks.push(obj);
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