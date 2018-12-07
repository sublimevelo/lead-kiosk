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
    $('.carousel').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 3000,
    })
    slickFadeout($('.slick-center'));
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
    slickInit();

    $('.carousel').on('beforeChange', function() {
        slickFadeout($('.slick-center').next());
    })

    $(document).on('open.zf.reveal', function () {
        $('.carousel').slick('slickPause');
    }).on('closed.zf.reveal', function () {
        $('.carousel').slick('slickPlay');
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

})