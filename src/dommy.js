const arrQuerySelect = (selector) => {
    const nodeList = document.querySelectorAll(selector)
    const arr = [];
    nodeList.forEach((node) => {arr.push(node);});
    return arr;
}

const click = (element) => {
    const evt = new PointerEvent('click', {
        bubbles: true,
    });
    element.dispatchEvent(evt);
}

const parseElementName = function(str) {
    let _element = {tag:"", id:"", classList:""};

    // Divides the input into substrings by adding a marker ("%") before each id or class character
    let subStrings = (function(str) {
        let symbols = ["#","."]; // All of the characters that indicate a new component
        symbols.forEach(function(sym){
            str = str.replaceAll(sym,("%" + sym));
        });
        return str.split("%");
    })(str);
    

    subStrings.forEach(function(sstr) {
        switch (sstr[0]) {
            case ("#"):
                _element.id = sstr.slice(1);
                break;
            case ("."):
                _element.classList = _element.classList + " " + sstr.slice(1);
                break;
            default:
                _element.tag = sstr;
        }
    })

    let element = document.createElement(_element.tag);
        if (_element.id.length > 0) {
            element.id = _element.id;
        }
        if (_element.classList.length > 0) {
            element.classList = _element.classList.slice(1);
        }
    return element;

}
const appendChildren = function(parent, ...children) {
    children.forEach(function(child) {
        parent.appendChild(child);
    })
}


const camelCase = function(str) {
    if (!str) {return undefined}
    let words = str.split(" ");
    words = words.map(word => titleCase(word));
    words[0] = words[0].toLowerCase();
    return words.join('');
}

const el = function (name, textContent) {
    const element = parseElementName(name);
    element.textContent = textContent;
    return element;
}    

const getParentOfClass = function(element,targetClass) {
    if (!element || element.tagName === "BODY") {return;}
    if (element.classList.contains(targetClass)) {
        return element;
    } else {
        return getParentOfClass(element.parentElement,targetClass);
    }
}

const titleCase = function (str) {
    const words = str.split(" ");
    const wordsCapitalized = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return wordsCapitalized.join(" ");
}

export {
    appendChildren,
    arrQuerySelect,
    camelCase,
    click,
    el,
    getParentOfClass,
    titleCase,
}