var countdownDate = new Date("May 30, 2021 00:00:00").getTime();

var countdownFunc = window.setInterval(function ( ){
    
    var now = new Date().getTime();
    var distance = countdownDate - now;
    
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / (1000));

    window.document.getElementById("demo").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s";

    if (distance < 0) {
        window.clearInterval(countdownFunc);
        window.document.getElementById("demo").innerHTML = "EXPIRED";
    }
},1000); //countdownFunc
