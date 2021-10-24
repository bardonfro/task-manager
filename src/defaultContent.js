const defaultContent = {"1635112622742.592":"{\"id\":1635112622742.592,\"isActionable\":true,\"isComplete\":false,\"tasks\":[1635112762822.8965,1635112768406.2583],\"name\":\"Open an ice cream store\",\"type\":\"project\"}","1635112737592.8386":"{\"id\":1635112737592.8386,\"isActionable\":true,\"isComplete\":false,\"tasks\":[],\"name\":\"Buy airplane tickets\",\"type\":\"task\",\"project\":1635112652949.872}","1635112679219.349":"{\"id\":1635112679219.349,\"isActionable\":true,\"isComplete\":false,\"tasks\":[],\"name\":\"Draw plans\",\"type\":\"task\",\"project\":1635112662614.0896}","1635112696452.3394":"{\"id\":1635112696452.3394,\"isActionable\":true,\"isComplete\":false,\"tasks\":[],\"name\":\"Hire a carpenter\",\"type\":\"task\",\"project\":1635112662614.0896}","1635112634757.5674":"{\"id\":1635112634757.5674,\"isActionable\":true,\"isComplete\":false,\"tasks\":[],\"name\":\"Plant a tree\",\"type\":\"project\"}","1635112662614.0896":"{\"id\":1635112662614.0896,\"isActionable\":true,\"isComplete\":false,\"tasks\":[1635112669078.0798,1635112679219.349,1635112696452.3394],\"name\":\"Build a house\",\"type\":\"project\"}","directory":"[1635112622742.592,1635112634757.5674,1635112652949.872,1635112662614.0896,1635112669078.0798,1635112679219.349,1635112696452.3394,1635112737592.8386,1635112747509.9531,1635112762822.8965,1635112768406.2583]","1635112762822.8965":"{\"id\":1635112762822.8965,\"isActionable\":true,\"isComplete\":false,\"tasks\":[],\"name\":\"Make a logo\",\"type\":\"task\",\"project\":1635112622742.592}","1635112669078.0798":"{\"id\":1635112669078.0798,\"isActionable\":true,\"isComplete\":false,\"tasks\":[],\"name\":\"Buy nails\",\"type\":\"task\",\"project\":1635112662614.0896}","1635112747509.9531":"{\"id\":1635112747509.9531,\"isActionable\":true,\"isComplete\":false,\"tasks\":[],\"name\":\"Find a travel partner\",\"type\":\"task\",\"project\":1635112652949.872}","1635112768406.2583":"{\"id\":1635112768406.2583,\"isActionable\":true,\"isComplete\":false,\"tasks\":[],\"name\":\"Buy lots of milk\",\"type\":\"task\",\"project\":1635112622742.592}","1635112652949.872":"{\"id\":1635112652949.872,\"isActionable\":true,\"isComplete\":false,\"tasks\":[1635112737592.8386,1635112747509.9531],\"name\":\"Visit Rome\",\"type\":\"project\"}"};
// use JSON.stringify(localStorage) in browser console to extract.


export default function() {
    if (confirm('Are you sure you want to reset to the default content?')) {
        console.log('reset');
        localStorage.clear();
        
        Object.keys(defaultContent).forEach(function(key) {
            localStorage[key] = defaultContent[key];
        });

        window.location.reload();
    }
}
