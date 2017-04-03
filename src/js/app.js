var Settings = require('settings');
var Toggl = require('togglUtil');
var AppUi = require('appUi');

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

if (Toggl.encodedToken === 'undefined' || !Toggl.encodedToken) {
    AppUi.noToken.show();
    console.log('No token found');
} else {
    AppUi.main.show();
}
console.log(Toggl.encodedToken);

var currData = Toggl.request('GET', 'time_entries/current', null);
var projectData = Toggl.request('GET', 'projects/' + currData.data.pid, null);
console.log(projectData.data.name);
console.log(currData.data.tags[0]);
console.log(currData.data.start);

AppUi.main.title(projectData.data.name);
AppUi.main.subtitle(currData.data.tags[0]);
AppUi.main.body('Time Started: \n' + Toggl.parseTime(currData.data.start).toString());