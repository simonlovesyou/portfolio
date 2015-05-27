'use strict';

var module = angular.module('blogApp');

module.directive('about', function() {
	return {
	  restrict: 'E',
	  templateUrl: 'directives/about.html'
	}
});