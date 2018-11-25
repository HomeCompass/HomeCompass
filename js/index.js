
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

var canvas  = document.querySelector('.canvas'),
    context = canvas.getContext('2d');

var stars = [];
var clouds = [];


function createCloud(position){
    var cloud = new Object();
    cloud.x       = 10;
    cloud.y       = Math.random()*300+25;
    cloud.speed   = position;
    cloud.size    = Math.random()*3+3.8;
    if( cloud.speed < 40)
        cloud.opacity = cloud.speed*0.025;
    else if (cloud.speed > 380 )
        cloud.opacity = (420-cloud.speed)*0.025;
    else
        cloud.opacity = 1;
    clouds.push(cloud);
}

function createStars(){
    for (var i = 0; i < 80; i ++ ){
        var star = new Object();
        do{
            star.x = Math.random()*345 + 112.5;
            star.y = Math.random()*345 + 37.5;
        } while ( (star.x-300)*(star.x-300) + (star.y-225)*(star.y-225) > (172.5*172.5) ) /*Check if the coordonates are in the circle*/
        star.r = Math.random()*2;
        stars.push(star);
    }
}

// INITIALS CLOUDS AND STARS
createCloud(0);
createCloud(60);
createCloud(120);
createCloud(180);
createCloud(240);
createCloud(300);
createStars();


/*
**  DRAW AT EVERY LOOP
*/

function draw(){

    context.clearRect(0,0,600,450);

    /**
    * BACKGROUND
    **/

    // BACKGROUND SKY
    
    //CLOUDS
    for (var i = 0; i < clouds.length; i++)
    {
        context.globalAlpha = 1;
        var cloud = clouds[i];
        cloud.speed += 1;
        if (cloud.speed <= 40){
            cloud.opacity += 0.025;
        }
        if (cloud.speed >= 380) {
            cloud.opacity -= 0.025;
        };
        if (cloud.opacity > 0.024){
            var x = cloud.x,
            y = cloud.y,
            m = cloud.size;
            s = cloud.speed;
            context.globalAlpha = cloud.opacity;
            context.beginPath();
            context.fillStyle = '#f7efc1';
            context.arc( (x+1)*m+s , y , (x-9)*m , Math.PI/2 , 3*Math.PI/2 );
            context.lineTo ( (x+3)*m+s , y-(1*m) ) ;
            context.arc( (x+4.5)*m+s , y ,(x-7)*m , Math.PI , Math.PI*2 );
            context.lineTo( (x+6)*m+s , y-(1*m) );
            context.lineTo( (x+8)*m+s , y-(1*m) );
            context.arc( (x+8)*m+s , y , (x-9)*m , 3*Math.PI/2 , 5*Math.PI/2 );
            context.lineTo( (x+1)*m+s , y+(1*m) );
            context.fill();
            context.beginPath();
            context.fillStyle = '#eae1a3';
            context.arc( (x+1)*m+s , y , (x-9)*m , Math.PI/2 , 3*Math.PI/2 );
            context.lineTo ( (x+3)*m+s , y-(1*m) ) ;
            context.arc( (x+3)*m+s , y-(1*m) ,(x-9)*m , Math.PI , Math.PI*2 );
            context.lineTo( (x+3)*m+s , y-(1*m) );
            context.lineTo( (x+5)*m+s , y-(1*m) );
            context.arc( (x+5)*m+s , y , (x-9)*m , 3*Math.PI/2 , 5*Math.PI/2 );
            context.lineTo( (x+1)*m+s , y+(1*m) );
            context.fill();
        }
        else {
            clouds.splice(i,1);
            createCloud(0);
        }
    }

  
}


function loop() {
    window.requestAnimationFrame(loop);
    draw();
    console.log('loop');
}

loop();