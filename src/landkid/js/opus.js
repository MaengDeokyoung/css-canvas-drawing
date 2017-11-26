(function() {

    var opus = {}

    function OpusObject(){}

    OpusObject.prototype.execute = function(what){
        var elements = this;
        for(var  i = 0 ; i < elements.length ; i++) {
            (function(i) {
                var element = elements[i];
                what(element, i);
            })(i);
        }
        return elements;
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

        var o = new OpusObject();

        for(var  i = 0 ; i < elements.length ; i++) {
            (function(i){
                o[i] = elements[i];
            })(i);        }

        o.length = elements.length;

        return o;

    };

    var select = function(selector) {
        var elements = document.querySelectorAll(selector);

        var o = new OpusObject();

        for(var  i = 0 ; i < elements.length ; i++) {
            (function(i){
                o[i] = elements[i];
            })(i);
        }

        o.length = elements.length;

        return o;
    };

    opus.selectByClassName = selectByClassName;
    opus.select = select;

    window.OPUS = opus;
})();
