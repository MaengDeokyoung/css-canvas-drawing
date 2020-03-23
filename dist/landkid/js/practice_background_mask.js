const canvasPracticeBgMask = document.getElementById("practice_background_mask"),
    ctxBgMask = canvasPracticeBgMask.getContext("2d");

let dx = 0;
let dy = 0;

ctxBgMask.scale(2, 2);

let imagesMask = [];

const drawImagesMask = () => {

    for(let i = 0; i < imagesMask.length ; i++){
        const imgDwg = imagesMask[i];
        const img = new Image();
        img.src = imgDwg.src;
        ctxBgMask.drawImage(img, imgDwg.x + dx, imgDwg.y + dy, imgDwg.width, imgDwg.height);
    }
};

const image1 = new Image();
image1.src = "../img/lego_people_1.png";

const image2 = new Image();
image2.src = "../img/lion.gif";


const drawEasterEgg = () => {
    ctxBgMask.fillText("google", objectPadding + 630 + dx, 100 + dy);
    // ctxBgMask.drawImage(image1, objectPadding + 330 + dx, 400 + dy, image1.width, image1.height);
    // ctxBgMask.drawImage(image2, objectPadding + 220 + dx, 300 + dy, image2.width, image2.height);
};

const drawMagnifyingGlass = (x, y) => {
    ctxBgMask.clearRect(dx, dy, canvasPracticeBg.width, canvasPracticeBg.height);
    dx = (2 * x - radius) / 2;
    dy = (2 * y - radius) / 2;
    drawAllMask();
};

const drawAllMask = () => {
    ctxBgMask.beginPath();
    ctxBgMask.rect(0, 0, canvasPracticeBgMask.width, canvasPracticeBgMask.height);
    ctxBgMask.fillStyle = "white";
    ctxBgMask.fill();

    drawBackgroundShadowMask(10, "rgb(200, 200, 200)", 100, 200, 10, 10);
    drawBackgroundMask(10, "black", 100, 200);
    drawImagesMask();
    drawEasterEgg();
};

const drawBackgroundMask = (width, color, rowGap, colGap) => {
    ctxBgMask.beginPath();

    ctxBgMask.shadowColor="rgb(200,200,200)";

    let [objectWidth, objectHeight] = [canvasPracticeBg.width - objectPadding * 2, canvasPracticeBg.height - objectPadding * 2];

    const colNum = Math.floor(objectWidth / (colGap + width));
    const rowNum = Math.floor(objectHeight / (rowGap + width));

    for(let i = 0 ; i < colNum ; i++){
        ctxBgMask.rect(dx + objectPadding + i * width + (i + 1) * colGap, dy + objectPadding, width, objectHeight);
        ctxBgMask.fillStyle = "black";
        ctxBgMask.fill();
    }

    for(let i = 0 ; i < rowNum ; i++){
        ctxBgMask.rect(dx + objectPadding, dy + objectPadding +  i * width + (i + 1) * rowGap, objectWidth, width);
        ctxBgMask.fillStyle = color;
        ctxBgMask.fill();
    }

    ctxBgMask.roundRect("rgb(0, 0, 0)", width, 20, dx + objectPadding, dy + objectPadding, objectWidth, objectHeight);
};

const drawBackgroundShadowMask = (width, color, rowGap, colGap, shadowOffsetX, shadowOffsetY) => {
    ctxBgMask.beginPath();
    let [objectWidth, objectHeight] = [canvasPracticeBg.width - objectPadding * 2, canvasPracticeBg.height - objectPadding * 2];

    const colNum = Math.floor(objectWidth / (colGap + width));
    const rowNum = Math.floor(objectHeight / (rowGap + width));

    for(let i = 0 ; i < colNum ; i++){
        ctxBgMask.rect(dx + shadowOffsetX + objectPadding + i * width + (i + 1) * colGap, dy + shadowOffsetY + objectPadding, width, objectHeight);
        ctxBgMask.fillStyle = "black";
        ctxBgMask.fill();
    }

    for(let i = 0 ; i < rowNum ; i++){
        ctxBgMask.rect(dx + shadowOffsetX + objectPadding, dy + shadowOffsetY + objectPadding +  i * width + (i + 1) * rowGap, objectWidth, width);
        ctxBgMask.fillStyle = color;
        ctxBgMask.fill();
    }

    ctxBgMask.roundRect("rgb(200, 200, 200)", width, 20, dx + shadowOffsetX + objectPadding, dy + shadowOffsetY + objectPadding, objectWidth, objectHeight);
    ctxBgMask.restore();

};

ctxBgMask.roundRect = (color, strokeWidth, radius, x, y, width, height) => {

    ctxBgMask.beginPath();
    ctxBgMask.arc(x + radius, y + radius, radius, Math.PI, 3 * Math.PI / 2);

    ctxBgMask.moveTo(x + radius, y);
    ctxBgMask.lineTo(x + width - radius, y);

    ctxBgMask.arc(x + width - radius, y + radius, radius, 3 * Math.PI / 2, 2 * Math.PI);

    ctxBgMask.moveTo(x + width, y + radius);
    ctxBgMask.lineTo(x + width, y + height - radius);

    ctxBgMask.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2);

    ctxBgMask.moveTo(x + width - radius, y + height);
    ctxBgMask.lineTo(x + radius, y + height);

    ctxBgMask.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI);

    ctxBgMask.moveTo(x, y + height - radius);
    ctxBgMask.lineTo(x, y + radius);

    ctxBgMask.strokeStyle = color;
    ctxBgMask.lineWidth = strokeWidth;
    ctxBgMask.stroke();
};
