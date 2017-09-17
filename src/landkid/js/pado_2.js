(() => {

    const pado = document.getElementById('pado'),
        padoCtx = pado.getContext('2d');

    window.addEventListener('resize', fitToWindowSize, false);

    function fitToWindowSize(){

    }
    fitToWindowSize();

    var y;
    var cycleValue;
    var w = pado.width + 20;
    var h = pado.height + 20;
    var amplitude = 30;
    var frequency = 0.03;
    var frames = 0;
    var vibrate = 50;
    var offset = 500;

    function drawPado() {
        frames++;
        var adjustedOffset = offset - amplitude - vibrate;
        padoCtx.fillStyle = "blue";
        padoCtx.clearRect(0, 0, w, h);
        padoCtx.beginPath();
        padoCtx.moveTo(0, h);
        // padoCtx.lineTo(0, 300);
        // padoCtx.bezierCurveTo(300 + frames, 300, w/2 + frames, 500, w + frames,  300);
        cycleValue = Math.sin(frames / 20);
        for(let x = 0 ; x < w ; x++){
            y = Math.sin(x * frequency - frames / 10) * amplitude;
            padoCtx.lineTo(x, y + (adjustedOffset + vibrate * cycleValue));
        }

        padoCtx.lineTo(w, h);
        padoCtx.lineTo(0, h);
        padoCtx.fill();
    }

    setInterval(drawPado, 30);

})();

