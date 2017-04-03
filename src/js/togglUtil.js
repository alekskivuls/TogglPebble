var Toggl = {
    encodedToken : localStorage.getItem('encoded_token'),
    
    request : function(requestMethod, endpoint, body) {
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
};

this.exports = Toggl;