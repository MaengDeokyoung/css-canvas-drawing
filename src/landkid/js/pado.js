var adjustedMouseX = 0.5;
var adjustedMouseY = 0.5;
var slideValue = 0.5;
var slideValue1 = 0;
var slideValue2 = 0;
var slideValue3 = 0;

window.onload = function(){
    "use strict";

    var soundAllowed = function (stream) {
        //Audio stops listening in FF without // window.persistAudioStream = stream;
        //https://bugzilla.mozilla.org/show_bug.cgi?id=965483
        //https://support.mozilla.org/en-US/questions/984179
        window.persistAudioStream = stream;
        var audioContent = new AudioContext();
        var audioStream = audioContent.createMediaStreamSource( stream );
        var analyser = audioContent.createAnalyser();
        audioStream.connect(analyser);
        analyser.fftSize = 32;

        var frequencyArray = new Uint8Array(analyser.frequencyBinCount);

        var draw = function() {
            requestAnimationFrame(draw);
            analyser.getByteFrequencyData(frequencyArray);
            // slideValue1 = frequencyArray[0] / 100;
            // slideValue2 = frequencyArray[3] / 100;
            // slideValue3 = frequencyArray[5] / 100;
            slideValue1 = .9;
            slideValue2 = .9;
            slideValue3 = .9;

        };
        draw();

    };

    var soundNotAllowed = function (error) {
        console.log(error);
    };

    navigator.getUserMedia({audio:true}, soundAllowed, soundNotAllowed);

};


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

    window.addEventListener('resize', fitToWindowSize, false);

    function fitToWindowSize(){
        pado.width = window.innerWidth;
        pado.height = window.innerHeight;
    }
    fitToWindowSize();

    var frames = 0;

    var amplitude1;
    var amplitude2;
    var amplitude3;

    function drawAll() {
        requestAnimationFrame(drawAll);

        padoCtx.clearRect(0, 0, pado.width, pado.height);

        if(frames % 120 === 0) {
            amplitude1 = getRandomInt(30, 60);
            amplitude2 = getRandomInt(30, 60);
            amplitude3 = getRandomInt(30, 60);
        } else {

        }

        drawPado(pado.width, pado.height, 47 * (0.1 + slideValue1), 0.005, 7, pado.height / 2, "rgba(0, 255, 0, 0.5)", 19 ,23);
        drawPado(pado.width, pado.height, 59 * (0.1 + slideValue2), 0.007, 5, pado.height / 2, "rgba(255, 0, 0, 0.5)", 17, 37);
        drawPado(pado.width , pado.height, 41 * (0.1 + slideValue3), 0.01, 11, pado.height / 2, "rgba(0, 0, 255, 0.5)", 29, 31);
        frames++;
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
            var endX = firstX - e.clientX;
            var endY = firstY - e.clientY;
            adjustedMouseY = - endY * 20 / (pado.height - 500);
            adjustedMouseX = - endX;
            console.log(adjustedMouseX);
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
            adjustedMouseY = - endY * 40 / (pado.height - 500);
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
            adjustedMouseY++;
        }
    }

    function resetDown(){
        if(adjustedMouseY > 0) {
            requestAnimationFrame(resetDown);
            adjustedMouseY--;
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

