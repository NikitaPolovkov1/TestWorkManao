import $ from 'jquery'
import 'slick-slider'


$('.slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
        {
            breakpoint: 415,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
            }
        }
    ]
});

$(document).ready(function(){
    $(function() {
        let header = $("header");

        $(window).scroll(function() {
            if($(this).scrollTop() > 1) {
                header.addClass('scrolled');
            } else {
                header.removeClass('scrolled');
            }
        });
    });
    $('#burger').click(function(){
        $('.overlay__burger').fadeToggle();
        $('.menu__body').fadeToggle();
        $("header").addClass("scrolled");
    });

    $('.overlay__burger').click(function(){
        $('.menu__body').fadeOut();
        $('.overlay__burger').fadeOut();

    });

    $('.overlay, .cross').click(function(){
        $('.overlay').fadeOut();
        $('.popup__thanks').fadeOut();
    });


});


document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("footer__form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var name = document.getElementById("input_name").value;
        var email = document.getElementById("input_email").value;
        var description = document.getElementById("textarea_descr").value;
        var consultationCheckbox = document.getElementById("consultation_checkbox").checked;
        var tariffCheckbox = document.getElementById("tariff_checkbox").checked;
        var accessCheckbox = document.getElementById("access_checkbox").checked;

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Неправильный формат электронной почты");
            return;
        }


        console.log("Ваше имя: " + name);
        console.log("Электронная почта: " + email);
        console.log("Описание задач: " + description);
        console.log("Мне нужна консультация: " + consultationCheckbox);
        console.log("Подберите для нас тариф: " + tariffCheckbox);
        console.log("Готовы предоставить доступ для более детальной оценки: " + accessCheckbox);

        $('.popup__thanks').show();
        $('.overlay').show();
    });
});



