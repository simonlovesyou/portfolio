var projectApp = angular.module('projectApp', []);

projectApp.controller('ProjectListCtrl', function ($scope) {
	$scope.projects = [
		{ 
		'src': 'img/logoColormeans.png',
		'title': 'Colormeans.js',
		'description': 'I have implemented and improved the k-means algorithm to get a palette of colors from an image. The library is open-source at github. ',
		'link': 'www.colormeans.com'
		},
		{ 
		'src': 'img/projectPlaceholder.png',
		'title': 'Project Title 2',
		'description': 'Project description 2. ',
		'link': 'www.colormeans.com'
		},
		{ 
		'src': 'img/projectPlaceholder.png',
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
			'src': 'img/Portfolioimage.png'
			},
			{
			'color':'#C7F464',
			'src': 'img/blog/personal.jpg'
			},	
			{
			'color':'#FF6B6B',
			'src': 'img/blog/professional.jpg'
			},
			{
			'color':'#C44D58',
			'src': 'img/blog/projects.jpg'
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

		$http.get('http://localhost:8000/js/json/' + $scope.postLists[$index])
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


})