angular.module("ImageRegionSelectionDemoControllers", [])
	.controller("DemoController", [ "$scope", function($scope){
		
		$scope.data = {
			src: "src/img/sample.jpg",
			width: 512,
			height: 384,
			regions: [
				{
					name: "Region 1",
					x: 200,
					y: 10,
					width: 100,
					height: 100,
					rotation: 0
				},
				{
					name: "Region 2",
					x: 30,
					y: 30,
					width: 50,
					height: 50,
					rotation: 45
				}
			]
		};
		
		if ($scope.data.regions.length) {
			$scope.selectedRegion = $scope.data.regions[0];	
		} else {
			$scope.selectedRegion = null;
		}
		
		$scope.addRegion = function() {
			
			$scope.data.regions.push({
				name: "New Region",
				x: 0,
				y: 0,
				width: 10,
				height: 10,
				rotation: 0
			});
				
		};
		
		$scope.removeRegion = function() {
			$scope.data.regions.splice($scope.data.regions.indexOf($scope.selectedRegion), 1);	
			$scope.selectedRegion = null;
		};
		
	}])
	.directive("regions", [ function(){
		return {
			restrict: "E",
			replace: true,
			transclude: true,
			scope: {
				src: "=",
				width: "=",
				height: "="
			},
			templateUrl: "src/html/regions.html",
			link: function(scope, element, attrs) {
				element.css({
					"background-image": "url(" + scope.src + ")",
					"background-size": "100% 100%",
					"background-repeat": "no-repeat",
					"position": "relative",
					"width": scope.width + "px",
					"height": scope.height + "px"
				});
			}
		};
	}])
	.directive("region", [ function(){
		return {
			replace: true,
			restrict: "E",
			templateUrl: "src/html/region.html",
			transclude: true,
			scope: {
				x: "=",
				y: "=",
				width: "=",
				height: "=",
				rotation: "="
			},
			link: function(scope, element, attrs) {
				
				var render = function() {
					element.css({
						"position": "absolute",
						"top": scope.y + "px",
						"left": scope.x + "px",
						"transform": "rotate(" + scope.rotation + "deg)",
						"width": scope.width + "px",
						"height": scope.height + "px"
					});
				};
				
				scope.$watch("x", function(x){
					scope.x = parseInt(x);
					render();
				});
				
				scope.$watch("y", function(y){
					scope.y = parseInt(y);
					render();
				});
				
				scope.$watch("width", function(width){
					scope.width = parseInt(width);
					render();
				});
				
				scope.$watch("height", function(height){
					scope.height = parseInt(height);
					render();
				});
				
				scope.$watch("rotation", function(rotation){
					scope.rotation = parseInt(rotation);
					render();
				});
				
			}
		};
	}]);

angular.module("ImageRegionSelectionDemo", [ "vr.directives.slider", "ImageRegionSelectionDemoControllers" ]);

