var yaml = require("yaml-js");
var fs = require("fs");
var webui = require("./webui");
var checks = {};
var statuses = [];

console.log("ɔwɛnfo service monitor");

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
        checks[system] = {
            host : systems[system].host,
            checks: {}
        };
        
        if(typeof systems[system].checks == 'object')
        {
            for(check in systems[system].checks)
            {
                checks[system]['checks'][check] = {};
                
                if(check == 'ping')
                    createPingcheck(
                        {
                            host: systems[system].host,
                            system: system,
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
    webui.start(checks);
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

    checks[check.system].checks.ping.interval = setInterval(    
    function(){
        session.pingHost (check.host, function (error, target) {
            if (error)
            {
                checks[check.system].checks.ping.passed = false;
                checks[check.system].checks.ping.status = 'error';            
            }
            else
            {
                checks[check.system].checks.ping.passed = true;
                checks[check.system].checks.ping.status = 'ok';
            }
        });
    }, check.interval);
}




