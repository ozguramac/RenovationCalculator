app.controller("ElectricalController", function($scope, $http, ElectricalData) {
	
	var _findPricing = function(cid, tid, rid) {
		var pricing = null;
		if (cid) {
			angular.forEach($scope.data.pricing, function(value, key) {
				if ( value.cid == cid
					&& (!value.tid || !tid || value.tid == tid) 
					&& (!value.rid || !rid || value.rid == rid) )
				{
					pricing = value; //TODO: More efficient search
				}
			});
		}
		return pricing;
	};
	
	$scope.init = function () {
		$scope.data = {};
		$scope.rows = [];
		
		$scope.addRow();
		
		$http.get("data/db.json").then(
			 function(response) { $scope.data = response.data; }
			,function(err) { console.log(err); }
		);
	};
	
	$scope.addRow = function() {
		$scope.rows.push(new ElectricalData(_findPricing));
		$scope.checked = false;
	};
	
	$scope.removeRows = function() {
		for (var i = $scope.rows.length - 1; i >= 0; i--) {
			if ($scope.rows[i].checked) {
				$scope.rows.splice(i, 1);
			}
		}
		$scope.checked = false;
	};
	
	$scope.toggleChecks = function() {
		$scope.rows.forEach(function(row) {
			row.checked = $scope.checked;
		});
	};
	
	$scope.anyChecked = function () {
		var anyChecked = $scope.rows.some(function(row) {
			return row.checked;
		});
		return anyChecked;
	};
	
	$scope.onRowChecked = function() {
		$scope.checked = $scope.rows.every(function(row) {
			return row.checked;
		});
	};
	
	$scope.minTotalCost = function() {
		return $scope.rows.reduce(function(sum, row) {
			return sum + row.minCost;
		}, 0);
	};
	
	$scope.maxTotalCost = function() {
		return $scope.rows.reduce(function(sum, row) {
			return sum + row.maxCost;
		}, 0);
	};
	
});