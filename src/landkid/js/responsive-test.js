(function() {

    var opus = {}

    function OpusObject(){};

    OpusObject.prototype.execute = function(what){
        for(var  i = 0 ; i < this.length ; i++) {
            var element = this[i];
            what(element, i);
        }
        return this;
    };

    OpusObject.prototype.on = function(type, listener, useCapture){

        if(useCapture){
            useCapture = false;
        }

        for(var  i = 0 ; i < this.length ; i++) {
            var element = this[i];
            element.addEventListener(type, listener, useCapture);
        }
        return this;
    };

    var selectByClassName = function(className) {
        var elements = document.getElementsByClassName(className);

        var o = {};

        for(var  i = 0 ; i < elements.length ; i++) {
            o[i] = elements[i];
        }

        o.length = elements.length;

        return OpusObject.apply(o, []);

    };

    var select = function(selector) {
        var elements = document.querySelectorAll(selector);

        var o = new OpusObject();

        for(var  i = 0 ; i < elements.length ; i++) {
            o[i] = elements[i];
        }

        o.length = elements.length;

        return o;
    };

    opus.selectByClassName = selectByClassName;
    opus.select = select;

    window.OPUS = opus;

})();

if (matchMedia) {
    var mq1 = window.matchMedia("(min-width: 768px)");
    mq1.addListener(WidthChange);
    WidthChange(mq1);
}

// media query change
function WidthChange(mq1) {
    if (mq1.matches) {
        toggle();
        resizeGrid(2, 3);
    } else {
        resizeGrid(3, 2);
    }

}

function resizeGrid(fromCol, toCol){
    var contentLayout = OPUS.select("div.content")[0];
    var contentLocInfo = contentLayout.getBoundingClientRect();

    OPUS.select("li.content-list-item").execute(function(object, index){
        var itemLocInfo = object.getBoundingClientRect();

        var fromLocX = contentLocInfo.width / fromCol * ((index - fromCol) < 0 ? index : (index - fromCol));
        var fromLocY = itemLocInfo.height * Math.floor(index / fromCol);

        var toLocX = contentLocInfo.width / toCol * ((index - toCol) < 0 ? index : (index - toCol));
        var toLocY = itemLocInfo.height * Math.floor(index / toCol);

        var differX = - (toLocX - fromLocX);
        var differY = - (toLocY - fromLocY);

        object.style.transform = "translate(" + differX + "px, " + differY + "px)";
        setTimeout(function(){
            object.classList.add("grid-transition");
            //object.style.transform = "translate(0,0)";
            object.classList.remove("grid-transition");

        }, 1000);

    })
}

function toggle(){
    const mq = window.matchMedia("(min-width: 768px)");

    if(!mq.matches){

        OPUS.select('.col-3.menu').execute(function(object){

            object.classList.add('transition');

        }).execute(function(object){

            if(object.classList.contains("shown")){
                object.classList.remove("shown");
            } else {
                object.classList.add("shown");
            }

        });
    } else {
        OPUS.select('.col-3.menu').execute(function(object){
            object.classList.remove("shown");
            object.classList.remove("transition");

        });
    }
}

OPUS.select('.menu-btn').on("click", toggle);