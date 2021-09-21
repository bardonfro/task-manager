import * as storage from './storage.js'
import * as index from './index.js'

const currentVersion = "0.5.0.555";

class Project {
    constructor (name) {
        this.name = name;
        this.id = new Date().valueOf() + Math.random();
        this.type = "project";
        this.domain = undefined;
        this.date = undefined;
        this.tasks = [];
        this.isComplete = false;
    }
}

class Task {
    constructor(name) {
        this.name = name;
        this.id = new Date().valueOf() + Math.random();
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

const _getIncompleteOfProject = function(strID) {
    const arrAllTasks = lookupKey(strID,'tasks');
    const arrIncompleteTasks = [];
    arrAllTasks.forEach(function(taskID) {
        if (!lookupKey(taskID,'isComplete')) {
            arrIncompleteTasks.push(taskID);
        }
    });
    if (arrIncompleteTasks.length === 0) {return;}
    return arrIncompleteTasks;
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

const newProject = function(paramObj) {
    return newTodo({name:paramObj, type:'project'});
    let project;
    if (typeof(paramObj) === 'string') {
        project = new Project(paramObj);
    } else if (typeof(paramObj === 'object') &&
                paramObj.name) {
        project = new Project(paramObj.name);
        Object.keys(paramObj).forEach(function(key) {
            project[key] = paramObj[key];
        })
    } else {
        return;
    }

    storage.newItem(project);
    return project;
}

const newTask = function(paramObj) {
    return newTodo({name:paramObj, type:'task'});
    /*
    let task;
    if (typeof(paramObj) === 'string') {
        task = new Task(paramObj);
    } else if (typeof(paramObj === 'object') &&
                paramObj.name) {
        task = new Task(paramObj.name);
        Object.keys(paramObj).forEach(function(key) {
            task[key] = paramObj[key];
        })
    } else {
        return;
    }
    */

    storage.newItem(task);
    return task;
}

const newTodo = function (paramObj) {
    if (!paramObj.name ||
        !typeof(paramObj.name) === 'string') {
            return;
        }
    const todo = {
        id: new Date().valueOf() + Math.random(),
        domain: undefined,
        date: undefined,
        isActionable: true,
        isComplete: false,
        tasks: [],
    }

    Object.keys(paramObj).forEach(function(key) {
        todo[key] = paramObj[key];
    });

    storage.newItem(todo);
    return todo;
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

        if (item.type === 'project') {
            const arrIncompleteTasks = _getIncompleteOfProject(strID);
            const promptMessage = 'This project has incomplete tasks. Would you like to mark them all complete and close the project?'
            if (arrIncompleteTasks) {
                if (!confirm(promptMessage)) {return;}
                arrIncompleteTasks.forEach(function(taskID) {
                    storage.setField(taskID,'isComplete',true);
                });
            }
        }
    }

    setField(strID,"isComplete",value);
    index.refreshAllPanes();

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
        newTodo,
        retrieveItem,
        setField,
        toggleIsComplete,
    }