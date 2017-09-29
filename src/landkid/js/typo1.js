(function() {

    var typoEl = document.getElementById("typo");
    var ctx = typoEl.getContext("2d");
    window.addEventListener('resize', fitToWindowSize, false);

    var fontSize = typoEl.width / 8 + "px";
    var fontFamily = "Verdana";
    var text = "LOVE";
    var texts = ["HELLO!", "ARE", "YOU", "READY?", "5", "4", "3", "2", "1", "GO!!"];

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

    var anim1 = AnimationUtil()
        .addTarget(drawText)
        .setInterpolator(standardInterpolator)

    var anim2 = AnimationUtil()
        .addTarget(drawText2)
        .setEndListener(function(){})
        .setInterpolator(standardInterpolator)
        .setRepeatCount(1);

    var anim3 = AnimationUtil()
        .addTarget(drawText)
        .setInterpolator(standardInterpolator)
        .setEndListener(function(){});

    var index = 0;
    var intervalId;

    function animate(){
        text = texts[index];

        if(index >= texts.length){
            clearInterval(intervalId);
        }
        if(index === 0){
            intervalId = setInterval(animate, 4000);
        }
        if(index === 4){
            clearInterval(intervalId);
            intervalId = setInterval(animate, 1000);
        }
        if(index === 9){
            clearInterval(intervalId);
            intervalId = setInterval(animate, 6000);
        }
        if(index <= 3){
            anim1.setEndListener(function(){
                anim2.setEndListener(function (){
                    anim3.setEndListener(function(){
                        if(index >= texts.length){

                        }
                    }).setStartDelay(1400).setDuration(1000).reverse();
                }).setStartDelay(400).setDuration(200).setRepeatCount(1).start();
            }).setStartDelay(0).setDuration(1000).start();
        } else if(index <= 8){
            anim1.setEndListener(function(){
                anim3.setEndListener(function(){
                    if(index >= texts.length){

                    }
                }).setStartDelay(0).setDuration(500).reverse();
            }).setStartDelay(0).setDuration(500).start();

        } else {
            anim1.setEndListener(function(){
                anim2.setEndListener(function (){
                    anim3.setEndListener(function(){
                        if(index >= texts.length){
                            clearInterval(intervalId);
                            index = 0;
                        }
                    }).setStartDelay(8000).setDuration(500).reverse();
                }).setStartDelay(200).setDuration(200).setRepeatCount(10).start();
            }).setStartDelay(0).setDuration(1000).start();
        }

        index++;
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
    typoEl.addEventListener("click", function(e){
        if(!anim1.isRunning && !anim2.isRunning && !anim3.isRunning) {
            if (index < texts.length) {
                animate();
            }
        }
    }, false);

    //animate("LANDKID");

})();