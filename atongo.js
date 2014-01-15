var yaml = require("yaml-js");
var fs = require("fs");
var webui = require("./webui");
var checks = [];

console.log("Atongo Monitor");

if(process.argv[2] === undefined) 
{
    console.log("No configuration file supplied");
    process.exit();
}

fs.readFile(process.argv[2], 'utf8', function(err, data){
    if(err) throw err;
    var systems = yaml.load(data);
    var checkIntervals = [];
    
    for(system in systems)
    {
        if(typeof systems[system].checks == 'object')
        {
            for(check in systems[system].checks)
            {
                if(check == 'ping')
                    createPingcheck(
                        {
                            host: systems[system].host,
                            interval: systems[system].checks[check].interval,
                            alerts: mergeAlerts(
                                systems[system].alerts,
                                systems[system].checks[check].alerts
                            )
                        }
                    );
            }
        }
    }
    
    webui.start();
});

function mergeAlerts(systemAlerts, checkAlerts)
{
    if(typeof systenAlerts == 'object')
    {
        for(alarm in checkAlerts)
        {
            systemAlerts[alarm] = checkAlerts[alarm];
        }
        return systemAlerts;
    }
    else
    {
        return checkAlerts;
    }
}

function createPingcheck(check)
{
    var ping = require ("net-ping");
    var session = ping.createSession ();

    setInterval(    
    function(){
        session.pingHost (check.host, function (error, target) {
            if (error)
                console.log (target + ": Dead");
            else
                console.log (target + ": Alive");
        });
    }, check.interval);
}




