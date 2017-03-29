var UI = require('ui');
var Settings = require('settings');

Settings.config({
        url: 'https://alekskivuls.github.io/TogglPebble/'
    },
    function(e) {
        console.log('opened config');
    },
    function(e) {
        console.log('Recieved settings!');
        var options = e.options;
        var api_key = options.api_key;
        console.log(api_key);
        var base64 = require('base64');
        var encodedToken = base64.encode(api_key + ":api_token");
        console.log(encodedToken);
        localStorage.setItem('encoded_token', encodedToken);
    }
);

var encodedToken = localStorage.getItem('encoded_token');
var togglRequest = function(requestMethod, endpoint, body) {
    var xhttp = new XMLHttpRequest();
    xhttp.open(requestMethod, 'https://toggl.com/api/v8/' + endpoint, false);
    xhttp.setRequestHeader('Authorization', 'Basic ' + encodedToken);
    xhttp.setRequestHeader('Content-type', 'application/json');
    if (body !== null) {
        xhttp.setRequestHeader('Content-length', body.length);
    }
    xhttp.send(body);
    console.log(xhttp.status);
    console.log(xhttp.responseText);
    return JSON.parse(xhttp.responseText);
};

var main = new UI.Card({
    title: 'Project',
    subtitle: 'Tag',
    body: 'Time Started: \n10/10/10 \n10:10:10',
    subtitleColor: 'indigo', // Named colors
    bodyColor: '#9a0036' // Hex colors
});

if (encodedToken === 'undefined' || !encodedToken) {
    var noToken = new UI.Card({
        title: 'API Token',
        body: 'Toggl API token not set inside settings',
        bodyColor: '#9a0036' // Hex colors
    });
    noToken.show();
    console.log('No token found');
} else {
    main.show();
}
console.log(encodedToken);

togglRequest('GET', 'time_entries/current', null);

main.show();
//main.title('test');


var workspaceMenu = new UI.Menu({
    sections: [{
        title: 'Workspaces',
        items: [{
            title: 'Workspace One',
        }, {
            title: 'Workspace Two',
        }]
    }]
});

var projectMenu = new UI.Menu({
    sections: [{
        title: 'Projects',
        items: [{
            title: 'Project One',
        }, {
            title: 'Project Two',
        }]
    }]
});

var tagMenu = new UI.Menu({
    sections: [{
        title: 'Tags',
        items: [{
            title: 'Tag One',
        }, {
            title: 'Tag Two',
        }]
    }]
});

workspaceMenu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    projectMenu.show();
});

projectMenu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    tagMenu.show();
});

tagMenu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    main.show();
    workspaceMenu.hide();
    projectMenu.hide();
    tagMenu.hide();
});

main.on('click', 'up', function(e) {
    workspaceMenu.show();
});

main.on('click', 'select', function(e) {
    projectMenu.show();
});

main.on('click', 'down', function(e) {
    tagMenu.show();
});