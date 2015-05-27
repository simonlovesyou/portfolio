var projectApp = angular.module('projectApp', []);

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

blogApp.controller('NavContentCtrl', function ($scope, $http, $compile) {
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
			$compile(angular.element(document.createElement('about')))( $scope ),
			"personal",
			"professional",
			"projects"
		];


	$scope.navClicked = function ($index) {

		$scope.selectedNavIndex = $index;
		slide($index, $scope.imageList[$index]);
		
		var compiled = $scope.postLists[$index];
	  $("#content").replaceWith(compiled);
	  

	  //angular.element(document.body).append(compiled);

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


});