describe("Renovation Calculator", function() {
	beforeEach(module('RenovationCalculatorApp'));
	
	describe("Electrical Data Factory", function () {
		var tElectricalData, ted;
		
		beforeEach(inject(function(ElectricalData) {
			tElectricalData = ElectricalData;
		}));
		
		it('is defined', function() {
			expect(tElectricalData).toBeDefined();
		});
		
		it('can produce an instance', function () {
			ted = new tElectricalData();
			expect(ted).toBeDefined();
		});
		
		it('produces correctly initialized instance', function () {
			expect(ted.rid).toBeNull();
			expect(ted.component).toBeNull();
			expect(ted.tid).toBeNull();
			expect(ted.qty).toBe(1);
			expect(ted.componentTypes).toBe([]);
			expect(ted.minCost).toBe(0);
			expect(ted.maxCost).toBe(0);
		});
		
	});
});
