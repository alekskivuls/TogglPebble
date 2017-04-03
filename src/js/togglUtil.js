var Toggl = {
    encodedToken: localStorage.getItem('encoded_token'),

    request: function(requestMethod, endpoint, body) {
        var xhttp = new XMLHttpRequest();
        xhttp.open(requestMethod, 'https://toggl.com/api/v8/' + endpoint, false);
        xhttp.setRequestHeader('Authorization', 'Basic ' + this.encodedToken);
        xhttp.setRequestHeader('Content-type', 'application/json');
        if (body !== null) {
            xhttp.setRequestHeader('Content-length', body.length);
        }
        xhttp.send(body);
        console.log(xhttp.status);
        console.log(xhttp.responseText);
        return JSON.parse(xhttp.responseText);
    },

    parseTime: function(timeStr) {
        var yyyy = timeStr.substr(0, 4);
        var MM = timeStr.substr(5, 2);
        var dd = timeStr.substr(8, 2);
        var hh = timeStr.substr(11, 2);
        var mm = timeStr.substr(14, 2);
        var ss = timeStr.substr(17, 2);
        return {
            'yyyy': yyyy,
            'MM': MM,
            'dd': dd,
            'hh': hh,
            'mm': mm,
            'ss': ss,
            toString: function() {
                return MM + '-' + dd + '-' + yyyy + '\n' + hh + ':' + mm + ':' + ss;
            }
        };
    }
};

this.exports = Toggl;