import * as dommy from './dommy.js';
import * as storage from './storage.js';
import footer from './footer.js';

const x = dommy.el('h1.temp-title',"FOCUS");
const y = dommy.el('h2.temp-subtitle',"A Task Manager For The Rest Of Us");

dommy.appendChildren(document.body,x,y,footer());


storage.init();


storage.remove("004");

storage.show();

