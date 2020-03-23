const canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

const scope = document.getElementsByClassName('scope')[0];
canvas.width = scope.width;
canvas.height = scope.height

const radius = 15,
    fraction = 5;

const drawAll = () => {
    drawBackground(10, "black", 100, 200)
};

const drawBackground = (width, color, rowGap, colGap) => {
    ctx.beginPath();

    const colNum = Math.floor(canvas.width / (colGap + width));
    const rowNum = Math.floor(canvas.height / (rowGap + width));

    for(let i = 0 ; i < colNum ; i++){
        ctx.rect(i * width + (i + 1) * colGap, 0, width, canvas.height);
/*        let gradient = ctxBgMask.createLinearGradient(0, 0, 0, 10);
        gradient.addColorStop(0,"black");
        gradient.addColorStop(1,"white");*/
        ctx.fillStyle = "black";
        ctx.fill();
    }

    for(let i = 0 ; i < rowNum ; i++){
        ctx.rect( 0, i * width + (i + 1) * rowGap, canvas.width, width);
        ctx.fillStyle = color;
        ctx.fill();
    }

};

(function(){

    window.addEventListener('resize', fitToWindowSize, false);

    function fitToWindowSize(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawAll();

    }
    fitToWindowSize();
})();

function Block(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Block.prototype.setBound = function(xpt, ypt){
    this.x = xpt;
    this.y = ypt;
};

Block.prototype.setBound = function(width, height){
    this.width = width;
    this.height = height;
};


function Ball(x, y){
    this.dx = 1;
    this.dy = 1;
    this.xpt = x;
    this.ypt = y;
    this.bound = new Block(this.xpt, this.ypt, radius * 2, radius * 2);
}

Ball.prototype.draw = function(){
    this.checkEdge(blocks);

    this.xpt += fraction * this.dx;
    this.ypt += fraction * this.dy;

    this.bound.setBound(this.xpt, this.ypt);

    ctx.beginPath();
    ctx.arc(radius + this.xpt, radius + this.ypt, radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
};

Ball.prototype.checkEdge = function(blocks){
    if(radius * 2 + this.xpt > canvas.width){
        this.dx = -1;
    }
    if(this.xpt < 0){
        this.dx = 1;
    }
    if(radius * 2 + this.ypt > canvas.height){
        this.dy = -1;
    }
    if(this.ypt < 0){
        this.dy = 1;
    }

    if(blocks !== undefined && blocks.length > 0){
        for(let i = 0 ; i < blocks.length ; i++){
            const block = blocks[i];

            if(radius * 2 + this.xpt > block.x
                && this.xpt < block.x + block.width
                && radius * 2 + this.ypt > block.y
                && this.ypt < block.y + block.height) {
                if(radius * 2 + this.xpt - fraction <= block.x) {
                    this.dx = -1;
                }

                if(this.xpt + fraction >= block.x + block.width) {
                    this.dx = 1;
                }

                if(radius * 2 + this.ypt - fraction <= block.y) {
                    this.dy = -1;
                }

                if(this.ypt + fraction >= block.y + block.height) {
                    this.dy = 1;
                }
            }
        }
    }
};

const block1 = {
    x : 300,
    y : 200,
    width : 500,
    height : 600
};

const block2 = {
    x : 1000,
    y : 200,
    width : 200,
    height : 300
};

const block3 = {
    x : 1500,
    y : 700,
    width : 200,
    height : 500
};

const blocks = [];

const ball = new Ball(0, 0);
//blocks.push(ball.bound);

const balls = [ball];

const draw = () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(balls !== undefined && balls.length > 0){
        for(let i = 0 ; i < balls.length ; i++){
            balls[i].draw();
        }
    }

    drawBlocks(blocks)

}

const drawBlocks = (blocks) => {
    if(blocks !== undefined && blocks.length > 0){
        for(let i = 0 ; i < blocks.length ; i++){
            const block = blocks[i];

            ctx.beginPath();
            ctx.rect(block.x, block.y, block.width, block.height);
            ctx.strokeStyle = "green";
            ctx.stroke();
        }
    }
}

setInterval(draw, 15);

let x, y;
let isMouseDown = false;

canvas.addEventListener('mousedown', function(e){

    if(e.clientX < objectPadding ||
        e.clientX > canvas.width - objectPadding ||
        e.clientY < objectPadding ||
        e.clientY > canvas.height - objectPadding){

    } else {

        isMouseDown = true;
        x = e.clientX - radius;
        y = e.clientY - radius;

        const block = new Block(x, y, 0, 0);

        blocks.push(block);
    }

    // var newBall = new Ball(e.clientX - radius, e.clientY - radius);
    // balls.push(newBall);
    //blocks.push(newBall.bound);

});

canvas.addEventListener('mousemove', function(e){
    if(isMouseDown) {
        const block = blocks[blocks.length - 1];
        block.setBound(e.clientX - x, e.clientY - y);
    }

});

canvas.addEventListener('mouseup', function(e){
    isMouseDown = false;

});

canvas.addEventListener('touchstart', function(e){
    if(e.touches[0].clientX < objectPadding || e.touches[0].clientX > canvas.width - objectPadding || e.touches[0].clientY < objectPadding || e.touches[0].clientY > canvas.height - objectPadding){
        return;
    }

    isMouseDown = true;
    x = e.touches[0].clientX - radius;
    y = e.touches[0].clientY - radius;

    const block = new Block(x, y, 0, 0);

    blocks.push(block);

}, false);

canvas.addEventListener('touchmove', function(e){
    if(isMouseDown) {
        const block = blocks[blocks.length - 1];
        block.setBound(e.touches[0].clientX - x, e.touches[0].clientY - y);
    }

}, false);

canvas.addEventListener('touchend', function(e){
    isMouseDown = false;

}, false);
