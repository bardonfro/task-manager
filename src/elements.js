const newButtonClick = function () {
    console.log("You clicked?");
}

const renderBtnNew = function() {
    const btn = document.createElement('button');
        btn.classList = "new-button";
        btn.textContent = "+";
        btn.onclick = newButtonClick;
        
    return btn;
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
    
    pane.appendChild(renderBtnNew());
    
    pane.appendCard = function (card) {
        pane.content.appendChild(card);
    }

    return pane;
}

export {
    renderPane as pane,
}