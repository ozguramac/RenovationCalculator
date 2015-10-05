describe("Renovation Calculator", function() {
	beforeEach(module('RenovationCalculatorApp'));
	
	describe("Electrical Data Factory", function () {
		var tElectricalData, createTed;
		var tComponent = {cid: -33, types: [{tid: -99}]};
		var tPricing = {min: -666, max: 666};
		
		beforeEach(inject(function(ElectricalData) {
			tElectricalData = ElectricalData;
			createTed = function () {
				var ted = new tElectricalData(function () { return tPricing; });
				ted.component = angular.toJson(tComponent);
				return ted;
			};
		}));
		
		it('is defined', function() {
			expect(tElectricalData).toBeDefined();
		});
		
		it('can produce an instance', function () {
			expect(new tElectricalData()).toBeDefined();
		});
		
		it('produces correctly initialized instance', function () {
			var ted = new tElectricalData();
			expect(ted.rid).toBeNull();
			expect(ted.component).toBeNull();
			expect(ted.tid).toBeNull();
			expect(ted.qty).toBe(1);
			expect(ted.componentTypes.length).toBe(0);
			expect(ted.minCost).toBe(0);
			expect(ted.maxCost).toBe(0);
		});
		
		it('sets component, and updates cost', function () {
			var ted = createTed();
			
			expect(ted.component).not.toBeNull();
			
			var tedComponent = angular.fromJson(ted.component);
			expect(tedComponent.cid).toBe(tComponent.cid);
			expect(tedComponent.types[0].tid).toBe(tComponent.types[0].tid);
			
			expect(ted.minCost).toBe(tPricing.min);
			expect(ted.maxCost).toBe(tPricing.max);
		});
		
		it('sets component type id, and updates cost', function () {
			var ted = createTed();
			
			var ttid = tComponent.types[0].tid;
			ted.tid = ttid;
			expect(ted.tid).toBe(ttid);
			
			expect(ted.minCost).toBe(tPricing.min);
			expect(ted.maxCost).toBe(tPricing.max);
		});
		
		it('sets room id, finds pricing and updates cost', function () {
			var ted = createTed();
			
			var tRid = -1;
			ted.rid = tRid;
			expect(ted.rid).toBe(tRid);
			
			expect(ted.minCost).toBe(tPricing.min);
			expect(ted.maxCost).toBe(tPricing.max);
		});
		
		it('sets quantity and updates cost', function () {
			var ted = createTed();
			
			var tQty = 33;
			ted.qty = tQty;
			expect(ted.qty).toBe(tQty);
			
			expect(ted.minCost).toBe(tPricing.min * tQty);
			expect(ted.maxCost).toBe(tPricing.max * tQty);
		});
	});
});
