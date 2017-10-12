var adjustedMouseX = 0.5;
var adjustedMouseY = 0.5;
var slideValue = 0.5;
var slideValue1 = 0;
var slideValue2 = 0;
var slideValue3 = 0;

// window.onload = function(){
//     "use strict";
//
//     var soundAllowed = function (stream) {
//         //Audio stops listening in FF without // window.persistAudioStream = stream;
//         //https://bugzilla.mozilla.org/show_bug.cgi?id=965483
//         //https://support.mozilla.org/en-US/questions/984179
//         window.persistAudioStream = stream;
//         var audioContent = new AudioContext();
//         var audioStream = audioContent.createMediaStreamSource( stream );
//         var analyser = audioContent.createAnalyser();
//         audioStream.connect(analyser);
//         analyser.fftSize = 32;
//
//         var frequencyArray = new Uint8Array(analyser.frequencyBinCount);
//
//         var draw = function() {
//             requestAnimationFrame(draw);
//             analyser.getByteFrequencyData(frequencyArray);
//             // slideValue1 = frequencyArray[0] / 100;
//             // slideValue2 = frequencyArray[1] / 100;
//             // slideValue3 = frequencyArray[2] / 100;
//             slideValue1 = .9;
//             slideValue2 = .9;
//             slideValue3 = .9;
//
//         };
//         draw();
//
//     };
//
//     var soundNotAllowed = function (error) {
//         slideValue1 = .9;
//         slideValue2 = .9;
//         slideValue3 = .9;
//         console.log(error);
//     };
//
//     navigator.getUserMedia({audio:true}, soundAllowed, soundNotAllowed);
//
// };

slideValue1 = .9;
slideValue2 = .9;
slideValue3 = .9;

