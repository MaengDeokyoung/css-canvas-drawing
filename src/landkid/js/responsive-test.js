(function() {

    var opus = {}

    function OpusObject(){}

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
        //toggle();
    } else {

    }

}

function toggle(e){
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
    e.preventDefault();
}

// OPUS.select('.header h1').execute(function(object){
//     object.innerHTML = navigator.userAgent;
// });

if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)) {
    OPUS.select('.menu-btn').on("touchstart", toggle, false);
} else {
    OPUS.select('.menu-btn').on("click", toggle, false);
}
