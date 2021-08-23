const newButtonClick = function () {
    console.log("You clicked?");
}

const renderFormAdd = function() {
    const formWrapper = document.createElement('div');
        formWrapper.classList = "pane-form-wrapper";
    const form = document.createElement('form');
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

        form.appendChild(textInput);
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
    

    return pane;
}

export {
    renderPane as pane,
}