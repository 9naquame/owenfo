atongo = {
    init : function ()
    {
        atongo.update();
    },
    
    update : function()
    {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
            {
                var response = JSON.parse(xmlhttp.responseText);
                for(var i in response.statuses)
                {
                    response.statuses[i].overall_status = 'ok';
                    for(var j in response.statuses[i].checks)
                    {
                        if(response.statuses[i].checks[j].status == 'error')
                        {
                            response.statuses[i].overall_status = 'error';
                        }
                    }
                }
                
                document.querySelector('#info-cards').innerHTML = Mustache.render(
                    document.querySelector('#info-card-template').innerHTML,
                    response
                );
        
                var container = document.querySelector('#info-cards');
                var msnry = new Masonry(container, {
                    itemSelector: '.info-card',
                    columnWidth: 350
                });
                
                setTimeout("atongo.update()", 3000);
            }
       };
       xmlhttp.open("GET", "statuses", true);
       xmlhttp.send();  
       
    }
};
