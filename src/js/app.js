var UI = require('ui');

var main = new UI.Card({
    title: 'Project',
    subtitle: 'Tag',
    body: 'Time Started: \n10/10/10 \n10:10:10',
    subtitleColor: 'indigo', // Named colors
    bodyColor: '#9a0036' // Hex colors
});

main.show();


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
    workspaceMenu.hide();
});

projectMenu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    tagMenu.show();
    projectMenu.hide();
});

tagMenu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    main.show();
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