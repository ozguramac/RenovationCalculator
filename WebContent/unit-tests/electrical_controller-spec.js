describe("Renovation Electrical Calculator", function() {
	beforeEach(module('RenovationCalculatorApp'));
	
	var $testScope, createController;
	
	beforeEach(inject(function($controller) {
		$testScope = {};
		createController = function () {
			$controller('ElectricalController', {$scope: $testScope });
			$testScope.init();
		}
	}));
	
	describe('$scope.init', function() {
		it('initializes electrical controller scope', function() {
			createController();
			expect($testScope.data).toEqual({});
			expect($testScope.rows.length).toEqual(1);
		});
	});
	
	describe('$scope.addRow', function() {
		it('adds another row to electrical controller', function() {
			createController();
			$testScope.addRow();
			expect($testScope.rows.length).toEqual(2);
		});
	});
	
});