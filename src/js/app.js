var UI = require('ui');
var Settings = require('settings');
var Toggl = require('togglUtil');

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

var main = new UI.Card({
    title: 'Project',
    subtitle: 'Tag',
    body: 'Time Started: \n10/10/10 \n10:10:10',
    subtitleColor: 'indigo', // Named colors
    bodyColor: '#9a0036' // Hex colors
});

if (Toggl.encodedToken === 'undefined' || !Toggl.encodedToken) {
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
console.log(Toggl.encodedToken);

var currData = Toggl.request('GET', 'time_entries/current', null);
var projectData = Toggl.request('GET', 'projects/'+currData.data.pid, null);
console.log(projectData.data.name);
console.log(currData.data.tags[0]);
console.log(currData.data.start);
main.show();

main.title(projectData.data.name);
main.subtitle(currData.data.tags[0]);
main.body('Time Started: \n'+currData.data.start);


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