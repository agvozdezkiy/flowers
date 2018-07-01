'use strict';

//Класс для анимация круглых кнопок в разделах "Программы сопровождения" и "Наши услуги"

var roundButtonsBehavior = {
    buttonsArr: undefined,
    startI: 0,

    init: function(){
        this.buttonsArr = document.getElementsByClassName('rnd-button');
        document.addEventListener('scroll', this);
    },

    handleEvent: function(evt){
        var i=this.startI;
        
        while(true){
            if(this.buttonsArr[i].getBoundingClientRect().y < window.innerHeight){
                this.setStartAnim(this.buttonsArr[i], 'start-pos', 'end-pos');
                i++;
                if(this.buttonsArr.length === i){
                    document.removeEventListener('scroll', roundButtonsBehavior);
                    break;
                }
            } else break;
        }
        this.startI = i;
    },

    setStartAnim: function(button, class1, class2){
        button.className=button.className.replace(class1, class2);
    }
}

window.onload = function () {

    // Настройка слайдера
    bxSliderMover.init('slider', [[2, 1.5, 1.2, 1, .8, .8, .5, .5, .2, .2], [.7, 1, .5, 1.5, .8, .2, 0]]);
}