describe('Renovation Electrical Calculator', function() {
	
	beforeEach(function() {
		browser.get('index.html');
	});
	
	it('should initialize properly', function() {
		expect(browser.getTitle()).toEqual('Renovation Calculator');
		expect(element(by.model('checked')).getAttribute('checked')).toBeFalsy();
		
		var rows = element.all(by.repeater('row in rows'));
		expect(rows.count()).toBe(1);
		expect(rows.first().element(by.model('row.checked')).getAttribute('checked')).toBeFalsy();
		//TODO
	});
	
	it('should add a new row', function() {
		//TODO
	});
});
