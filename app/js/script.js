class NothernLights {
    constructor() {
        //common
        this.mobileLeftMenu = $('.js-mobile-left-menu');
        this.mobileIconMenu = $('.js-icon-menu'); //доделать скролл меню в мобильной версии
        this.location = $('.js-mobile-location');
        this.city = $('.js-mobile-location-city');
        this.listCity = $(".js-mobile-location-list");
        this.mobilePopupBtn = $(".js-mobile-popup-btn");
        this.mobileMenuBtn = $('.js-mobile-catalog-link');
        this.mobileMenuLink = $('.js-mobile-menu-link');
        this.mobileMenuBack = $('.js-mobile-menu-back');
        this.mobileMenuTopItem = $('.js-top-item');
        this.mobileMenuHeader = $('.js-popup-header');

        //mainpage
        this.headerFixed = $('.js-header-fixed');
        this.catalogBtn = $('.js-catalog-btn');

        //constructor page
        this.form = $('.js-constructor-form');
        this.stepTwo = $('.js-step-two');
        this.formLabel = $('.js-label');
        this.formCheckedInput = $('.js-checked-input'); //сделать disabled инпуты
        this.priceBlock = $('.js-price');
        this.errorBlock = $('.js-error-block');
        this.totalPrice = $('.js-total-price');
        this.materialPrice = 0;
        this.insidePrice = 0;
        this.totalSum = 0;
        this.untyImg = $('.js-unty-img');
        this.popupTitle = $('.js-popup-title');

        this.initEvents();
        this.initCatalogBtnWide();
        this.initMobileLocation();
    }

    initEvents() {
        //common
        this.mediaQuery('all and (min-width: 950px)', function(){
            // $(window).on('scroll', nothernLights.initHeaderFixed);
        });
        this.mediaQuery('all and (max-width: 949px)', function(){
            $(window).on('scroll', function () {
                var header = $('.header-bottom'),
                    main = $('.main'),
                    catalogBtn = $('.catalog-btn');

                if($(this).scrollTop() > 0) {
                    header.addClass('fixed');
                    main.css('padding-top', '60px');
                } else {
                    header.removeClass('fixed');
                    main.css('padding-top', '0')
                }

                if($(this).scrollTop() > 50) {
                    catalogBtn.addClass('hide');
                } else {
                    catalogBtn.removeClass('hide');
                }
            });
        });
        this.mobileIconMenu.on('click', NothernLights.showMobileMenu);
        $("body").on("click", "#js-overlay, .js-popup-close", this.closePopup);
        this.mobilePopupBtn.on('click', this.openMobilePopup);
        this.mobileMenuBtn.on('click', this.openMobileCatalogMenu);
        this.mobileMenuLink.on('click', this.openMobileCatalogSubmenu);
        this.mobileMenuBack.on('click', this.backToCatalog);

        //mainpage

        //constructor page
        this.formLabel.on('click', this.clickLabel);
        this.formCheckedInput.on('change', this.checkInput);
    }

    //common
    initHeaderFixed() {
        if($(this).scrollTop() > 0) {
            nothernLights.headerFixed.slideDown(200);
        } else {
            nothernLights.headerFixed.slideUp(200);
        }
    }

    static showMobileMenu(e) {
        e.preventDefault();

        nothernLights.mobileLeftMenu.addClass('active');
        nothernLights.showOverlay();
    }

    initMobileLocation() {
        if(this.location.length > 0) {
            this.city.on('click', function () {
                nothernLights.listCity.slideToggle(300);
                nothernLights.city.toggleClass('open');
            });
        }
    }

    openMobilePopup(e) {
        e.preventDefault();

        var popup = $(this).attr('href');

        $(popup).addClass('active');
        NothernLights.initNiceScroll($(popup));
        nothernLights.showOverlay();
    }

    openMobileCatalogMenu(e) {
        e.preventDefault();

        let popup = $(this).attr('href');

        $(popup).addClass('active');
        // NothernLights.initNiceScroll($(popup));
        nothernLights.mobileLeftMenu.removeClass('active');
        nothernLights.showOverlay();
    }

    openMobileCatalogSubmenu(e) {
        e.preventDefault();

        let submenu = $(this).siblings('.js-mobile-submenu'),
            // popup = submenu.parents('.js-popup-popup.active'),
            // popup = submenu.parents('.js-popup-main'),
            submenuName = $(this).children('.js-mobile-menu-name').text(),
            nameHeader = $('.js-mobile-menu-title span:first-child');

        if(submenu.length > 0) {
            NothernLights.initNiceScroll($('.js-mobile-popup.active'));
            // if(submenu.innerHeight() > popup.innerHeight()) {
            //     popup.niceScroll({
            //         cursorcolor:"rgba(40, 42, 97, 0.2)",
            //         cursorwidth:"6px",
            //         railpadding: { top: 0, right: 2, left: 0, bottom: 0 }
            //     });
            //     nothernLights.mobileMenuHeader.addClass('shadow');
            // }

            submenu.addClass('open');
            nameHeader.text(submenuName);
            nothernLights.mobileMenuBack.addClass('active');
            nothernLights.mobileMenuTopItem.addClass('active');
        }
    }

    backToCatalog() {
        let btn = $(this),
            popup = btn.parents('.js-popup-header').siblings('.js-popup-main').attr('id'),
            submenu = $('.js-mobile-submenu.open'),
            nameHeader = $('.js-mobile-menu-title span:first-child');

        submenu.removeClass('open');
        nameHeader.text('Каталог товаров');
        nothernLights.mobileMenuBack.removeClass('active');
        nothernLights.mobileMenuTopItem.removeClass('active');
        nothernLights.mobileMenuHeader.removeClass('shadow');

        $(popup).getNiceScroll().remove();
    }

    closePopup() {
        let block = $(".js-mobile-popup.active");

        if($(block).css('display') === 'block') {
            $(block).removeClass('active');
            $('body').removeClass('no-scroll');
        }

        $("#js-overlay").remove();

        if(nothernLights.mobileMenuTopItem.hasClass('active')) {
            nothernLights.mobileMenuTopItem.removeClass('active');
        }
        if(nothernLights.mobileMenuHeader.hasClass('shadow')) {
            nothernLights.mobileMenuHeader.removeClass('shadow');
        }
    }

    static initNiceScroll(popup) {
        var popupMain = popup.find('.js-popup-main'),
            popupMainChild = popupMain.find('.js-popup-wrap');

        if(popupMainChild.innerHeight() > popupMain.innerHeight()) {
            popupMain.niceScroll({
                cursorcolor:"rgba(40, 42, 97, 0.2)",
                cursorwidth:"6px",
                railpadding: { top: 0, right: 2, left: 0, bottom: 0 }
            });
            nothernLights.mobileMenuHeader.addClass('shadow');
        }
    }

    showOverlay() {
        if($('.overlay').length <= 0) {
            if($(window).innerWidth > 900) {
                $('body').append("<div class='overlay' id='js-overlay'></div>").addClass('no-scroll');
            } else {
                $('body').append("<div class='overlay' id='js-overlay'></div>");
            }
        }
    }

    mediaQuery(mediaQueryString, action){
        const handleMatchMedia = function (mediaQuery) {
            if (mediaQuery.matches) { //Попадает в запроc
                if (action  && typeof(action) === 'function') {
                    action();
                }
            }
        };
        const mql = window.matchMedia(mediaQueryString); //стандартный медиазапрос для смены режима просмотра
        handleMatchMedia(mql);
        mql.addListener(handleMatchMedia);
    }

    //mainpage
    initCatalogBtnWide() {
        let timer = false;

        clearTimeout(timer);
        timer = setTimeout(function() {
            nothernLights.catalogBtn.addClass('wide');
            setTimeout(function() {
                nothernLights.catalogBtn.removeClass('wide');
            }, 3000);
        }, 10000);
    }

    //constructor page
    clickLabel() {
        let input = $(this).siblings('.js-input'),
            inputValue = Number(input.val());

        if($(this).parents('.js-step-one').length > 0) {
            $(this).parents('.js-step-one').find('.js-label').removeClass('active');
            nothernLights.stepTwo.addClass('active');
        } else if ($(this).parents('.js-step-two').length > 0) {
            $(this).parents('.js-step-two').find('.js-label').removeClass('active');
        } else {
            $(this).parents('.js-constructor-block').find('.js-label').removeClass('active');
        }

        $(this).addClass('active');

        if($(this).parents('.material').length > 0) {
            nothernLights.materialPrice = inputValue;
        } else if($(this).parents('.inside').length > 0) {
            nothernLights.insidePrice = inputValue;
        }

        nothernLights.getTotalSum(nothernLights.materialPrice, nothernLights.insidePrice);
    }

    checkInput() {

        if($(this).is(":checked")) {
            if($(this).parents('.js-step-one').length > 0) {
                $(this).parents('.js-step-one').addClass('valid');
                nothernLights.addImg($(this));
            } else if ($(this).parents('.js-step-two').length > 0) {
                $(this).parents('.js-step-two').addClass('valid');
                NothernLights.activateConstructorBlock($(this));
            } else {
                $(this).parents('.js-constructor-block').addClass('valid');
                NothernLights.activateConstructorBlock($(this));
                nothernLights.addImg($(this));
            }
        }

        let flagActive = false;
        const checkedField = $('.valid');

        flagActive = checkedField.length === 5;

        if (flagActive) {
            nothernLights.errorBlock.hide();
            nothernLights.priceBlock.addClass('active').fadeIn(200);
        }

        let textLabel = $(this).siblings('.js-label').text();
        // let titleText += textLabel;
        const popup = $(this).parents('.js-mobile-popup');
        console.log(popup);
        nothernLights.popupTitle.text(textLabel);
        popup.removeClass('current').addClass('checked');

    }

    static activateConstructorBlock(input) {
        input.parents('.js-constructor-block').addClass('checked');
        input.parents('.js-constructor-block').next().addClass('current');
    }

    addImg() {
        let sex = $('input[name="sex"]:checked').attr('id'),
            color = $('input[name="color"]:checked').attr('id'),
            material = $('input[name="material"]:checked').attr('id'),
            inside = $('input[name="inside"]:checked').attr('id');

        this.untyImg.hide();

        this.formCheckedInput.each(function () {
            let input = $(this),
                inputName = input.attr('name'),
                arrImg = $('.js-unty-img[data-id]');

            if($(this).is(':checked')) {
                switch(inputName) {
                    case 'sex':
                        arrImg.each(function () {
                            let dataId = $(this).data('id');

                            if(dataId.indexOf(sex) !== -1) {
                                $('.js-unty-img[data-id~="' + sex + '"]').css('display', 'block');
                            }
                        });
                        break;
                    case 'color':
                        arrImg.each(function () {
                            let dataId = $(this).data('id');

                            if(dataId.indexOf(color) !== -1) {
                                $('.js-unty-img[data-id~="' + color + '"]').css('display', 'block');
                            }
                        });
                        break;
                    case 'material':
                        arrImg.each(function () {
                            let dataId = $(this).data('id');

                            if(dataId.indexOf(material) !== -1) {
                                $('.js-unty-img[data-id~="' + material + '"]').css('display', 'block');
                            }
                        });
                        break;
                    case 'inside':
                        arrImg.each(function () {
                            let dataId = $(this).data('id');

                            if(dataId.indexOf(inside) !== -1) {
                                $('.js-unty-img[data-id~="' + inside + '"]').css('display', 'block');
                            }
                        });
                        break;
                }
            }

        });
    }

    getTotalSum(materialPrice, insidePrice) {
        this.totalSum = materialPrice + insidePrice;

        this.showTotalSum(this.totalSum);
    }

    showTotalSum(totalSum) {
        this.totalPrice.text(totalSum + ' ₽');
    }

}

