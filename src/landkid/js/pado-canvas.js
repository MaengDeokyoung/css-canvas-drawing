(() => {

    var pado = document.getElementById('pado'),
        padoCtx = pado.getContext('2d');

    window.addEventListener('resize', fitToWindowSize, false);
    function fitToWindowSize(){
        var parentEl = pado.parentElement;
        var parentStyle = getComputedStyle(parentEl);
        pado.width = parseInt(parentStyle.width);
        pado.height = parseInt(parentStyle.height);
    }
    fitToWindowSize();

    var frames = 0;

    var amplitude1;
    var amplitude2;
    var amplitude3;

    function drawAll() {
        requestAnimationFrame(drawAll);

        padoCtx.clearRect(0, 0, pado.width, pado.height);

        drawPado(pado.width, pado.height, 11, 0.005, 7, pado.height * 4 / 5, "rgba(17, 147, 173, 0.5)", 19 ,23);
        drawPado(pado.width, pado.height, 13, 0.007, 5, pado.height * 4 / 5, "rgba(103, 199, 234, 0.5)", 17, 37);
        drawPado(pado.width , pado.height, 17, 0.01, 11, pado.height * 4 / 5, "rgba(77, 224, 204, 0.5)", 29, 31);

        // drawPado(pado.width, pado.height, 47 * (0.1 + slideValue1), 0.005, 7, pado.height * 1 / 4, "rgba(139, 249, 171, 0.8)", 19 ,23);
        // drawPado(pado.width, pado.height, 59 * (0.1 + slideValue2), 0.007, 5, pado.height * 1 / 4, "rgba(103, 199, 234, 0.8)", 17, 37);
        // drawPado(pado.width , pado.height, 41 * (0.1 + slideValue3), 0.01, 11, pado.height * 1 / 4, "rgba(212, 66, 244, 0.8)", 29, 31);
        // drawPado(pado.width , pado.height, 33 * (0.1 + slideValue3), 0.013  , 11, pado.height * 1 / 4, "rgba(0, 0, 0, 1)", 29, 31);
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
            cycleValue = Math.sin(frames / k1 / 3);
            cycleValue2 = Math.sin(frames / k2 / 3 * Math.PI);
            for (let x = 0; x < w; x++) {
                y = Math.sin(x * frequency - frames / 20) * amplitude * cycleValue2;
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

    drawAll();

})();

