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
};

//-----Класс анимации бокового меню
var menu = {
    field: document.getElementById('field'),
    sideBar: document.getElementById('sideBar'),
    init: function(){
        this.field = document.getElementById('field');
        this.sideBar = document.getElementById('sideBar');
    },
    show: function(){
            this.field.className=this.field.className.replace('closed', 'opened');
            this.sideBar.className=this.sideBar.className.replace('closed', 'opened');
            document.documentElement.style='overflow-y: hidden;';
    },

    hide: function(){
        this.field.className=this.field.className.replace('opened','closed');
        this.sideBar.className=this.sideBar.className.replace('opened','closed');
        document.documentElement.style='';
    }
};


//-----Класс управления бургером
var burger = {
    checkBox: undefined,
    isChecked: function() {
        return this.checkBox.checked;
    },
    
    uncheck: function(){
        this.checkBox.checked=false;
    },

    init: function(){
         this.checkBox = document.getElementById('burger-checkbox');
         this.checkBox.addEventListener('change', this);
    },

    handleEvent: function(){
        if(!this.isChecked()) menu.hide();
        else menu.show();
    },
};


window.onload = function () {
// Настройка слайдера
    bxSliderMover.init('slider', [[2, 1.5, 1.2, 1, .8, .8, .5, .5, .2, .2], [.7, 1, .5, 1.5, .8, .2, 0]]);
}
window.onresize = function(){
    if(window.innerWidth>1023 && burger.isChecked()){
        menu.hide();
        burger.uncheck();
    }

}