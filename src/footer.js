// Locaion of image file for Github mark
import gitMarkFile from './img/github.png';

//Github repo URL:
const repoURL = "https://github.com/bardonfro/task-manager"


export default function() {
    const gitMark = new Image();
        gitMark.src = gitMarkFile;
        gitMark.classList = "github-mark";
        gitMark.style = "height: 1em;"

    const gitLink = document.createElement('a');
        gitLink.classList = 'github-link';
        gitLink.href = repoURL;
        gitLink.target = "_blank";
        gitLink.appendChild(gitMark);
        gitLink.style = "margin-left: 1em; display:flex; flex-direction:column; justify-content:center;";

        
    const textWrapper = document.createElement('div');
        textWrapper.textContent = '\u00A9 ' + (new Date().getFullYear()) + ' bardonfro';
        
    const footer = document.createElement('div');
        footer.id = 'footer';
        footer.style = "text-align: center; padding: .6em; display:flex; align-items:center; justify-content:center;"

    footer.appendChild(textWrapper);
    footer.appendChild(gitLink);

    return footer;
}