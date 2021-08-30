import * as displayRegistry from './displayRegistry.js';
import * as dommy from './dommy.js';
import * as core from './coreLogic.js';
import * as index from './index.js';

const refreshHighlight = function (element) {
    console.log("Refresh:");
    console.log(element);
    element.classList.add('refresh-highlight');
    
    const removeRefreshHighlight = function() {
        element.classList.remove('refresh-highlight');
    }
    
    setTimeout(removeRefreshHighlight,2000);
}

const renderCard = function(paramObj) {
    // Build card structure
    const card = document.createElement('div');
    card.classList = `card ${paramObj.type}-card`;
    card.dataset.id = paramObj.id;

    const titleWrapper = dommy.el('div.title-wrapper');
        const title = dommy.el('p.card-title')
        const parentProject = dommy.el('p.project-wrapper');
        dommy.appendChildren(titleWrapper,title,parentProject);
    
    // Child Task List
    const childTaskWrapper = dommy.el('div.child-tasks-wrapper');

    
    // Icon wrapper
    const iconWrapper = dommy.el('div.icon-wrapper');
    
    const completeIcon = dommy.el('div.icon.complete',"\u2713");
        completeIcon.addEventListener('click', function(e) {
            core.toggleIsComplete(paramObj.id);
        });
    const editIcon = dommy.el('div.icon.edit',"E");
        editIcon.onclick = function(e) {
            renderModal(paramObj);
        }
    

    dommy.appendChildren(iconWrapper,completeIcon,editIcon)
    dommy.appendChildren(card,titleWrapper,childTaskWrapper, iconWrapper);
    displayRegistry.add(paramObj.id,card);

    card.fillContent = function(paramObj) {
        title.textContent = paramObj.name;
        if (paramObj.isComplete) {
            card.classList.add('complete');
        } else {
            card.classList.remove('complete');
        }
        
        if (paramObj.type === "task" && paramObj.project) {
            parentProject.textContent = 'Project: ' + core.lookupKey(paramObj.project,'name');
        } else {
                parentProject.textContent = ""
        }

        if (paramObj.type === 'project') {
            const list = dommy.el('ul.child-task-list');
            const arrIDs = core.lookupKey(paramObj.id,'tasks');
            if (!Array.isArray(arrIDs) || !arrIDs.length > 0) {return;}
            childTaskWrapper.appendChild(dommy.el('p.header','Tasks:'))
            arrIDs.forEach(function(strID){
                const li = dommy.el('li',core.lookupKey(strID,'name'));
                if (core.lookupKey(strID,'isComplete')) {
                    li.classList = "complete";
                }
                list.appendChild(li);
                displayRegistry.add(strID,li);
            });
            childTaskWrapper.appendChild(list);
            
            childTaskWrapper.textContent
        }
    }


    card.refresh = function() {
        card.fillContent(core.retrieveItem(card.dataset.id));
        refreshHighlight(card);
    }


    card.fillContent(paramObj);
    return card;
}

const renderModal = function (paramObj) {
    const recordObj = core.retrieveItem(paramObj.id);

    if (!recordObj || !(typeof(recordObj === 'object'))) {return;}

    // Background and closure events
    const modalBackground = dommy.el('div.modal-background');
        modalBackground.close = function() {
            modalBackground.parentElement.removeChild(modalBackground);
            document.removeEventListener('keydown', modalBackground.keydownHandler);
        }
        modalBackground.keydownHandler = function(e) {
            if (e.key === "Escape") {
                modalBackground.close();
            }
        }
        document.addEventListener('keydown',modalBackground.keydownHandler);
    document.body.appendChild(modalBackground);
    
    
    const modalWindow = dommy.el('div.modal-window');
    modalBackground.appendChild(modalWindow);
        
        // Banner and Title
        const banner = dommy.el('div.banner');
    
            const titleBar = dommy.el('div.title-bar');
                titleBar.appendChild(dommy.el('h3.title',recordObj.name));
                if (recordObj.type === 'task' && recordObj.project) {
                    titleBar.appendChild(renderParentProjectWrapper(recordObj));
                }
            const closeBtn = dommy.el('button.close');
                closeBtn.addEventListener('click',modalBackground.close);
            
        dommy.appendChildren(banner,titleBar,closeBtn)
        
        // Content Wrapper and Panels
        const contentWrapper = dommy.el('div.contentWrapper');
            dommy.appendChildren(modalWindow,banner,contentWrapper)

            const menuPanel = dommy.el('div.menu-panel');
            const dataPanel = dommy.el('div.data-panel');
        dommy.appendChildren(contentWrapper,dataPanel,menuPanel);

        dommy.appendChildren(menuPanel,dommy.el('button','Test'));

        const description = dommy.el('div.description','This is a big long description of the project. It is very verbose.');
        const taskListWrapper = dommy.el('div.task-list-wrapper');
   
        dommy.appendChildren(dataPanel,description,taskListWrapper);
        
        if (recordObj.type === "project") {
            taskListWrapper.textContent = "Here is a list of the tasks for this project:"
            recordObj.tasks.forEach(function(taskID) {
                taskListWrapper.appendChild(dommy.el('p',core.lookupKey(taskID,'name')))
            });    
        }

        if (recordObj.type === 'task') {
            // Project Selector
            const projectSelector = dommy.el('div.project-select');
                projectSelector.appendChild(dommy.el('p',"Select Project"));
                const projectDropdown = dommy.el('select');
                const arrProjects = [];

                core.getProjects(200).forEach(function(project) {
                    let name = project.name;
                    if (project.id === recordObj.project) {
                        name = "-" + name + "-";
                    }
                    const item = dommy.el('option',name);
                    item.strID = project.id;
                    arrProjects.push(item);
                });
                arrProjects.sort(function(a,b) {
                    if (a.textContent < b.textContent) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
                const noneElement = dommy.el('option','--none--');
                noneElement.strID = undefined;
                if (recordObj.project) {
                    arrProjects.push(noneElement);
                } else {
                    arrProjects.unshift(noneElement);
                }
                arrProjects.forEach(function(element) {
                    projectDropdown.appendChild(element);
                });
                projectDropdown.addEventListener('change',function(e) {
                    const list = e.target.options;
                    const selectedIndex = list.selectedIndex;
                    const projectID = list[selectedIndex].strID;
                    core.assignProject(recordObj.id,projectID);
                    //core.assignProject(paramObj.id,e.target.options[e.target.options.selectedIndex].strID);
                });
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