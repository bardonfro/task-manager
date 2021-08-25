import * as dommy from './dommy.js';
import * as core from './coreLogic.js';
import * as render from './elements.js';
import * as displayRegistry from './displayRegistry.js';
import footer from './footer.js';
import './style.scss';



    
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
const projectsPane = render.pane({name:"Projects",id:"projects-pane",contentType:"projects"});
const nextActionsPane = render.pane({name:"Next Actions",id:"next-actions-pane",contentType:"actionableTasks"});
const completedPane = render.pane({name:"Completed",id:"completed-pane",contentType:"completedTasks"});

dommy.appendChildren(workspaceWrapper,projectsPane,nextActionsPane,completedPane);


const modify = function(strID,field,value) {
    let action = function(){return};

    switch (field) {
        case "isComplete":
            if (value === true) {
                action = function(element) {
                    element.classList.add("complete");
                }
            } else {
                action = function(element) {
                    element.classList.remove("complete");
                }
            }
            nextActionsPane.refresh();
            completedPane.refresh();
            break;
    
    }

    displayRegistry.read(strID).forEach(function(element) {action(element)});
}

render.modal(core.getProjects()[0]);

export {modify}