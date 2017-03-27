var UI = require('ui');

var main = new UI.Card({
  title: 'Project',
  subtitle: 'Tag',
    body: 'Time Started: \n10/10/10 \n10:10:10',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
        title: 'Workspaces',
      items: [{
        title: 'Workspace One',
      }, {
        title: 'Workspace Two',
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
   var menu = new UI.Menu({
    sections: [{
        title: 'Projects',
      items: [{
        title: 'Project One',
      }, {
        title: 'Project Two',
      }]
    }]
  });
    menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'down', function(e) {
 var menu = new UI.Menu({
    sections: [{
        title: 'Tags',
      items: [{
        title: 'Tag One',
      }, {
        title: 'Tag Two',
      }]
    }]
  });
    menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});
