$(document).ready(function () {

    /****************header*****************/
    /*menu__link hover*/
    var catalogLink = $('.catalog-link'),
        catalog = $('.catalog'),
        headerBottom = $('.header-bottom');

    // $("body").on('mouseenter', '.catalog-link, .catalog', function () {
    //    catalog.fadeIn(300);
    // }).on('mouseleave', '.catalog-link, .catalog', function () {
    //     // catalogLink.on('mouseleave', function () {
    //     catalog.fadeOut(200);
    // });

    //header-fixed
    $(window).on('scroll', function () {
        var header = $('.header-fixed');
        if($(this).scrollTop() > 0) {
            header.slideDown(200);
        } else {
            header.slideUp(200);
        }
    });
    /****************end header*****************/



    /************snowflakes*************/
    const image = document.getElementsByClassName('snowflake__img');
    new simpleParallax(image, {
            orientation: 'right'
        }
    );
    /************end snowflakes*************/



    /****************actions*****************/
    $('.actions-slider__wrap').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        appendArrows: $('.slider-arrows'),
        nextArrow: $('.slider__arrow-next'),
        prevArrow: $('.slider__arrow-prev')
    });

    /****************end actions*****************/



    /*********************pattern********************/
    new WOW().init();
    /*********************end pattern********************/



    /*********************reviews photo-block**********************/
    $('.reviews-main-slider__wrap').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        appendArrows: $('.slider-arrows'),
        nextArrow: $('.slider__arrow-next'),
        prevArrow: $('.slider__arrow-prev')
    });

    $('.photo-main__wrap').on('click', function () {
        $.fancybox.open($('.photo-main__img'));
    });
    /*********************end reviews photo-block**********************/

});