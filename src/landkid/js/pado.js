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
            slideValue1 = frequencyArray[0] / 200;
            slideValue2 = frequencyArray[5] / 200;
            slideValue3 = frequencyArray[10] / 200;
            console.log(frequencyArray);

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
        padoCtx.clearRect(0, 0, pado.width, pado.height);

        if(frames % 120 === 0) {
            amplitude1 = getRandomInt(30, 60);
            amplitude2 = getRandomInt(30, 60);
            amplitude3 = getRandomInt(30, 60);
        } else {

        }

        drawPado(pado.width, pado.height, 47 * (0.5 + slideValue1), 0.005, 7, 500, "rgba(0, 0, 255, 0.5)", 19 ,23);
        drawPado(pado.width, pado.height, 59 * (0.5 + slideValue2), 0.007, 5, 500, "rgba(255, 0, 0, 0.5)", 17, 37);
        drawPado(pado.width , pado.height, 31 * (0.5 + slideValue3), 0.01, 11, 500, "rgba(0, 255, 0, 0.5)", 29, 31);
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
            cycleValue = Math.sin(frames / k1);
            cycleValue2 = Math.sin(frames / k2 * Math.PI);
            for (let x = 0; x < w; x++) {
                y = Math.sin(x * frequency - frames / 10) * amplitude * cycleValue2;
                padoCtx.lineTo(x, y + (adjustedOffset + vibrate * cycleValue));
            }

            padoCtx.lineTo(w, h);
            padoCtx.lineTo(0, h);
            padoCtx.fill();
        }

        drawPado();
    }

    setInterval(drawAll, 30);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

})();

