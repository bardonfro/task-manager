import * as displayRegistry from './displayRegistry.js';
import * as dommy from './dommy.js';
import * as core from './coreLogic.js';
import * as index from './index.js';

const renderCard = function(paramObj) {
    const card = document.createElement('div');
    card.classList = `card ${paramObj.type}-card`;
    card.dataset.id = paramObj.id;

    const titleWrapper = dommy.el('div.title-wrapper');
        titleWrapper.appendChild(dommy.el('p.card-title',paramObj.name))
    
    if (paramObj.isComplete === true) {
        card.classList.add("complete");
    }

    if (paramObj.type === "task") {
        // Display project 
    }
    
    const iconWrapper = dommy.el('div.icon-wrapper');
    
    const completeIcon = dommy.el('div.icon.complete',"\u2713");
        completeIcon.addEventListener('click', function(e) {
            core.toggleIsComplete(paramObj.id);
        });
    const editIcon = dommy.el('div.icon.edit',"E");
        editIcon.onclick = function(e) {
            renderModal(paramObj);
        }
    


    if (paramObj.type === "task" && paramObj.project) {
        titleWrapper.appendChild(renderParentProjectWrapper(paramObj));
    }

    dommy.appendChildren(iconWrapper,completeIcon,editIcon)
    dommy.appendChildren(card,titleWrapper,iconWrapper)
    displayRegistry.add(paramObj.id,card);
    return card;
}

const renderModal = function (paramObj) {
    if (!paramObj || !(typeof(paramObj === 'object'))) {return;}

    const modalBackground = dommy.el('div.modal-background');
    document.body.appendChild(modalBackground);
    modalBackground.close = function() {
        modalBackground.parentElement.removeChild(modalBackground);
    }

    const modalWindow = dommy.el('div.modal-window');
    modalBackground.appendChild(modalWindow);
    
        const banner = dommy.el('div.banner');
    
            const titleBar = dommy.el('div.title-bar');
                titleBar.appendChild(dommy.el('h3.title',paramObj.name));
                if (paramObj.type === 'task' && paramObj.project) {
                    titleBar.appendChild(renderParentProjectWrapper(paramObj));
                }
            const closeBtn = dommy.el('button.close');
                closeBtn.addEventListener('click',modalBackground.close);
            
        dommy.appendChildren(banner,titleBar,closeBtn)
        
        const contentWrapper = dommy.el('div.contentWrapper');
        dommy.appendChildren(modalWindow,banner,contentWrapper)

        const menuPanel = dommy.el('div.menu-panel');
        const dataPanel = dommy.el('div.data-panel');
        dommy.appendChildren(contentWrapper,dataPanel,menuPanel);

        dommy.appendChildren(menuPanel,dommy.el('button','Test'));

        const description = dommy.el('div.description','This is a big long description of the project. It is very verbose.');
        const taskListWrapper = dommy.el('div.task-list-wrapper');
   
        dommy.appendChildren(dataPanel,description,taskListWrapper);
        
        if (paramObj.type === "project") {
            taskListWrapper.textContent = "Here is a list of the tasks for this project:"
            // This part needs help. Not working.
            paramObj.tasks.forEach(function(taskID) {
                taskListWrapper.appendChild(dommy.el('p',core.lookupKey(taskID,'name')))
            });    
        }

        if (paramObj.type === 'task') {
            // Project Selector
            const projectSelector = dommy.el('div.project-select');
                projectSelector.appendChild(dommy.el('p',"Select Project"));
                const projectDropdown = dommy.el('select');
                projectDropdown.appendChild(dommy.el('option',(paramObj.project ? core.lookupKey(paramObj.project,'name') : "--none--")));
                core.getProjects(200).forEach(function(project) {
                    const item = dommy.el('option',project.name);
                    item.strID = project.id;
                    projectDropdown.appendChild(item);
                });
                projectDropdown.addEventListener('change',function(e) {
                    const list = e.target.options;
                    const selectedIndex = list.selectedIndex;
                    const projectID = list[selectedIndex].strID;
                    core.assignProject(paramObj.id,projectID);
                    //core.assignProject(paramObj.id,e.target.options[e.target.options.selectedIndex].strID);
                })
            projectSelector.appendChild(projectDropdown);
            menuPanel.appendChild(projectSelector);


        }



    

}

const renderPane = function(obj) {
    const pane = document.createElement('div');
    const name = obj.name;
    if (obj.id) {
        pane.id = obj.id;
    }
    if (obj.classList) {
        pane.classList = "pane " + obj.classList;
    } else {
        pane.classList = "pane";
    }

    const title = document.createElement('h3');
        title.textContent = name;
        title.classList = "pane-title";
        pane.appendChild(title);
    
    const paneContent = document.createElement('div');
        paneContent.classList = "pane-content";
        pane.appendChild(paneContent);
        pane.content = paneContent;
    
    pane.appendChild(renderPaneForm(pane));

    pane.contentType = obj.contentType;
    
    let getCards;

    switch (pane.contentType){
        case "projects":
            pane.submitForm = core.newProject;
            getCards = core.getProjects;
            break;
        case "actionableTasks":
            pane.submitForm = core.newTask;
            getCards = core.getActionableTasks;
            break;
        case "completedTasks":
            pane.submitForm = console.log;
            getCards = core.getCompletedTasks;
            break;
        default:
            console.log("Unexpected pane type");
    }

    pane.appendCard = function (card) {
        pane.content.appendChild(card);
    }
    pane.clear = function () {
        pane.content.textContent = "";
    }

    pane.refresh = function() {
        pane.clear();
        const arrCards = getCards();
        arrCards.forEach(function(card){
            pane.appendCard(renderCard(card));
        })
    }

    pane.removeCard = function(strID) {
        console.log("Remove " + strID + " from " + title.textContent);
        pane.content.childNodes.forEach(function(node) {
            if (node.dataset.id === strID) {
                pane.content.removeChild(node);
            }
        });
    }
    
    pane.refresh();
    return pane;
}

const renderPaneForm = function(pane) {
    const formWrapper = document.createElement('div');
        formWrapper.classList = "pane-form-wrapper";
    const form = document.createElement('form');
        const textInputWrapper = document.createElement('div');
            textInputWrapper.classList = "text-input-wrapper";
        const textInput = document.createElement('input');
            textInput.type = "text";
            textInput.placeholder = "Add New Item";
            textInput.name = "Input Name";
            textInput.required = true;
            textInput.classList = "text-input";
        const submit = document.createElement('input');
            submit.type = "submit";
            submit.value = "+";
            submit.classList = "submit";

        textInputWrapper.appendChild(textInput);
        form.appendChild(textInputWrapper);
        form.appendChild(submit);
        form.onsubmit = function(e){
            pane.submitForm(e.target[0].value);
            textInput.value = "";
            pane.refresh();
            return false;}
    formWrapper.appendChild(form);
        
    return formWrapper;
}

const renderParentProjectWrapper = function(paramObj) {
    const parentProjectWrapper = dommy.el('p.project-wrapper');
    parentProjectWrapper.appendChild(dommy.el('p','Project: ' + core.lookupKey(paramObj.project,'name')));
    return parentProjectWrapper;

}

const renderProjectCard = function(obj) {
    console.log("Used old renderProjectCard");
    return renderCard(obj);
}


const renderTaskCard = function(obj) {
    console.log("Used old renderTaskCard");
    return renderCard(obj);
}



export {
    renderCard as card,
    renderModal as modal,
    renderPane as pane,
    renderProjectCard as projectCard,
    renderTaskCard as taskCard,
}