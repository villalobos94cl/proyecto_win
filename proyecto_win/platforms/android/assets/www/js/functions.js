var link;

$(function () {
    'use strict';

    /* Prevent Safari opening links when viewing as a Mobile App */
    (function (a, b, c) {
        if (c in b && b[c]) {
            var d, e = a.location,
                f = /^(a|html)$/i;
            a.addEventListener("on", function (a) {
                d = a.target;
                while (!f.test(d.nodeName)) d = d.parentNode;
                "href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href);
            }, !1)
        }
    })(document, window.navigator, "standalone");
});

// Menu
jQuery(document).ready(function($){
    var isLateralNavAnimating = false;

    //open/close lateral navigation
    $('.menu-trigger').on('click', function(event){
        event.preventDefault();
        //stop if nav animation is running
        if( !isLateralNavAnimating ) {
            if($(this).parents('.csstransitions').length > 0 ) isLateralNavAnimating = true;

            $('body').toggleClass('menu-open');
            $('.menu-navigation').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                //animation is over
                isLateralNavAnimating = false;
            });
        }
    });

	$('#menu-icon').on('click',function(){
        $(this).toggleClass('open');
    });
});

// Tabs
$('ul.tabs').tabs();

// Modal
$('.modal-trigger').leanModal();

// Accordion
$('.collapsible').collapsible({
    accordion: true
});

// Right Sidebar
$('#open-right').sideNav({
    menuWidth: 240, // Default is 240
    edge: 'right', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
});

// Left Sidebar
$('#open-left').sideNav({
    menuWidth: 240, // Default is 240
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
});

// Swipebox
$('.swipebox').swipebox();

// Masonry
$('.grid').masonry({
    itemSelector: '.grid-item'
});

// Scrolling Floating Action Button
$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 1) {
        $(".floating-button").addClass("scrolled-down");
    } else {
        $(".floating-button").removeClass("scrolled-down");
    }
});

// Row Height for Drawer
var grandparent_height = $('#grandparent').height();
$('.child').height(grandparent_height * 0.25);

// Swiper sliders
var swiper = new Swiper('.swiper-slider', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    autoplay: false,
    loop: true
});

// Material Layout
$('.parallax').parallax();
$(function () {
    var hBanner = $('.h-banner').height();
    var cbHeight = hBanner - 56;
    var hHeight = hBanner - 86; // for Title
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= cbHeight) {
            $(".Eclipse-nav").addClass('h-bg');
        }
        if (scroll <= cbHeight) {
            $(".Eclipse-nav").removeClass('h-bg');
        }
        // For heading Title
        if (scroll >= hHeight) {
            $(".banner-title").hide();
            $(".Eclipse-nav .title").show();
        }
        if (scroll <= hHeight) {
            $(".banner-title").show();
            $(".Eclipse-nav .title").hide();
        }
    });
    // opacity Plush button
    var fadeStart = 50 // 100px scroll or less will equiv to 1 opacity
    fadeUntil = 150 // 150px scroll or more will equiv to 0 opacity
    fading = $('.resize');
    $(window).on('scroll', function () {
        var offset = $(document).scrollTop(),
            opacity = 0;
        if (offset <= fadeStart) {
            opacity = 1;
        } else if (offset <= fadeUntil) {
            opacity = 1 - offset / fadeUntil;
        }
        fading.css({
            'transform': 'scale(' + opacity + ')'
        });
    });
});

// MixItUp
$(function () {
    var layout = 'grid', // Store the current layout as a variable
        $container = $('#filter'), // Cache the MixItUp container
        $changeLayout = $('#ChangeLayout'); // Cache the changeLayout button
    // Instantiate MixItUp with some custom options:
    $container.mixItUp({
        animation: {
            animateChangeLayout: true, // Animate the positions of targets as the layout changes
            animateResizeTargets: true, // Animate the width/height of targets as the layout changes
            effects: 'fade rotateX(-40deg) translateZ(-100px)'
        },
        layout: {
            containerClass: 'grid' // Add the class 'list' to the container on load
        }
    });
    // MixItUp does not provide a default "change layout" button, so we need to make our own and bind it with a click handler:
    $changeLayout.on('click', function () {
        // If the current layout is a list, change to grid:
        if (layout == 'grid') {
            layout = 'list';
            $changeLayout.text('Grid'); // Update the button text
            $container.mixItUp('changeLayout', {
                containerClass: layout // change the container class to "grid"
            });
            // Else if the current layout is a grid, change to list:
        } else {
            layout = 'grid';
            $changeLayout.text('List'); // Update the button text
            $container.mixItUp('changeLayout', {
                containerClass: layout // Change the container class to 'list'
            });
        }
    });

    // init swiper layout
    window.onload = function () {
        setTimeout(function () {
            ResizeHandler = ResizeHandler || function () { };
            ResizeHandler();
        }, 500)
    };

});

function getSuscribete(index){
					var term = {button:"Suscribete"};
					$.ajax({
					url:'http://appexplora.informaticapucv.cl/conexion.php',
					type:'POST',
					data:term,
					dataType:'json',
					error:function(jqXHR,text_status,strError){
						  console.log(strError +  ' ' +text_status + ' ' + jqXHR);
                        },
							timeout:15000,
									success:function(data){
                                       // console.log(data);
									 link = data;
                                     suscribete = link[0].suscribete;
                                     facebook = link[0].facebook;
                                     twitter = link[0].twitter;
                                     web = link[0].web;
                                     youtube = link[0].youtube;

                                   }
					       });
    if(index == 1) //suscribete
      return cordova.InAppBrowser.open(suscribete, '_system', 'location=yes');
    if(index == 2) //facebook
      return cordova.InAppBrowser.open(facebook, '_system', 'location=yes');
    if(index == 3) //twitter
      return cordova.InAppBrowser.open(twitter, '_system', 'location=yes');
    if(index == 4) //youtube
      return cordova.InAppBrowser.open(youtube, '_system', 'location=yes');
    if(index == 5) //web
      return cordova.InAppBrowser.open(web, '_system', 'location=yes');
}
