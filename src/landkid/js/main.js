(function(){

    var items = [
        {
            title: "Responsive web test",
            desc: "반응형 웹 가이드를 위한 프로토타입.",
            url: "/landkid/html/gs.html",
            date: "2017/09/30"
        },
        {
            title: "Psychi Text Animation",
            desc: "This animation is made by canvas drawing.",
            url: "/landkid/html/typo1.html",
            date: "2017/09/30"
        },
        {
            title: "Pado Animation",
            desc: "This animation is made by canvas drawing.",
            url: "/landkid/html/pado.html",
            date: "2017/09/30"
        }

    ];

    var audio = new Audio("landkid/audio/jonhdenver-takemehomecountryroad.mp3");
    audio.repeat = true;
    audio.play();


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

    window.addEventListener('scroll', function(e){

        var size = parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'));

        if(window.scrollY > size * 3){
            OPUS.select('header').execute(function (o) {
                o.classList.add('header-fixed');
                o.classList.add('transition');


            })
        } else {
            OPUS.select('header').execute(function (o) {
                o.classList.remove('header-fixed');
                o.classList.remove('transition');

            })
        }
    }, false);

    var listItemEl = function(item, position){
        return '<li class="item">\n' +
        '<div class="item-date">\n' + item.date + '</div>' +
        '<div class="item-title">\n' + item.title + '</div>' +
        '<div class="item-description">' + item.desc + '</div>' +
        '<iframe src="' + item.url + '" scrolling="no" border="no" maginwidth="0" marginheight="0" frameborder="0" ></iframe>' +
        '<div class="link"><a href="' + item.url + '">보러 가기</a></div>' +
        ((position !== items.length - 1) ? '<div style="width: 100px;margin-left: auto;margin-right:auto;margin-top:2rem;"><hr></div>' : '') +
        '</li>'
    };

    OPUS.select('ul.list').execute(function(o){
        for(var i = 0 ; i < items.length ; i++) {
            var item = items[i];
            o.innerHTML += listItemEl(item, i);

        }
    });

    OPUS.select('.music-player-control a').execute(function(o){

    }).on('click', function(e){
       if(this.classList.contains('music-player-pause')){
           this.classList.remove('music-player-pause');
           this.classList.add('music-player-play');
           audio.pause();
       } else {
           this.classList.add('music-player-pause');
           this.classList.remove('music-player-play');
           audio.play();
       }
    }, false);

})();