class Project {
    constructor (name) {
        this.name = name;
        this.id = (new Date()).valueOf();
    }
}

class Task {
    constructor(name) {
        this.name = name;
        this.id = new Date().valueOf();
    }
}

const newProject = function(name) {
    return new Project(name);
}

const newTask = function(name) {
    return new Task(name);
}

export {
    newProject,
    newTask,
}