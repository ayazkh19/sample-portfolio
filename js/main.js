$(document).ready(function () {
    let sliderContainer = $("#slider");
    let sliderCont = $(".slider_item");
    let slides = sliderCont.children(".slide");
    // Total slides count
    let sliderCount = slides.length;
    let currentSlide = slides.first();
    let currentSlideIndex = 1;
    // Hide all slides except first and add active class to first
    slides.not(':first').css('display', 'none');
    currentSlide.addClass('active');

    let autoPlay = null;
    let pause = 7000;
    let playback = true;

    function AutoPlay(autoPlay) {
        clearInterval(autoPlay);
        if (playback) {
            autoPlay = setInterval(function () {
                fadeNext()
            }, pause);
        }
    }

    function fadeNext() {
        currentSlide.removeClass('active').fadeOut(700);
        if (currentSlideIndex == sliderCount) {
            currentSlide = slides.first();
            currentSlide.delay(500).addClass('active').fadeIn(700);
            currentSlideIndex = 1;
        } else {
            currentSlideIndex++;
            currentSlide = currentSlide.next();
            currentSlide.delay(500).addClass('active').fadeIn(700);
        }
    }

    $.fn.isInViewport = function () {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    AutoPlay(autoPlay, playback);

    $(window).scroll(function () {
        parallax();
    });

});

function parallax() {
    let windowScroll = $(window).scrollTop();
    let topPos
    $('.parallax_bg').css('background-position', `center ${windowScroll*0.755}px`);
//    topPos = $("#services")[0].getBoundingClientRect().top + $(window)['scrollTop']();
    if ($('.services_container').isInViewport()) {
        // get servicess position from top
        topPos = $("#services")[0].getBoundingClientRect().top + $(window)['scrollTop']()-100;
//        topPos = topPos;

        $('.services_container').css('background-position', `center ${(windowScroll - topPos -500)*0.65}px`);

        console.log(windowScroll - topPos -500);
    }
//    console.log(topPos);
//    console.log(windowScroll);
}


// not required at this moment
function fadePrev() {
    currentSlide.removeClass('active').fadeOut(700);

    if (currentSlideIndex == 1) {
        currentSlide = slides.last();
        currentSlide.delay(500).addClass('active').fadeIn();
        currentSlideIndex = slidesCount;
    } else {
        currentSlideIndex--;
        currentSlide = currentSlide.prev();
        currentSlide.delay(500).addClass('active').fadeIn(700);
    }
}
