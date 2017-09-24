(function() {

    var typoEl = document.getElementById("typo");
    var ctx = typoEl.getContext("2d");
    window.addEventListener('resize', fitToWindowSize, false);

    var fontSize = typoEl.width / 8 + "px";
    var fontFamily = "Verdana";
    var text = "LOVE";
    var texts = ["LOVE", "HOPE", "ENTHUSIASM", "FEELING"]

    function fitToWindowSize(){
        typoEl.width = window.innerWidth;
        typoEl.height = window.innerHeight;

        fontSize = typoEl.width / 8 + "px";
        fontFamily = "Verdana";

        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillRect(0, 0, typoEl.width, typoEl.height);
    }
    fitToWindowSize();

    var standardInterpolator = function(t){
        return Math.sin(t * Math.PI / 2);
    };

    var anim1 = new AnimationUtil()
        .addTarget(drawText)
        .setInterpolator(standardInterpolator)
        .setDuration(1000);

    var anim2 = new AnimationUtil()
        .addTarget(drawText2)
        .setEndListener(function(){})
        .setStartDelay(400)
        .setInterpolator(standardInterpolator)
        .setDuration(300)
        .setRepeatCount(2);

    var anim3 = new AnimationUtil()
        .addTarget(drawText)
        .setInterpolator(standardInterpolator)
        .setEndListener(function(){})
        .setStartDelay(1400)
        .setDuration(1000);

    function animate(t){
        text = t;
        anim1.setEndListener(function(){
            anim2.setEndListener(function (){
                anim3.setEndListener(function(){
                    //window.location.replace("pado.html");

                }).reverse();
            }).start();
        }).start();
    }

    function drawText(animatedValue){

        ctx.clearRect(0, 0, typoEl.width, typoEl.height);
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillRect(0, 0, typoEl.width, typoEl.height);

        ctx.font = fontSize + " " + fontFamily;
        ctx.fillStyle = "rgba(182, 255, 0, " + 0.8 * animatedValue + ")";
        ctx.textAlign = "center";
        ctx.shadowColor = "#b6ff00";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 10 * animatedValue;
        ctx.fillText(text,
            typoEl.width / 2 + typoEl.width / 150 + 300 * (1 - animatedValue) * Math.cos((30 * animatedValue)),
            typoEl.height / 2);

        ctx.font = fontSize + " " + fontFamily;
        ctx.fontWeight = "bold";
        ctx.fontStyle = "italic";
        ctx.fillStyle = "rgba(255, 0, 250, " + 0.8 * animatedValue + ")";
        ctx.textAlign = "center";
        ctx.shadowColor = "#ff00fa";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 10 * animatedValue;
        ctx.fillText(text,
            typoEl.width / 2 - typoEl.width / 150 - 300 * (1 - animatedValue) * Math.cos((30 * animatedValue)),
            typoEl.height / 2);

        ctx.font = fontSize + " " + fontFamily;
        ctx.fontWeight = "bold";
        ctx.fontStyle = "italic";
        ctx.fillStyle = "rgba(255, 255, 255, " + animatedValue + ")";
        ctx.textAlign = "center";
        ctx.shadowColor = "#fff";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 15 * animatedValue;
        ctx.fillText(text, typoEl.width / 2, typoEl.height / 2);
    }

    function drawText2(animatedValue){

        ctx.clearRect(0, 0, typoEl.width, typoEl.height);
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillRect(0, 0, typoEl.width, typoEl.height);

        ctx.font = fontSize + " " + fontFamily;
        ctx.fillStyle = "rgba(182, 255, 0, " + 0.8 + ")";
        ctx.textAlign = "center";
        ctx.shadowColor = "#b6ff00";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 10;
        ctx.fillText(text,
            typoEl.width / 2 + typoEl.width / 150 + 300 * (1 - animatedValue) * Math.sin((30 * animatedValue)),
            typoEl.height / 2 +  200 * (1 - animatedValue) * Math.cos((30 * animatedValue)));

        ctx.font = fontSize + " " + fontFamily;
        ctx.fontWeight = "bold";
        ctx.fontStyle = "italic";
        ctx.fillStyle = "rgba(255, 0, 250, " + 0.8 + ")";
        ctx.textAlign = "center";
        ctx.shadowColor = "#ff00fa";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 10;
        ctx.fillText(text,
            typoEl.width / 2 - typoEl.width / 150 - 300 * (1 - animatedValue) * Math.sin((30 * animatedValue)),
            typoEl.height / 2 - 200 * (1 - animatedValue) * Math.cos((30 * animatedValue)));

        ctx.font = fontSize + " " + fontFamily;
        ctx.fontWeight = "bold";
        ctx.fontStyle = "italic";
        ctx.fillStyle = "rgba(255, 255, 255, " + 1 + ")";
        ctx.textAlign = "center";
        ctx.shadowColor = "#fff";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 15;
        ctx.fillText(text, typoEl.width / 2, typoEl.height / 2);
    }
    var index = 0;
    typoEl.addEventListener("click", function(e){
        if(!anim1.isRunning && !anim2.isRunning && !anim3.isRunning) {
            if (index < texts.length) {
                animate(texts[index]);
                index++;
            }
        }
    }, false);

    //animate("LANDKID");

})();