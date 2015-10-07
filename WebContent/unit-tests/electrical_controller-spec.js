describe("Renovation Electrical Calculator", function() {
	beforeEach(module('RenovationCalculatorApp'));
	
	var dbPath = 'data/db.json';
	var tDb = {
		 rooms: [{rid: -55, name: "Room"}]
		,components: [{cid: -44, name: "Component", plural: "Components", types: [{tid: 0, name: "ComponentType"}]}]
		,pricing: [{cid: -44, tid: 0, min: 10, max: 20}]
	};
	
	var $testScope, $httpBackend, createController;
	
	beforeEach(inject(function($controller, _$httpBackend_) {
		$httpBackend = _$httpBackend_;
		$httpBackend.when('GET', dbPath).respond(tDb);
		$testScope = {};
		createController = function () {
			$httpBackend.expectGET(dbPath);
			$controller('ElectricalController', {$scope: $testScope });
			$testScope.init();
			$httpBackend.flush();
		}
	}));
	
	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});
	
	describe('$scope.init', function() {
		it('initializes electrical controller scope', function() {
			createController();
			expect($testScope.data).toEqual(tDb);
			expect($testScope.rows.length).toEqual(1);
		});
	});
	
	describe('$scope.addRow', function() {
		it('adds another row', function() {
			createController();
			$testScope.addRow();
			expect($testScope.rows.length).toEqual(2);
		});
	});
	
	describe('$scope.removeRows', function() {
		it('removes rows', function() {
			createController();
			$testScope.rows[0].checked = true;
			
			$testScope.removeRows();
			expect($testScope.rows.length).toEqual(0);
			expect($testScope.checked).toBeFalsy();
		});
	});
	
	describe('$scope.toggleChecks', function() {
		it('toggles checks on all rows', function() {
			createController();
			$testScope.checked = true;
			
			$testScope.toggleChecks();
			expect($testScope.rows[0].checked).toBeTruthy();
		});
	});
	
	describe('$scope.anyChecked', function() {
		it('determines if any row is checked', function() {
			createController();
			
			expect($testScope.anyChecked()).toBeFalsy();
			
			$testScope.rows[0].checked = true;
			
			expect($testScope.anyChecked()).toBeTruthy();
		});
	});
	
	describe('$scope.onRowChecked', function() {
		it('toggles master check', function() {
			createController();
			$testScope.rows[0].checked = true;
			
			$testScope.onRowChecked();
			expect($testScope.checked).toBeTruthy();
			
			$testScope.rows[0].checked = false;
			$testScope.onRowChecked();
			expect($testScope.checked).toBeFalsy();
			
			$testScope.rows[0].checked = true;
			$testScope.addRow();
			$testScope.onRowChecked();
			expect($testScope.checked).toBeFalsy();
			
			$testScope.rows[1].checked = true;
			$testScope.onRowChecked();
			expect($testScope.checked).toBeTruthy();
			
			$testScope.rows[0].checked = false;
			$testScope.onRowChecked();
			expect($testScope.checked).toBeFalsy();
			
			$testScope.rows[1].checked = false;
			$testScope.onRowChecked();
			expect($testScope.checked).toBeFalsy();
		});
	});
	
	describe('$scope.minTotalCost', function() {
		it('calculates minimum total cost', function() {
			createController();
			$testScope.rows[0].component = angular.toJson(tDb.components[0]);
			$testScope.rows[0].qty = 6;
			
			expect($testScope.minTotalCost()).toBe(60);
		});
	});
	
	describe('$scope.maxTotalCost', function() {
		it('calculates maximum total cost', function() {
			createController();
			$testScope.rows[0].component = angular.toJson(tDb.components[0]);
			$testScope.rows[0].qty = 4;
			
			expect($testScope.maxTotalCost()).toBe(80);
		});
	});
});