import * as dommy from './dommy.js';
import * as storage from './storage.js';
import * as elements from './elements.js';
import * as core from './coreLogic.js';
import footer from './footer.js';
import './style.scss';




const renderTaskCard = function(obj) {
    const card = document.createElement('div');
    card.classList = "card";
    card.dataset.id = obj.id;

    const title = document.createElement('p');
        title.textContent = obj.name;
        title.classList = "card-title";
        card.appendChild(title);
    
    return card;
}
        
const newButtonClick2 = function() {
    console.log("What? (Index)");
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
const nextActionsPane = elements.pane({name:"Next Actions",id:"next-actions-pane"});
dommy.appendChildren(workspaceWrapper,projectsPane,nextActionsPane);

const tempFill = (function() {

    const testProj1 = storage.newProject("Build a house");
    projectsPane.appendCard(renderTaskCard(testProj1));

    const testTask1 = storage.newTask("Buy nails");
    nextActionsPane.appendCard(renderTaskCard(testTask1));



    // const testCard = renderTaskCard({name:"Get a Thing"});
    // const test2 = renderTaskCard({name:"Do a Thing"});
    // const test3 = renderTaskCard({name:"Wish a Thing"});
    // const test4 = renderTaskCard({name:"See a Thing"});

    // projectsPane.appendCard(testCard);
    // projectsPane.appendCard(test2);
    // projectsPane.appendCard(test3);
    // projectsPane.appendCard(test4);


    // const ac1 = renderTaskCard({name:"Whack a Thing"});
    // const ac2 = renderTaskCard({name:"Hang a Thing"});
    // const ac3 = renderTaskCard({name:"Throw a Thing"});
    // const ac4 = renderTaskCard({name:"Catch a Big Hairy Thing"});

    // nextActionsPane.appendCard(ac1);
    // nextActionsPane.appendCard(ac2);
    // nextActionsPane.appendCard(ac3);
    // nextActionsPane.appendCard(ac4);

})();



//storage.init();

storage.show();

console.log(storage.lookupKey("1","name"));

