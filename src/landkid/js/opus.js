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