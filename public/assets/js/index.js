//$("#wrapper").on( "pagecreate", init());
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-69417124-1', 'auto');
ga('send', 'pageview');


//function init() {
    $(function() {
        reshape();

        // Check the initial Poistion of the Sticky Header
        var toggled = false;
        var headerWrappers = document.getElementsByClassName("stickyHeaderWrapper");
        var stickyHeaderCss = 
            {
                display: 'block', 
                position: 'fixed', 
                top: '10'
            };
        var stickyHeaderLeft = $('#stickyHeaderLeft');
        var stickyHeaderRight = $('#stickyHeaderRight');
        var t = 0;

        //"Hack" to fix scroll-event to fire twice.
        $(window).unbind("scroll");
        if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
            $(window).scroll( $.throttle(400, function () {
                console.log("StickyHeaderTop: " + stickyHeaderTop);
                if($(window).scrollTop() > (stickyHeaderTop-1) ) {
                    if(!toggled) {
                        
                        toggled = true;
                        console.log("Setting toggle to "+toggled );
                        console.log(t++);
                        animationSpeed = 500;
                        $('#logo').css({position: 'fixed', top: '10px'});
                        $('#stickymarker').css('display', 'block' );
                        stickyHeaderLeft.css(stickyHeaderCss);
                        stickyHeaderRight.css(stickyHeaderCss);
                        $('#logowrapper').addClass('filler'); 

                        //Reset width
                        stickyHeaderLeft.css({width: '0', left: elWidth});
                        stickyHeaderRight.css({width: '0', right: elWidth});
                        //Animate width and position
                        stickyHeaderLeft.animate({width: elWidth, left: 0}, 0);
                        stickyHeaderRight.animate({width: elWidth, right: 0}, 0);
                        

                        console.log("initial Height of description: " + iniHeight);
                        console.log("Description offset: " + $('#description').offset().top);
                        console.log("iniheight minus offset: " + (iniHeight - $('#description').offset().top));
                        //$('#description').css('margin-top', (iniHeight - $('#description').offset().top)/16 + "px" )
                        $('#description').css('margin-top', iniHeight - $('#description').offset().top +"px" );
                        

                    for(var i = 0; i < headerWrappers.length; i++) {
                        $(headerWrappers[i]).css('display', 'block');
                        //$(headerWrappers[i]).css('width', '0');
                        if(i==1) {
                            $(headerWrappers[i]).css({width: '0', right: elWidth});
                            $(headerWrappers[i]).animate({width: elWidth+1, right: 0}, animationSpeed);
                        } else {
                            $(headerWrappers[i]).css({width: '0', left: elWidth});
                            $(headerWrappers[i]).animate({width: elWidth+1, left: 0}, animationSpeed);
                        }
                        
                    }
                }
            } else {
                $('#logo').css({position: 'static'});
                if(toggled) {
                    console.log("Setting toggled to false");
                    toggled=false;
                    $('#logowrapper').removeClass('filler');
                    for(var i = 0; i < headerWrappers.length; i++) {

                        $(headerWrappers[i]).css('display', 'none');
                    }
                    $('#description').css('margin-top', '0');
                }
            }
        }));
    }
});
$("#seeMore").click(function() {
    console.log("click");
    $('html,body').animate({
        scrollTop: $("#content").offset().top-40},
        'slow');
});

$(window).resize(function() {
    reshape();
});

function reshape() {
    console.log("Reshape");
    elWidth = $('body').width()/2;
    elWidth -= 150;  
    console.log("Elwidth:" + elWidth);
    $('#stickyHeaderLeft').css('width', elWidth);
    $('#stickyHeaderRight').css('width', elWidth);
    headerWrappers = document.getElementsByClassName("stickyHeaderWrapper");
    for(var i = 0; i < headerWrappers.length; i++) {
        $(headerWrappers[i]).css('width', elWidth);
    }
    //console.log($('#description').offset().top);
    setTimeout(function() {
        iniHeight = $('#description').offset().top;
    }, 0);
    
    stickyHeaderTop = $('#logo').offset().top;

    if($(window).width() <= 630) {

    }
}

window.addEventListener("DOMContentLoaded", function() {
    var a = document.querySelectorAll("#headerwrapper > .stickyHeaderWrapper > div > nav > a");
    console.log(a);
    for(var i = 0; i < a.length; i++) {
        a[i].addEventListener("click", function() {
            attr = this.getAttribute('title');
            console.log(this);
            if(attr === 'Top') {
                transferTo('body');
            } else if(attr === 'Work') {
                transferTo('#content', -50);
            } else if(attr = 'Contact') {
                transferTo('footer');
            }
            else {
                transferTo("#" + attr.toLowerCase());
            }

        });  
    }
    $('#projectInfo').load('colormeans.html', function() {
        console.log(this);
    });
    console.log($('.grid'));

    $('.grid').masonry({
      // options
      itemSelector: '.grid-item',
      columnWidth: 300
    });

});

function transferTo(element, offset) {
    console.log("Transfer to:"+element);
    var offset = offset || 0;
    $('html,body').animate({
        scrollTop: $(element).offset().top + offset},
        'slow');
}


;// This file is autogenerated via the `commonjs` Grunt task. You can require() this file in a CommonJS environment.
/*require('../../js/transition.js')
require('../../js/alert.js')
require('../../js/button.js')
require('../../js/carousel.js')
require('../../js/collapse.js')
require('../../js/dropdown.js')
require('../../js/modal.js')
require('../../js/tooltip.js')
require('../../js/popover.js')
require('../../js/scrollspy.js')
require('../../js/tab.js')
require('../../js/affix.js')*/;// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
;/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);