atongo = {
    init : function ()
    {
        var container = document.querySelector('#info-cards');
        console.log(container);
        var msnry = new Masonry( container, {
          // options...
          itemSelector: '.info-card',
          columnWidth: 350
        });
        atongo.update();
    },
    
    update : function()
    {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
           if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.querySelector('#info-cards').innerHTML = Mustache.render(
                    document.querySelector('#info-card-template').innerHTML, 
                    JSON.parse(xmlhttp.responseText)
                );
                console.log(JSON.parse(xmlhttp.responseText));
                setTimeout("atongo.update()", 3000);
           }
       };
       xmlhttp.open("GET", "statuses", true);
       xmlhttp.send();        
    }
};
