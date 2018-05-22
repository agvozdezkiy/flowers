//WebLab 04.2018 agvozdezkiy@yandex.ru

/*===========================================================
                Настройка для плагина bxSlider

    Картинки в каждом слайде должны быть настроены
как многослойный фон.

    DIV-ам слайдов в HTML-коде назначить айдишники
в формате "slide-N", где N числа по порядку
от 0 и выше для каждого слайда.

    id слайдера может быть любым. Служит для
определения видимости элемента на странице. В случае
с адаптивным дизайном, например.

    В качестве параметров для инициализации движения
слоев в bxSliderMover.init() передаются id слайдера
и многомерный массив со скоростями слоев в каждом
слайде.

Пример:
        ....
    <div id="slider" class="hide-for-small-only">
        <div class="bxSlider">
            <div id="slide-0" class="bg-image-1" style="height: 600px;"></div>
            <div id="slide-1" class="bg-image-2" style="height: 600px;"></div>
            <div id="slide-2" class="bg-image-3" style="height: 600px;"></div>
        </div>
    </div>

    <script>
        bxSliderMover.init('slider', [[1, 2], [2.2, 1, 1.5], [2, 0, 2]]);
    </script>
        ....


       ---------------------------------------------
                Настройка для одного слайда

    Картинки в слайде должны быть настроены как
многослойный фон.

    DIV-у слайда в HTML-коде назначить айдишник.

    id слайда может быть любым. Служит для
определения видимости элемента на странице. В случае
с адаптивным дизайном, например.

    В качестве параметров для инициализации движения
слоев в bxSliderMover.init() передаются id слайда
и одномерный массив со скоростями каждого слоя в
слайде.

Пример:
        ....
    <div id="slide" class="bg-image hide-for-small-only"></div>

    <script>
        bxSliderMover.init('slide', [2.2, 1, 1.5]);
    </script>
        ....
=================================================================*/
(function () {

    'use strict';

    var foo = {
        activeSlide: 0,
        arrSlideElements: [],
        arrPosX: [],
        delta: [],
        arrSpeeds: [],

        init: function (sliderId, speedArr) {
            this.sliderId = sliderId;
            this.arrSpeeds = speedArr;
            this.isManyLayers = (typeof this.arrSpeeds[0] == 'object') ? true : false;

            this.isSliderOn = (window.getComputedStyle(document.getElementById(this.sliderId)).display === 'none') ? false : true;

            this.resetDelta();

            if (this.isManyLayers) {

                document.querySelector('.bx-pager, .bx-default-pager').addEventListener('click', this.pagerHandler);

                for (var i = 0; i < this.arrSpeeds.length; i++) {
                    this.arrSlideElements[i] = document.getElementById('slide-' + i);
                    var posX = window.getComputedStyle(this.arrSlideElements[i]).backgroundPositionX;
                    this.arrPosX[i] = posX.split(', ');
                }
            } else {
                this.arrSlideElements[0] = document.getElementById(this.sliderId);
                var posX = window.getComputedStyle(this.arrSlideElements[0]).backgroundPositionX;
                this.arrPosX = posX.split(', ');
            }

            document.querySelector('body').addEventListener('mousemove', this.mouseHandler);

            return this;
        },

        resetMoving: function(){
            if(this.arrSlideElements[this.activeSlide]) this.arrSlideElements[this.activeSlide].setAttribute('style', '');
        },

        resetDelta: function () {
            if (this.isManyLayers)
                for (var i = 0; i < this.arrSpeeds[this.activeSlide].length; i++) this.delta[i] = 0;
            else
                for (var i = 0; i < this.arrSpeeds.length; i++) this.delta[i] = 0;
        },

        pagerHandler: {
            handleEvent: function (event) {
                if (event.target.tagName == 'A') {
                    foo.activeSlide = Number(event.target.innerHTML) - 1;
                    foo.resetDelta();
                }
            }
        },

        mouseHandler: {

            handleEvent: function (event) {
                if(!foo.isSliderOn) return;

                var delta = event.clientX - this.prevClientX;
                var side = 0;
                if (delta>0) side = -1; 
                else if (delta<0) side = 1;

                this.prevClientX = event.clientX;

                var strStyle = '';
                if (foo.isManyLayers) {
                    for (var layer = 0; layer < foo.arrSpeeds[foo.activeSlide].length; layer++) {
                        foo.delta[layer] += side*foo.arrSpeeds[foo.activeSlide][layer];
                        strStyle += ' calc( ' + (foo.arrPosX[foo.activeSlide][layer] + ' + ' + foo.delta[layer] + 'px ),');
                    }
                } else {
                    for (var layer = 0; layer < foo.arrSpeeds.length; layer++) {
                        foo.delta[layer] += side*foo.arrSpeeds[layer];
                        strStyle += ' calc( ' + (foo.arrPosX[layer] + ' + ' + foo.delta[layer] + 'px ),');
                    }
                }

                strStyle = 'background-position-x:' + strStyle.substr(0, strStyle.length - 1) + ';';
                foo.arrSlideElements[foo.activeSlide].setAttribute('style', strStyle);
            }
        },
    }

    window.addEventListener('resize', function (event) {
        foo.isSliderOn = (window.getComputedStyle(document.getElementById(foo.sliderId)).display === 'none') ? false : true;
        console.log(foo.isSliderOn);
    });
    
    document.body.addEventListener('mouseenter', function (event) {
        if(!foo.isSliderOn) return;

        foo.mouseHandler.prevClientX = event.clientX;
        foo.resetMoving();
        foo.resetDelta();
    });


    window.bxSliderMover = foo;
}());