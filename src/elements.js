import * as click from './clickHandlers.js';
import * as displayRegistry from './displayRegistry.js';

const renderFormAdd = function() {
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
            e.target.parentElement.parentElement.addNew(e.target[0].value);
            textInput.value = "";
            return false;};   
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
    
    pane.appendChild(renderFormAdd());
    
    pane.appendCard = function (card) {
        pane.content.appendChild(card);
    }
    pane.clear = function () {
        pane.content.textContent = "";
    }
    pane.removeCard = function(strID) {
        console.log("Remove " + strID + " from " + title.textContent);
        pane.content.childNodes.forEach(function(node) {
            if (node.dataset.id === strID) {
                pane.content.removeChild(node);
            }
        })
    }
    

    return pane;
}

const renderProjectCard = function(obj) {
    const card = document.createElement('div');
    card.classList = "card project-card";
    card.dataset.id = obj.id;

    if (obj.isActionable === true) {
        card.classList.add("complete");
    }

    const title = document.createElement('p');
        title.textContent = obj.name;
        title.classList = "card-title";
        card.appendChild(title);
    
    displayRegistry.add(obj.id,card);
    return card;
}


const renderTaskCard = function(obj) {
    const card = document.createElement('div');
    card.classList = "card task-card";
    card.dataset.id = obj.id;

    if (obj.isComplete === true) {
        card.classList.add("complete");
    }

    const title = document.createElement('p');
        title.textContent = obj.name;
        title.classList = "card-title";
        card.appendChild(title);
    
    const iconWrapper = document.createElement('div');
        iconWrapper.classList = "icon-wrapper";
        card.appendChild(iconWrapper);
    
    const completeIcon = document.createElement('div');
        completeIcon.classList = "icon complete";
        iconWrapper.appendChild(completeIcon);
        completeIcon.onclick = function(e) {
            click.taskComplete(card);
        }
    displayRegistry.add(obj.id,card);
    return card;
}


export {
    renderPane as pane,
    renderProjectCard as projectCard,
    renderTaskCard as taskCard,
}