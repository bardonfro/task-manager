
const list = {};

const test = function (strID) {
    if(list[strID]) {
        console.log(strID + " value is: " + list[strID]);
    } else {
        console.log(strID + " not found.");
    }
};

const add = function(strID,element) {
    if (!_isRegistered(strID)) {
        list[strID] = [];
    };

    list[strID].push(element);
    element.addEventListener('mouseenter',hoverHighlight.bind(element,strID));
    element.addEventListener('mouseleave',hoverUnHighlight.bind(element,strID));
};

const hoverHighlight = function (strID) {
    read(strID).forEach(function (element) {
        element.classList.add('hover-highlight');
    })
}

const hoverUnHighlight = function (strID) {
    read(strID).forEach(function (element) {
        element.classList.remove('hover-highlight');
    })
}


const log = function() {
    console.table(list);
};

const _isRegistered = function(strID) {
    if(list[strID]) {
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
    list[strID] = arr;
}

const read = function(strID) {
    if(!_isRegistered(strID)) {
        return;
    }

    return list[strID];
}


export {add,log,read,remove,test};

