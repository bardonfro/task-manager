import * as dommy from './dommy.js';
import * as storage from './storage.js';
import footer from './footer.js';
import './style.scss';

const pageWrapper = dommy.el("div#page-wrapper");
const header = dommy.el("div#header","Header");
const contentWrapper = dommy.el("div.#content");
const workspaceWrapper = dommy.el("div#workspace");
const paneSelection = dommy.el("div#pane-selector");





dommy.appendChildren(contentWrapper,workspaceWrapper, paneSelection)
dommy.appendChildren(pageWrapper,header,contentWrapper,footer());
dommy.appendChildren(document.body,pageWrapper);

storage.init();
storage.show();

 