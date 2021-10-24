import * as dommy from './dommy.js';
import * as core from './coreLogic.js';
import * as render from './elements.js';
import * as displayRegistry from './displayRegistry.js';
import footer from './footer.js';
import './style.scss';


//render.modal(core.getActionableTasks()[0]);

const hoverHighlight = function (strID) {
    console.log("index.hoverHighlight used. Use displayRegistry.add instead")
}

const hoverUnHighlight = function (strID) {
    console.log("index.hoverUnHighlight used. Use displayRegistry.add instead")
}
    


// Creating the layout framework


const pageWrapper = dommy.el("div#page-wrapper");
dommy.appendChildren(document.body,pageWrapper);

const header = dommy.el("div#header",'');
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


const getParentOfClass = function(element,targetClass) {
    if (!element || element.tagName === "BODY") {return;}
    if (element.classList.contains(targetClass)) {
        return element;
    } else {
        return getParentOfClass(element.parentElement,targetClass);
    }
}

const renderChange = function (strID) {
    displayRegistry.read(strID).forEach(function(element) {
        getParentOfClass(element,'card').refresh();
    });
}

const modify = function(strID,field,value) {

    displayRegistry.read(strID).forEach(function(element) {
        const card = getParentOfClass(element,'card');
        if (card) {card.refresh()};
    });
}

const refreshAllPanes = function () {
    displayRegistry.getPanes().forEach(function(pane) {
        pane.refresh();
    });
}


import reset from './defaultContent.js';
const resetLink = dommy.el('p','Reset');
resetLink.onclick = reset;
header.appendChild(resetLink);


export {
    hoverHighlight,
    hoverUnHighlight,
    modify,
    refreshAllPanes,
}

