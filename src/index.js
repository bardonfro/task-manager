import * as dommy from './dommy.js';
import * as core from './coreLogic.js';
import * as elements from './elements.js';
import footer from './footer.js';
import './style.scss';


const populateNextActions = function() {
    nextActionsPane.clear();
    const arrNextActions = core.getNextActions();
    arrNextActions.forEach(function(task) {
        nextActionsPane.appendCard(elements.taskCard(task));
    })
}

const populateProjects = function() {
    projectsPane.clear();
    const arrProjects = core.getProjects();
    arrProjects.forEach(function(project) {
        projectsPane.appendCard(elements.projectCard(project));
    })
}

// Creating the layout framework

const pageWrapper = dommy.el("div#page-wrapper");
dommy.appendChildren(document.body,pageWrapper);

const header = dommy.el("div#header","Header");
const contentWrapper = dommy.el("div.#content");
const workspaceWrapper = dommy.el("div#workspace");
const paneSelection = dommy.el("div#pane-selector","Pane Selector");

dommy.appendChildren(contentWrapper,workspaceWrapper, paneSelection)
dommy.appendChildren(pageWrapper,header,contentWrapper,footer());


// Filling the workspace
const projectsPane = elements.pane({name:"Projects",id:"projects-pane"});
    projectsPane.addNew = function(str) {
        core.newProject(str);
        populateProjects();
    } 

const nextActionsPane = elements.pane({name:"Next Actions",id:"next-actions-pane"});
    nextActionsPane.addNew = function(str) {
        core.newTask(str);
        populateNextActions();
    }
dommy.appendChildren(workspaceWrapper,projectsPane,nextActionsPane);

const tempFill = function() {

    localStorage.clear();
    
    core.newTask("Buy nails");
    core.newTask("Measure dirt");
    core.newTask("Climb ladder");

    const testProj1 = core.newProject("Build a house");
};

core.logDatabase();
populateNextActions();
populateProjects();