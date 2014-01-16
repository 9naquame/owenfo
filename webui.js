var express = require('express');
var fs = require('fs');
var app = express();
var checks;
var systems;

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
        res.send(text);
    });
});

app.get("/statuses", function(req, res){
    var statuses = [];
    for(var system in checks)
    {
        var status = {
            system : system,
            host: checks[system].host,
            checks: []
        };
        for(var check in checks[system].checks)
        {
            status.checks.push({
                type : check,
                status: checks[system].checks[check].status
            });
        }
        statuses.push(status);
    }
    res.send(JSON.stringify({statuses:statuses}));
});

module.exports.start = function(_checks) {
    checks = _checks;
    app.listen(3000);
    console.log("Starting webui ... listening on port 3000");
}

