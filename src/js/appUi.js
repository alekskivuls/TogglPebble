var UI = require('ui');

var appUi = {
    main: new UI.Card({
        title: 'Project',
        subtitle: 'Tag',
        body: 'Time Started: \n10/10/10 \n10:10:10',
        subtitleColor: 'indigo', // Named colors
        bodyColor: '#9a0036' // Hex colors
    }),

    workspaceMenu: new UI.Menu({
        sections: [{
            title: 'Workspaces',
            items: [{
                title: 'Workspace One',
            }, {
                title: 'Workspace Two',
            }]
        }]
    }),

    projectMenu: new UI.Menu({
        sections: [{
            title: 'Projects',
            items: [{
                title: 'Project One',
            }, {
                title: 'Project Two',
            }]
        }]
    }),

    tagMenu: new UI.Menu({
        sections: [{
            title: 'Tags',
            items: [{
                title: 'Tag One',
            }, {
                title: 'Tag Two',
            }]
        }]
    }),

    noToken: new UI.Card({
        title: 'API Token',
        body: 'Toggl API token not set inside settings',
        bodyColor: '#9a0036' // Hex colors
    })
};

appUi.workspaceMenu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    appUi.projectMenu.show();
});

appUi.projectMenu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    appUi.tagMenu.show();
});

appUi.tagMenu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    appUi.main.show();
    appUi.workspaceMenu.hide();
    appUi.projectMenu.hide();
    appUi.tagMenu.hide();
});

appUi.main.on('click', 'up', function(e) {
    appUi.workspaceMenu.show();
});

appUi.main.on('click', 'select', function(e) {
    appUi.projectMenu.show();
});

appUi.main.on('click', 'down', function(e) {
    appUi.tagMenu.show();
});

this.exports = appUi;