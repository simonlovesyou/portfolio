window.addEventListener("DOMContentLoaded", function() {

	var body = $('header');
	slide(0, '#4ECDC4');

});



function slide(index, image) {
	var firstLi = $('nav ul').children()[index];
	var liItem = $(firstLi).children();
	var position = $(liItem).position();

	$('.sliding').css(
		{
			'margin-top': position.top + 26,
			'background-color': image.color
		});
	$('#contentImage').css(
		{
			border: 'solid 4px ' + image.color,
			'background-image': 'url(' + image.src + ')' 
		});
	$('.sliding').animate(
		{
			'mar gin-left': position.left,
			'width': liItem.width()
		}, 'fast');


};var projectApp = angular.module('projectApp', []);

projectApp.controller('ProjectListCtrl', function ($scope) {
	$scope.projects = [
		{ 
			'src': 'assets/img/logoColormeans.png',
			'title': 'Colormeans.js',
			'description': 'I have implemented and improved the k-means algorithm to get a palette of colors from an image. The library is open-source at github. ',
			'link': 'www.colormeans.com'
		},
		{ 
			'src': 'assets/img/projectPlaceholder.png',
			'title': 'Project Title 2',
			'description': 'Project description 2. ',
			'link': 'www.colormeans.com'
		},
		{ 
			'src': 'assets/img/projectPlaceholder.png',
			'title': 'Project Title 3',
			'description': 'Project description 3. ',
			'link': 'www.colormeans.com'
		}
	];
});


var blogApp = angular.module('blogApp', []);

blogApp.controller('NavContentCtrl', function ($scope, $http) {
$http.defaults.headers.common["mimeType"] = "application/json";

console.log($http.defaults.headers);

	$scope.navList = 
		[
		'About',
		'Personal',
		'Professional',
		'Projects'
		];
	$scope.imageList = 
		[
			{
			'color':'#4ECDC4',
			'src': 'assets/img/Portfolioimage.png'
			},
			{
			'color':'#C7F464',
			'src': 'assets/img/blog/personal.jpg'
			},	
			{
			'color':'#FF6B6B',
			'src': 'assets/img/blog/professional.jpg'
			},
			{
			'color':'#C44D58',
			'src': 'assets/img/blog/projects.jpg'
			},		
		];
	$scope.postLists = 
		[
			"about.txt",
			"personal.txt",
			"professional.txt",
			"projects.txt"
		];


	$scope.navClicked = function ($index) {

		$scope.selectedNavIndex = $index;
		slide($index, $scope.imageList[$index]);

		$http.get('http://localhost:8000/assets/json/' + $scope.postLists[$index])
		.then(function(res){
			if($index > 0) {
				$scope.postContent = res.data; 
				$scope.hideContent = false;
				$scope.title = null;
				$scope.paragraph = null;
			} else {
				console.log($scope.postLists[$index]);
				console.log(res.data[0]);
				$scope.postClick(res.data[0]);
				$scope.hideContent = true;
			}

		});


	};
    angular.element(document).ready(function () {

        $scope.safeApply(function() {$scope.navClicked(0)});
    });

    $scope.postClick = function(post) {
    	$scope.title = post.header;
    	console.log(post);
    	$scope.paragraph = post.article[0] + '\n';
    	for(var i = 1; i < post.article.length; i++) {

    		console.log(post.article[i]);
    		$scope.paragraph += post.article[i] + '\n'
    		
    	}
    	$scope.hideContent = true;
    	
    }
    $scope.safeApply = function(fn) {
		var phase = this.$root.$$phase;
		if(phase == '$apply' || phase == '$digest') {
			if(fn && (typeof(fn) === 'function')) {
				fn();
			}
		} else {
			this.$apply(fn);
		}
	};


});//$("#wrapper").on( "pagecreate", init());

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

        //"Hack" to fix scroll-event to fire twice.
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


;// Avoid `console` errors in browsers that lack a console.
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