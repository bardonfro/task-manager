import * as dommy from './dommy.js';
import * as storage from './storage.js';
import footer from './footer.js';

const x = dommy.el('h1.temp-title',"FOCUS");
const y = dommy.el('h2.temp-subtitle',"A Task Manager For The Rest Of Us");

dommy.appendChildren(document.body,x,y,footer());



let a = {id:"001",name:"Tommy"};
let b = {id:"002",name:"Dick"};
let c = {id:"003",name:"Mother Smothers"};
storage.store(a);
storage.store(b);
storage.store(c);
storage.store({id:"002",name:"Thief"});

let a1 = storage.retrieve("001");
a1.lastName = "Smothers";
console.log(a1)