(() => {

    $(".slider").slider({
        animate: "fast",
        max: 3,
        min: 0.5,
        step: 0.01
    });


    OPUS.select(".slider-label").execute(function(object){
        object.innerHTML = slideValue;
        $(".slider").on("slide", function(e, ui){
            object.innerHTML = ui.value;
            slideValue = ui.value;
        });
    });

    const pado = document.getElementById('pado'),
        padoCtx = pado.getContext('2d');

    const moon = document.getElementById('moon'),
        moonCtx = moon.getContext('2d');

    window.addEventListener('resize', fitToWindowSize, false);

    function fitToWindowSize(){
        pado.width = window.innerWidth;
        pado.height = window.innerHeight;
        moon.width = window.innerWidth;
        moon.height = window.innerHeight;
    }
    fitToWindowSize();

    var frames = 0;

    var amplitude1;
    var amplitude2;
    var amplitude3;

    var randomX = getRandomInt(0, moon.width);
    var randomY = getRandomInt(0, pado.height * 3 / 4);
    var randomRd = getRandomInt(2, 5);

    var random = {
        randomX: [],
        randomY: [],
        randomRd: []
    }

    for(var i = 0 ; i < 200 ; i++){
        random.randomX.push(getRandomInt(0, moon.width));
        random.randomY.push(getRandomInt(0, pado.height));
        random.randomRd.push(getRandomInt(2, 3));
    }

    function drawAll() {
        requestAnimationFrame(drawAll);

        padoCtx.clearRect(0, 0, pado.width, pado.height);
        moonCtx.clearRect(0, 0, moon.width, moon.height);

        if(frames % 120 === 0) {
            amplitude1 = getRandomInt(30, 60);
            amplitude2 = getRandomInt(30, 60);
            amplitude3 = getRandomInt(30, 60);


        } else {

        }
        drawMoon();

        for(var i = 0 ; i < 200 ; i++){
            drawStar(random.randomX[i] + Math.cos(frames / 40), random.randomY[i] + Math.sin(frames / 40), random.randomRd[i]);
        }

        drawPado(pado.width, pado.height, 47 * (0.1 + slideValue1), 0.005, 7, pado.height * 3 / 4, "rgba(17, 147, 173, 0.5)", 19 ,23);
        drawPado(pado.width, pado.height, 59 * (0.1 + slideValue2), 0.007, 5, pado.height * 3 / 4, "rgba(103, 199, 234, 0.5)", 17, 37);
        drawPado(pado.width , pado.height, 41 * (0.1 + slideValue3), 0.01, 11, pado.height * 3 / 4, "rgba(77, 224, 204, 0.5)", 29, 31);

        // drawPado(pado.width, pado.height, 47 * (0.1 + slideValue1), 0.005, 7, pado.height * 1 / 4, "rgba(139, 249, 171, 0.8)", 19 ,23);
        // drawPado(pado.width, pado.height, 59 * (0.1 + slideValue2), 0.007, 5, pado.height * 1 / 4, "rgba(103, 199, 234, 0.8)", 17, 37);
        // drawPado(pado.width , pado.height, 41 * (0.1 + slideValue3), 0.01, 11, pado.height * 1 / 4, "rgba(212, 66, 244, 0.8)", 29, 31);
        // drawPado(pado.width , pado.height, 33 * (0.1 + slideValue3), 0.013  , 11, pado.height * 1 / 4, "rgba(0, 0, 0, 1)", 29, 31);
        frames++;
    }

    function drawMoon(){
        moonCtx.beginPath();
        moonCtx.arc(moon.width / 2 + Math.cos(frames / 1500) * (moon.width / 2 - 200), 200 + Math.cos(frames / 40) * 5, 100, 0, 2 * Math.PI, false);
        moonCtx.fillStyle = "hsl(60, " + (93 + Math.cos(frames / 23 ) * 7) + "%, " + (97 + Math.sin(frames / 53) * 3) +"%)";
        moonCtx.shadowColor = "#fff";
        moonCtx.shadowOffsetX = 0;
        moonCtx.shadowOffsetY = 0;
        moonCtx.shadowBlur = 50;
        moonCtx.fill();
    }

    function drawStar(x, y, radius){
        moonCtx.beginPath();
        moonCtx.arc(x, y, radius, 0, 2 * Math.PI, false);
        moonCtx.fillStyle = "hsl(60, " + (80 + Math.cos(frames / 10) * 7) + "%, " + (87 + Math.sin(frames / 20) * 3) +"%)";
        moonCtx.shadowColor = "#fff";
        moonCtx.shadowOffsetX = 0;
        moonCtx.shadowOffsetY = 0;
        moonCtx.shadowBlur = 5;
        moonCtx.fill();
    }

    function drawPado(width, height, amplitude, frequency, vibrate, offset, color, k1, k2) {

        var y;
        var cycleValue;
        var cycleValue2;
        var w = width;
        var h = height;
        var amplitude = amplitude;
        var frequency = frequency;
        var vibrate = vibrate;
        var offset = offset;

        function drawPado() {
            var adjustedOffset = offset - amplitude - vibrate;
            padoCtx.fillStyle = color;
            padoCtx.beginPath();
            padoCtx.moveTo(0, h);
            // padoCtx.lineTo(0, 300);
            // padoCtx.bezierCurveTo(300 + frames, 300, w/2 + frames, 500, w + frames,  300);
            cycleValue = Math.sin(frames / k1 / 3);
            cycleValue2 = Math.sin(frames / k2 / 3 * Math.PI);
            for (let x = 0; x < w; x++) {
                y = Math.sin(x * frequency - frames / 20) * amplitude * cycleValue2 * slideValue;
                y = y - ((x > adjustedMouseX && x < w + adjustedMouseX) ? (10 * Math.cos((x - adjustedMouseX) / width * 2 * Math.PI) - 10) * adjustedMouseY : 0);
                //var interpolation = f(width / 2, 1);
                //y = y * (1 + interpolation(x));
                padoCtx.lineTo(x, y + (adjustedOffset + vibrate * cycleValue));
            }

            //Math.cos(x / width * 2 * Math.PI) + 1;

            padoCtx.lineTo(w, h);
            padoCtx.lineTo(0, h);
            padoCtx.shadowColor = "#fff";
            padoCtx.shadowOffsetX = 0;
            padoCtx.shadowOffsetY = 0;
            padoCtx.shadowBlur = 0;
            padoCtx.fill();
        }

        drawPado();
    }


    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function f(m, p){
        return function(x){
            return 1 / Math.sqrt(2 * Math.PI * p * p) * Math.pow(Math.E, - Math.pow((x - m), 2) / (2 * Math.pow(p, 2)));
        }
    }

    drawAll();

    var firstX = 0;
    var firstY = 0;
    var isMouseDown = false;

    pado.addEventListener('mousedown', function(e){
        isMouseDown = true;
        firstX = e.clientX;
        firstY = e.clientY;
        cancelAnimationFrame(resetUp);
        cancelAnimationFrame(resetDown);
    }, false);

    pado.addEventListener('mousemove', function(e){
        if(isMouseDown){
            var endX = pado.width / 2 - e.clientX;
            var endY = firstY - e.clientY;
            adjustedMouseY = - endY * 20 / (pado.height / 4);
            adjustedMouseX = - endX;
        }
    }, false);

    pado.addEventListener('mouseup', function(e){
        isMouseDown = false;
        if(adjustedMouseY < 0) {
            resetUp();
        }
        if(adjustedMouseY > 0) {
            resetDown();
        }

        if(adjustedMouseX < 0) {
            resetLeft();
        }
        if(adjustedMouseX > 0) {
            resetRight();
        }
        console.log("in2")

    }, false);

    pado.addEventListener('mouseout', function(e){
        isMouseDown = false;
        if(adjustedMouseY < 0) {
            resetUp();
        }
        if(adjustedMouseY > 0) {
            resetDown();
        }

        if(adjustedMouseX < 0) {
            resetLeft();
        }
        if(adjustedMouseX > 0) {
            resetRight();
        }
        console.log("in1")
    }, false);

    pado.addEventListener('touchstart', function(e){
        isMouseDown = true;
        firstX = e.touches[0].clientX;
        firstY = e.touches[0].clientY;
        cancelAnimationFrame(resetUp);
        cancelAnimationFrame(resetDown);
    }, false);

    pado.addEventListener('touchmove', function(e){
        if(isMouseDown){
            var endX = firstX - e.touches[0].clientX;
            var endY = firstY - e.touches[0].clientY;
            adjustedMouseY = - endY * 20 / (pado.height / 4);
            adjustedMouseX = - endX;
            console.log(adjustedMouseX);
        }
    }, false);

    pado.addEventListener('touchend', function(e){
        isMouseDown = false;
        if(adjustedMouseY < 0) {
            resetUp();
        }
        if(adjustedMouseY > 0) {
            resetDown();
        }

        if(adjustedMouseX < 0) {
            resetLeft();
        }
        if(adjustedMouseX > 0) {
            resetRight();
        }
    }, false);


    function resetUp(){
        if(adjustedMouseY < 0) {
            requestAnimationFrame(resetUp);
            adjustedMouseY+=2;
        }
    }

    function resetDown(){
        if(adjustedMouseY > 0) {
            requestAnimationFrame(resetDown);
            adjustedMouseY-=2;
        }
    }

    function resetLeft(){
        if(adjustedMouseX < 0) {
            requestAnimationFrame(resetLeft);
            adjustedMouseX += 10;
        }
    }

    function resetRight(){
        if(adjustedMouseX > 0) {
            requestAnimationFrame(resetRight);
            adjustedMouseX-= 10;
        }
    }


})();

