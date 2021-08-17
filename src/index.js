import * as dommy from './dommy.js';
import * as storage from './storage.js';
import footer from './footer.js';
import './style.scss';

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
    
    pane.appendCard = function (card) {
        pane.content.appendChild(card);
    }

    return pane;
}



const renderTaskCard = function(obj) {
    const card = document.createElement('div');
    const name = obj.name;
    if (obj.id) {
        card.id = obj.id;
    }
    if (obj.classList) {
        card.classList = "card " + obj.classList;
    } else {
        card.classList = "card";
    }

    const title = document.createElement('p');
        title.textContent = name;
        title.classList = "card-title";
        card.appendChild(title);
    
    return card;
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
const projectsPane = renderPane({name:"Projects",id:"projects-pane"});

const testCard = renderTaskCard({name:"Get a Thing"});
const test2 = renderTaskCard({name:"Do a Thing"});
const test3 = renderTaskCard({name:"Wish a Thing"});
const test4 = renderTaskCard({name:"See a Thing"});

projectsPane.appendCard(testCard);
projectsPane.appendCard(test2);
projectsPane.appendCard(test3);
projectsPane.appendCard(test4);

const nextActionsPane = renderPane({name:"Next Actions",id:"next-actions-pane"});

const ac1 = renderTaskCard({name:"Bang a Thing"});
const ac2 = renderTaskCard({name:"Hang a Thing"});
const ac3 = renderTaskCard({name:"Throw a Thing"});
const ac4 = renderTaskCard({name:"Catch a Thing"});

nextActionsPane.appendCard(ac1);
nextActionsPane.appendCard(ac2);
nextActionsPane.appendCard(ac3);
nextActionsPane.appendCard(ac4);


dommy.appendChildren(workspaceWrapper,projectsPane,nextActionsPane);


storage.init();
storage.show();

 