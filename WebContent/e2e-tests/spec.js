describe('Renovation Electrical Calculator', function() {
	var masterCheck = element(by.model('checked'));
	var rows = element.all(by.repeater('row in rows'));
	var rowCheck = by.model('row.checked');
	var rowQty = by.model('row.qty');
	var rowTid = by.model('row.tid');
	var rowComp = by.model('row.component');
	var rowRid = by.model('row.rid');
	var rowMinCost = by.binding('row.minCost');
	var rowMaxCost = by.binding('row.maxCost');
	var addBtn = element(by.model('addBtn'));
	var removeBtn = element(by.model('removeBtn'));
	var minCost = element(by.binding('minTotalCost()'));
	var maxCost = element(by.binding('maxTotalCost()'));
	
	var jsonNullObj = '? object:null ?';
	
	var initCheck = function(row) {
		expect(row.element(rowCheck).getAttribute('checked')).toBeFalsy();
		expect(row.element(rowQty).getAttribute('value')).toBe('1');
		expect(row.element(rowTid).isPresent()).toBeFalsy();
		expect(row.element(rowComp).getAttribute('value')).toBe(jsonNullObj);
		expect(row.element(rowRid).getAttribute('value')).toBe(jsonNullObj);
		expect(row.element(rowMinCost).getText()).toBe('0');
		expect(row.element(rowMaxCost).getText()).toBe('0');
	};
	
	beforeEach(function() {
		browser.get('index.html');
	});
	
	it('should initialize properly', function() {
		expect(browser.getTitle()).toEqual('Renovation Calculator');
		
		expect(masterCheck.getAttribute('checked')).toBeFalsy();
		
		expect(rows.count()).toBe(1);
		rows.each(initCheck);
		
		expect(addBtn.isDisplayed()).toBeTruthy();
		expect(removeBtn.isDisplayed()).toBeFalsy();
		
		expect(minCost.getText()).toBe('0');
		expect(maxCost.getText()).toBe('0');
	});
	
	it('should add a new row', function() {
		addBtn.click();
		
		expect(rows.count()).toBe(2);
		rows.each(initCheck);
	});
	
	it('should select and delete the only row', function() {
		rows.first().element(rowCheck).click();
		
		expect(masterCheck.getAttribute('checked')).toBeTruthy();
		expect(removeBtn.isDisplayed()).toBeTruthy();
		
		removeBtn.click();
		expect(rows.count()).toBe(0);
		expect(masterCheck.isDisplayed()).toBeFalsy();
	});
	
	it('should select and delete all rows', function() {
		addBtn.click();
		masterCheck.click();

		rows.each(function(row) {
			expect(row.element(rowCheck).getAttribute('checked')).toBeTruthy();
		});
		
		removeBtn.click();
		expect(rows.count()).toBe(0);
		expect(masterCheck.isDisplayed()).toBeFalsy();
	});
	
	it('should toggle master check', function() {
		addBtn.click();
		rows.first().element(rowCheck).click();
		
		expect(masterCheck.getAttribute('checked')).toBeFalsy();
		
		rows.get(1).element(rowCheck).click();
		expect(masterCheck.getAttribute('checked')).toBeTruthy();
		
		rows.get(1).element(rowCheck).click();
		expect(masterCheck.getAttribute('checked')).toBeFalsy();
	});
	
	//TODO: More UI selection cases
});
