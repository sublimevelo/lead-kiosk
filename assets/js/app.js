// --------------------------------------------------
// APP.JS
// --------------------------------------------------

//
// Initialize Foundation
// --------------------------------------------------

$(document).foundation();

//
// Custom JS
// --------------------------------------------------

const setOfflineMode = function (status, connectionStatus = '') {
    if (status === 'on') {
        $('body').addClass('offline');
    } else {
        $('body').removeClass('offline');
    }
    if (connectionStatus === 'offline') {
        $('body').addClass('no-connection');
        $('#toggleOfflineMode').attr('disabled', true);
    } else {
        $('body').removeClass('no-connection');
        $('#toggleOfflineMode').attr('disabled', false);
    }
}

const openFullscreen = function () {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

const closeFullscreen = function () {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
}

const slickFadeout = function(center) {
    const levels = [1, .5, .2];
    center.css('opacity', levels[0]);
    center.next().css('opacity', levels[1]);
    center.next().next().css('opacity', levels[2]);
    center.prev().css('opacity', levels[1]);
    center.prev().prev().css('opacity', levels[2]);
}

const slickInit = function () {
    let slickAutoplaySpeed = localStorage.getItem('slickAutoplaySpeed');
    $('input.carouselTiming').val(slickAutoplaySpeed);
    if (!slickAutoplaySpeed) {
        slickAutoplaySpeed = 3000;
    }

    $('.carousel').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: slickAutoplaySpeed,
        swipe: false,
    })
    slickFadeout($('.slick-center'));
}

const loadCards = function () {
    let cards = localStorage.getItem('cards');
    if (cards) {
        return JSON.parse(cards);
    }
    return false;
}

const saveCards = function (cards) {
    if (cards) {
        localStorage.setItem("cards", JSON.stringify(cards));
    }
}

const restoreCards = function () {
    let cards = loadCards();
    if (!cards) {
        $("input").prop("checked", true);
        cards = getCheckedCards();
    }
    displayCards(cards);
    $("input").prop("checked", false);
    cards.forEach(cardId => {
        $("input#check-" + cardId).prop("checked", true);
    });
}

const getCheckedCards = function () {
    let cards = [];
    const checked = $(".available-cards input:checked");
    checked.each(function() {
        cards.push($(this).val())
    });
    return cards;
}

const displayCards = function (cards) {
    $(".main .card").closest(".cell").hide();
    cards.forEach(function(cardId) {
        $(".cards-container #" + cardId).closest(".cell").show();
    })
}

// check for online status
if (navigator.onLine) {
    setOfflineMode("off");
} else {
    setOfflineMode("on", "offline");
}
window.addEventListener('online', function () {
    setOfflineMode("off");
});
window.addEventListener('offline', function () {
    setOfflineMode("on", "offline");
});

// set up the Slick carousel
$(document).ready(function () {

    restoreCards();

    // restore screensaver
    const screensaverPoster = localStorage.getItem('screensaverPoster');
    const screensaverSrc = localStorage.getItem('screensaverSrc');
    if (screensaverPoster) {
        $('.screensaver video').attr('poster', screensaverPoster);
    }
    $('.screensaver video').attr('src', screensaverSrc);
    $(`input.screensaver-select[data-src='${screensaverSrc}']`).prop('checked', true);

    $(".available-cards input").on("change", function() {
        let cards = getCheckedCards();
        displayCards(cards);
        saveCards(cards);
    })

    slickInit();

    $('input.carouselTiming').on("change", function() {
        localStorage.setItem("slickAutoplaySpeed", $(this).val());
        $("button.browserRefresh").show();
    })

    $("button.browserRefresh").on("click", function() {
        window.location.reload(true);
    })

    $('.carousel').on('beforeChange', function() {
        slickFadeout($('.slick-center').next());
    })

    $(document).on('open.zf.reveal', function () {
        $('.carousel').slick('slickPause');
    }).on('closed.zf.reveal', function () {
        $('.carousel').slick('slickPlay');
        $('video').trigger('pause');
    })

    $('#toggleFullScreen').on('click', function () {
        if ($(this).is(":checked")) {
            openFullscreen();
        } else {
            closeFullscreen();
        }
    })

    $('#toggleOfflineMode').on('click', function () {
        if (!navigator.onLine) { return }
        if ($("body").hasClass("offline")) {
            setOfflineMode("off");
        } else {
            setOfflineMode("on");
        }
    })

    $('#toggleScreensaver').on('click', function () {
        if ($("body").hasClass("screensaver-on")) {
            $("body").removeClass("screensaver-on");
            $('.carousel').slick('slickPlay');
        } else {
            $("body").addClass("screensaver-on");
            $('.carousel').slick('slickPause');
        }
    })

    $('input.screensaver-select').on('click', function () {
        const src = $(this).data('src');
        const poster = $(this).data('poster');
        if (poster) {
            $('.screensaver video').attr('poster', poster);
            localStorage.setItem('screensaverPoster', poster);
        }
        $('.screensaver video').attr('src', src);
        localStorage.setItem('screensaverSrc', src);
    })

})