const nothernLights = new NothernLights();

$(document).ready(function () {

    /****************header*****************/
    //header-fixed
    // media('all and (min-width: 950px)', function(){
    //     $(window).on('scroll', function () {
    //         var header = $('.header-fixed');
    //         if($(this).scrollTop() > 0) {
    //             header.slideDown(200);
    //         } else {
    //             header.slideUp(200);
    //         }
    //     });
    // });
    // media('all and (max-width: 949px)', function(){
    //     $(window).on('scroll', function () {
    //         var header = $('.header-bottom'),
    //             main = $('.main'),
    //             catalogBtn = $('.catalog-btn');
    //
    //         if($(this).scrollTop() > 0) {
    //             header.addClass('fixed');
    //             main.css('padding-top', '60px');
    //         } else {
    //             header.removeClass('fixed');
    //             main.css('padding-top', '0')
    //         }
    //
    //         if($(this).scrollTop() > 50) {
    //             catalogBtn.addClass('hide');
    //         } else {
    //             catalogBtn.removeClass('hide');
    //         }
    //     });
    // });

    /****************end header*****************/



    /************snowflakes*************/
    var left = document.getElementsByClassName('snowflake__img--left');
    var right = document.getElementsByClassName('snowflake__img--right');
    new simpleParallax(left, {
            orientation: 'right'
        }
    );
    new simpleParallax(right, {
            orientation: 'left'
        }
    );
    /************end snowflakes*************/



    /****************actions*****************/
    (function initMainSlider() {

        var time = 3;
        var $slick = $('.actions-slider__wrap'),
            tick,
            percentTime = 0;

        $slick.on('init', function(e, slick) {
            $(this).find('.slick-arrow').wrapAll('<div class=\'slider-arrows\'></div>');
            percentTime = 0;
            startProgressbar();
        });
        $slick.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
            // pauseOnHover: true,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next">' +
                '<svg class="progress-round" width="54" height="54">' +
                '<circle class="circle-progress"  r="26" cx="50%" cy="50%">'+
                '</circle>'+
                '</svg>' +
                '</button>'
        });
        $slick.on('beforeChange', function(){
            percentTime = 0;
            startProgressbar();
        });

        function startProgressbar() {
            clearTimeout(tick);
            tick = setInterval(interval, 20);
        }

        var $rbar = $('.circle-progress');
        var rlen = 2 * Math.PI * $rbar.attr('r');

        function interval() {
            percentTime += 1 / (time + 0.1);
            $rbar.css({
                strokeDasharray: rlen,
                strokeDashoffset: rlen * (1 - percentTime / 100)
            });
            if (percentTime >= 100) {
                $slick.slick('slickNext');
                percentTime = 0;
                startProgressbar();
            }
        }

    })();
    /****************end actions*****************/



    /*********************pattern********************/
    new WOW().init();
    /*********************end pattern********************/



    /*********************reviews photo-block**********************/
    (function initReviewSlider() {

        var time = 3;
        var $slick = $('.reviews-main-slider__wrap'),
            tick,
            percentTime = 0;

        $slick.on('init', function(e, slick) {
            $(this).find('.slick-arrow').wrapAll('<div class=\'slider-arrows\'></div>');
            percentTime = 0;
            startProgressbar();
        });
        $slick.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
            // pauseOnHover: true,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next">' +
                '<svg class="progress-round" width="54" height="54">' +
                '<circle class="circle-progress" r="26" cx="50%" cy="50%">'+
                '</circle>'+
                '</svg>' +
                '</button>'
        });
        $slick.on('beforeChange', function(){
            percentTime = 0;
            startProgressbar();
        });

        function startProgressbar() {
            clearTimeout(tick);
            tick = setInterval(interval, 20);
        }

        var $rbar = $('.circle-progress');
        var rlen = 2 * Math.PI * $rbar.attr('r');

        function interval() {
            percentTime += 1 / (time + 0.1);
            $rbar.css({
                strokeDasharray: rlen,
                strokeDashoffset: rlen * (1 - percentTime / 100)
            });
            if (percentTime >= 100) {
                $slick.slick('slickNext');
                percentTime = 0;
                startProgressbar();
            }
        }

    })();


    $('.photo-main__wrap').on('click', function () {
        $.fancybox.open($('.photo-main__img'));
    });

    var allImg =  $('.photo-main__row img'),
        allImgSrc = [],
        arrImgSrc = [],
        randomHideImg = [],
        hideImg = $('.photo-main__row.hide img'),
        shownImg = $('.photo-main__row:not(.hide) img');

    allImgSrc = getSrcArray(allImg, arrImgSrc);

    function shuffle(array, numberImg) {
        var j, temp;
        for(var i = array.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = array[j];
            array[j] = array[i];
            array[i] = temp;
        }
        return array.slice(0, numberImg);
    }

    function getSrcArray(array, arrayResult) {
        for (var i = 0; i < array.length; i++) {
            var img = array[i];
            arrayResult.push(img.src);
        }
        return arrayResult;
    }

    function setSrcArray(shownImg, allImgSrc) {
        for (var i = 0; i < shownImg.length; i++) {
            for (var j = 0; j < allImgSrc.length; j++) {
                randomHideImg = shuffle(allImgSrc, 1);
                if(randomHideImg[0] !== shownImg[i].src) {
                    var parent = $(shownImg[i]).parent('a');
                    shownImg[i].src = randomHideImg[0];
                    parent.attr('href', randomHideImg[0]);
                }
            }
        }
    }

    var openedBg = [],
        closedBg = [];

    function changeRandomClosedBg() {
        deactivateOpenedBg();

        closedBg = $('.photo-main__row:not(.hide) .photo-main__bg:not(.active)');

        var randomClosedBg = shuffle(closedBg, 2);
        randomClosedBg.each(function () {
            $(this).addClass('active');
        });

    }

    function deactivateOpenedBg() {
        openedBg = $('.photo-main__bg.active');

        openedBg.each(function () {
            $(this).removeClass('active');
        });
    }

    let timerId = setTimeout(function initChange() {
        changeRandomClosedBg();
        setSrcArray(shownImg, allImgSrc);

        timerId = setTimeout(initChange, 5000);
    }, 5000);

    /*********************end reviews photo-block**********************/



    /*************************map*****************************/
    // ymaps.ready(init);
    //
    // function init(){
    //     var myMap = new ymaps.Map("map", {
    //         center: [52.276522, 104.282225],
    //         zoom: 14
    //     });
    // }
    //
    // var coords = [[52.276522, 104.282225], [52.279385, 104.251411], [52.282013, 104.294773]];
    //
    // for (var i = 0; i < coords.length; ++i) {
    //     placemark = new ymaps.Placemark(coords[i]);
    //     myMap.geoObjects.add(placemark);
    // }
    // var myPlacemark = new ymaps.Placemark([52.276522, 104.282225], {}, {
    //     // iconLayout: 'default#image',
    //     // iconImageHref: '/maps/d../../jsapi/doc/2.1/examples/images/myIcon.gif',
    //     iconImageSize: [30, 42],
    //     iconImageOffset: [-3, -42]
    // });
    //
    // myMap.geoObjects.add(myPlacemark);
    /*************************end map*****************************/
});
