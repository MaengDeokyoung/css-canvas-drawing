const canvasPracticeBg = document.getElementById("practice_background"),
    ctxBg = canvasPracticeBg.getContext("2d");


const drawAll = () => {
    drawBackgroundShadow(10, "rgb(200, 200, 200)", 100, 200, 10, 10);
    drawBackground(10, "black", 100, 200);
    drawImages();
};

let images = [];

class ImageDrawing {
    constructor(options = {}){
        this.src = options.src;
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.height = options.height;
    }
}

const drawImages = () => {

    for(let i = 0; i < images.length ; i++){
        const imgDwg = images[i];
        const img = new Image();
        img.onload = () => {
            console.log(img.width, img.height);
            ctxBg.drawImage(img, imgDwg.x, imgDwg.y, imgDwg.width, imgDwg.height);
        };
        img.src = imgDwg.src;
    }
};

const drawBackground = (width, color, rowGap, colGap) => {
    ctxBg.beginPath();

    ctxBg.shadowColor="rgb(200,200,200)";

    let [objectWidth, objectHeight] = [canvasPracticeBg.width - objectPadding * 2, canvasPracticeBg.height - objectPadding * 2];

    const colNum = Math.floor(objectWidth / (colGap + width));
    const rowNum = Math.floor(objectHeight / (rowGap + width));

    for(let i = 0 ; i < colNum ; i++){
        ctxBg.rect(objectPadding + i * width + (i + 1) * colGap, objectPadding, width, objectHeight);
        ctxBg.fillStyle = "black";
        ctxBg.fill();
    }

    for(let i = 0 ; i < rowNum ; i++){
        ctxBg.rect(objectPadding, objectPadding +  i * width + (i + 1) * rowGap, objectWidth, width);
        ctxBg.fillStyle = color;
        ctxBg.fill();
    }

    ctxBg.roundRect("rgb(0, 0, 0)", width, 20, objectPadding, objectPadding, objectWidth, objectHeight);

};

const drawBackgroundShadow = (width, color, rowGap, colGap, shadowOffsetX, shadowOffsetY) => {
    ctxBg.beginPath();
    let [objectWidth, objectHeight] = [canvasPracticeBg.width - objectPadding * 2, canvasPracticeBg.height - objectPadding * 2];

    const colNum = Math.floor(objectWidth / (colGap + width));
    const rowNum = Math.floor(objectHeight / (rowGap + width));

    for(let i = 0 ; i < colNum ; i++){
        ctxBg.rect(shadowOffsetX + objectPadding + i * width + (i + 1) * colGap, shadowOffsetY + objectPadding, width, objectHeight);
        ctxBg.fillStyle = "black";
        ctxBg.fill();
    }

    for(let i = 0 ; i < rowNum ; i++){
        ctxBg.rect(shadowOffsetX + objectPadding, shadowOffsetY + objectPadding +  i * width + (i + 1) * rowGap, objectWidth, width);
        ctxBg.fillStyle = color;
        ctxBg.fill();
    }

    ctxBg.roundRect("rgb(200, 200, 200)", width, 20, shadowOffsetX + objectPadding, shadowOffsetY + objectPadding, objectWidth, objectHeight);
    ctxBg.restore();

};

ctxBg.roundRect = (color, strokeWidth, radius, x, y, width, height) => {

    ctxBg.beginPath();
    ctxBg.arc(x + radius, y + radius, radius, Math.PI, 3 * Math.PI / 2);

    ctxBg.moveTo(x + radius, y);
    ctxBg.lineTo(x + width - radius, y);

    ctxBg.arc(x + width - radius, y + radius, radius, 3 * Math.PI / 2, 2 * Math.PI);

    ctxBg.moveTo(x + width, y + radius);
    ctxBg.lineTo(x + width, y + height - radius);

    ctxBg.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2);

    ctxBg.moveTo(x + width - radius, y + height);
    ctxBg.lineTo(x + radius, y + height);

    ctxBg.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI);

    ctxBg.moveTo(x, y + height - radius);
    ctxBg.lineTo(x, y + radius);

    ctxBg.strokeStyle = color;
    ctxBg.lineWidth = strokeWidth;
    ctxBg.stroke();
};