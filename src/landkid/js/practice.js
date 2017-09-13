
const canvasPractice = document.getElementById("practice"),
    ctx = canvasPractice.getContext("2d");

const radius = 100,
    fraction = 5;

const scope = document.getElementById("scope");

const blocks = [];

class Block{

    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    setBound(width, height){
        this.width = width;
        this.height = height;
    }
}

class Ball{
    constructor(x, y){
        this.dx = 1;
        this.dy = 1;
        this.xpt = x;
        this.ypt = y;
        this.bound = new Block(this.xpt, this.ypt, radius * 2, radius * 2);
    }

    draw(){
        this.checkEdge(blocks);

        this.xpt += fraction * this.dx;
        this.ypt += fraction * this.dy;

        this.bound.setBound(this.xpt, this.ypt);

        ctx.beginPath();
        ctx.arc(radius + this.xpt, radius + this.ypt, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgb(200, 200, 200)";
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.restore();

        scope.style.top = this.ypt + "px";
        scope.style.left = this.xpt + "px";
        drawMagnifyingGlass( - this.xpt, - this.ypt);
    };

    checkEdge(blocks){
        if(radius * 2 + this.xpt > canvasPractice.width){
            this.dx = -1;
        }
        if(this.xpt < 0){
            this.dx = 1;
        }
        if(radius * 2 + this.ypt > canvasPractice.height){
            this.dy = -1;
        }
        if(this.ypt < 0){
            this.dy = 1;
        }

        // if(blocks !== undefined && blocks.length > 0){
        //     for(let i = 0 ; i < blocks.length ; i++){
        //         const block = blocks[i];
        //
        //         if(radius * 2 + this.xpt > block.x
        //             && this.xpt < block.x + block.width
        //             && radius * 2 + this.ypt > block.y
        //             && this.ypt < block.y + block.height) {
        //             if(radius * 2 + this.xpt - fraction <= block.x) {
        //                 this.dx = -1;
        //             }
        //
        //             if(this.xpt + fraction >= block.x + block.width) {
        //                 this.dx = 1;
        //             }
        //
        //             if(radius * 2 + this.ypt - fraction <= block.y) {
        //                 this.dy = -1;
        //             }
        //
        //             if(this.ypt + fraction >= block.y + block.height) {
        //                 this.dy = 1;
        //             }
        //         }
        //     }
        // }
    };
}

const ball = new Ball(0, 0);
const balls = [ball];

const draw = () => {

    ctx.clearRect(0, 0, canvasPractice.width, canvasPractice.height);

    drawBlocks(blocks);

    if(balls !== undefined && balls.length > 0){
        for(let i = 0 ; i < balls.length ; i++){
            balls[i].draw();
        }
    }
};

const drawBlocks = (blocks) => {
    if(blocks !== undefined && blocks.length > 0){
        for(let i = 0 ; i < blocks.length ; i++){
            const block = blocks[i];
            ctx.beginPath();
            ctx.rect(block.x, block.y, block.width, block.height);
            ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
            ctx.lineWidth = 5;
            ctx.stroke();
            ctx.restore();
        }
    }
};

setInterval(draw, 33);

let x, y;
let isMouseDown = false;

canvasPractice.addEventListener('mousedown', (e) => {

    if(e.clientX < objectPadding ||
        e.clientX > canvasPractice.width - objectPadding ||
        e.clientY < objectPadding ||
        e.clientY > canvasPractice.height - objectPadding){

    } else {

        isMouseDown = true;
        x = e.clientX;
        y = e.clientY;

        const block = new Block(x, y, 0, 0);
        blocks.push(block);
    }
});

canvasPractice.addEventListener('mousemove', (e) => {
    if(e.clientX < objectPadding ||
        e.clientX > canvasPractice.width - objectPadding ||
        e.clientY < objectPadding ||
        e.clientY > canvasPractice.height - objectPadding){

    } else {
        if (isMouseDown) {
            const block = blocks[blocks.length - 1];
            block.setBound(e.clientX - x, e.clientY - y);
        }
    }
});

let index = 0;

canvasPractice.addEventListener('mouseup', (e) => {
    isMouseDown = false;

    const block = blocks[blocks.length - 1];

    const newImgDwg = new ImageDrawing({
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTKtYBBr8doTiJ7TjTwLgXAq_G7QDZ4HtbWoeWcsi0_ghBHap_QGVdr9k",
        x: block.x,
        y: block.y,
        width: block.width,
        height: block.height
    });

    images.push(newImgDwg);
    imagesMask.push(newImgDwg);

    drawImages();
    drawImagesMask();

    blocks.pop();

    //LK.createImage('image' + index, 'content', options);

    index++;
});

canvasPractice.addEventListener('touchstart', (e) => {
    isMouseDown = true;
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;

    const block = new Block(x, y, 0, 0);

    blocks.push(block);

}, false);

canvasPractice.addEventListener('touchmove', (e) => {
    if(isMouseDown) {
        const block = blocks[blocks.length - 1];
        block.setBound(e.touches[0].clientX - x, e.touches[0].clientY - y);
    }

}, false);

canvasPractice.addEventListener('touchend', (e) => {
    isMouseDown = false;

}, false);

