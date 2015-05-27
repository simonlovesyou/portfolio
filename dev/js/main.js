//$("#wrapper").on( "pagecreate", init());

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
            top: '10',
            opacity:1
        };
        var stickyHeaderLeft = $('#stickyHeaderLeft');
        var stickyHeaderRight = $('#stickyHeaderRight');
        var t = 0;

        //"Hack" to fix scroll-event to not fire twice.
        $(window).unbind("scroll");


        $(window).scroll( $.throttle(800, function () {
            if($(window).scrollTop() > (stickyHeaderTop-1) ) {
                if(!toggled) {
                    
                    toggled = true;
                    console.log("Setting toggle to true" );
                    console.log(t++);
                    animationSpeed = 1000;
                    $('#logo').css({position: 'fixed', top: '10px'});
                    $('#stickymarker').css('display', 'block' );
                    stickyHeaderLeft.css(stickyHeaderCss);
                    stickyHeaderRight.css(stickyHeaderCss);
                    $('#logowrapper').addClass('filler'); 

                    //Reset width
                    stickyHeaderLeft.css({width: '0', left: elWidth});
                    stickyHeaderRight.css({width: '0', right: elWidth});
                    //Animate width and position
                    stickyHeaderLeft.animate({width: elWidth, left: 0}, animationSpeed);
                    stickyHeaderRight.animate({width: elWidth, right: 0}, animationSpeed);
                    

                    console.log(iniHeight);
                    console.log($('#description').offset().top);
                    console.log(iniHeight - $('#description').offset().top);
                    //$('#description').css('margin-top', (iniHeight - $('#description').offset().top)/16 + "px" )
                    $('#description').css('margin-top', 64*2-21 +"px" );
                    

                for(var i = 0; i < headerWrappers.length; i++) {
                    $(headerWrappers[i]).css('display', 'block');
                    //$(headerWrappers[i]).css('width', '0');
                    if(i==1) {
                        $(headerWrappers[i]).css({width: '0', right: elWidth});
                        $(headerWrappers[i]).animate({width: elWidth, right: 0}, animationSpeed);
                    } else {
                        $(headerWrappers[i]).css({width: '0', left: elWidth});
                        $(headerWrappers[i]).animate({width: elWidth, left: 0}, animationSpeed);
                    }
                    
                }
            }
        } else {
            $('#logo').css({position: 'static'});
            if(toggled) {
                console.log("Setting toggled to false");
                toggled=false;
                stickyHeaderLeft.animate({opacity:0}, 200);
                stickyHeaderRight.animate({opacity:0}, 200);
                $('#logowrapper').removeClass('filler');
                for(var i = 0; i < headerWrappers.length; i++) {

                    $(headerWrappers[i]).css('display', 'none');
                }
                $('#description').css('margin-top', '0');
            }
        }
    }));
});
$("#seeMore").click(function() {
    console.log("click");
    $('html,body').animate({
        scrollTop: $("#content").offset().top},
        'slow');
});

//}

$(window).resize(function() {
    reshape();
});




function reshape() {
    elWidth = $('body').width()/2;
    elWidth -= 150;  
    $('#stickyHeaderLeft').css('width', elWidth);
    $('#stickyHeaderRight').css('width', elWidth);
    headerWrappers = document.getElementsByClassName("stickyHeaderWrapper");
    for(var i = 0; i < headerWrappers.length; i++) {
        $(headerWrappers[i]).css('width', elWidth);
    }
    //console.log($('#description').offset().top);
    iniHeight = $('#description').offset().top;
    stickyHeaderTop = $('#logo').offset().top;
}

window.addEventListener("DOMContentLoaded", function() {
    var a = document.getElementsByTagName("a");
    for(var i = 0; i < a.length; i++) {
        a[i].addEventListener("click", function() {
            attr = this.getAttribute('title');
            if(attr === 'Top') {
                transferTo('body');
            } else if(attr === 'Work') {
                transferTo('#content');
            }
            else {
                transferTo("#" + attr.toLowerCase());
            }

        });  
    }
});

function transferTo(element) {
    $('html,body').animate({
        scrollTop: $(element).offset().top},
        'slow');
}


