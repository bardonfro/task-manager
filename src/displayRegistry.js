
const arrElementsByID = {};
const panes = [];

const test = function (strID) {
    if(arrElementsByID[strID]) {
        console.log(strID + " value is: " + arrElementsByID[strID]);
    } else {
        console.log(strID + " not found.");
    }
};

const add = function(strID,element) {
    console.log("displayRegistry.add used. Use addByID instead.");
    addByID(strID,element);
}
const addByID = function(strID,element) {
    if (!_isRegistered(strID)) {
        arrElementsByID[strID] = [];
    };

    arrElementsByID[strID].push(element);
    element.addEventListener('mouseenter',_hoverHighlight.bind(element,strID));
    element.addEventListener('mouseleave',_hoverUnHighlight.bind(element,strID));
};

const addPane = function (pane) {
    panes.push(pane);
}

const getPanes = function () {
    return panes;
}

const _hoverHighlight = function (strID) {
    read(strID).forEach(function (element) {
        element.classList.add('hover-highlight');
    })
}

const _hoverUnHighlight = function (strID) {
    read(strID).forEach(function (element) {
        element.classList.remove('hover-highlight');
    })
}


const log = function() {
    console.table(arrElementsByID);
};

const _isRegistered = function(strID) {
    if(arrElementsByID[strID]) {
        return true;
    } 
    return false;
};

const remove = function(strID,element) {
    let arr = read(strID);
    if (Array.isArray(arr) &&
        arr.length > 0 &&
        arr.includes(element)) {
            arr = arr.splice(arr.indexOf(element,1));
    }
    arrElementsByID[strID] = arr;
}

const read = function(strID) {
    if(!_isRegistered(strID)) {
        return [];
    }

    return arrElementsByID[strID];
}


export {
    add,
    addByID,
    addPane,
    getPanes,
    log,
    read,
    remove,
    test
};

