import * as click from './clickHandlers.js';
import * as displayRegistry from './displayRegistry.js';
import * as core from './coreLogic.js';

const renderFormAdd = function(pane) {
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
    
    pane.appendChild(renderFormAdd(pane));

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

const renderProjectCard = function(obj) {
    console.log("Used old renderProjectCard");
    return renderCard(obj);
}


const renderTaskCard = function(obj) {
    console.log("Used old renderTaskCard");
    return renderCard(obj);
}

const renderCard = function(paramObj) {
    const card = document.createElement('div');
    card.classList = `card ${paramObj.type}-card`;
    card.dataset.id = paramObj.id;

    
    const title = document.createElement('p');
    title.textContent = paramObj.name;
    title.classList = "card-title";
    card.appendChild(title);
    
    if (paramObj.isComplete === true) {
        card.classList.add("complete");
    }
    
    if (paramObj.type === "task") {
        const iconWrapper = document.createElement('div');
            iconWrapper.classList = "icon-wrapper";
            card.appendChild(iconWrapper);
        
        const completeIcon = document.createElement('div');
            completeIcon.classList = "icon complete";
            iconWrapper.appendChild(completeIcon);
            completeIcon.onclick = function(e) {
                click.taskComplete(card);
            }
    }
    
    displayRegistry.add(paramObj.id,card);
    return card;
}


export {
    renderPane as pane,
    renderProjectCard as projectCard,
    renderTaskCard as taskCard,
}