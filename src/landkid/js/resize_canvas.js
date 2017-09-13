(() => {

    window.addEventListener('resize', fitToWindowSize, false);

    function fitToWindowSize(){
        canvasPracticeBg.width = window.innerWidth;
        canvasPracticeBg.height = window.innerHeight;

        canvasPractice.width = window.innerWidth;
        canvasPractice.height = window.innerHeight;
        drawAll();
        drawAllMask();
    }
    fitToWindowSize();
})();