import * as core from './coreLogic.js';

const taskComplete = function (element) {
    core.toggleIsComplete(element.dataset.id);
}

export {
    taskComplete,
}