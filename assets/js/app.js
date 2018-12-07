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

let setOfflineMode = function(status, connectionStatus='') {
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
    $('.carousel').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 3000,
    })

    $(document).on('open.zf.reveal', function () {
        $('.carousel').slick('slickPause');
    }).on('closed.zf.reveal', function () {
        $('.carousel').slick('slickPlay');
    })

    $('#toggleFullScreen').on('click', function() {
        if ($(this).is(":checked")) {
            document.documentElement.webkitRequestFullscreen();
        } else {
            document.webkitExitFullscreen();
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

})