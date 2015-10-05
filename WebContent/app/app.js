/**
 * Renovation Calculator Angular App 
 */
var app = angular.module("RenovationCalculatorApp", []);

app.factory('ElectricalData', function() {

	var ElectricalData = function (findPricing) {
		var _rid = null, _tid = null, _component, _qty = 1, _minCost = 0, _maxCost = 0;
		var _pricing;
		
		var _findPricing = function() {
			if (_component && findPricing) {
				_pricing = findPricing(_component.cid, _tid, _rid);
			}
			else {
				_pricing = null;
			}
		};
		
		var _updateCost = function () {
			if (_pricing) {
				_minCost = (_pricing.min || 0) * _qty;
				_maxCost = (_pricing.max || 0) * _qty;
			}
		}
		
		return {
			 get rid() {
				return _rid;
			}
			,set rid(rid) {
				_rid = rid;
				_findPricing();
				_updateCost();
			}
			,get component() {
				if (_component) {
					return angular.toJson(_component);
				}
				return null;
			}
			,set component(c) {
				_component = angular.fromJson(c);
				_findPricing();
				_updateCost();
			}
			,get tid() {
				return _tid;
			}
			,set tid(tid) {
				_tid = tid;
				_findPricing();
				_updateCost();
			}
			,get qty() {
				return _qty;
			}
			,set qty(qty) {
				_qty = qty;
				_updateCost();
			}
			,get componentTypes() {
				if (_component) {
					return _component.types;
				}
				return [];
			}
			,get minCost() {
				return _minCost;
			}
			,get maxCost() {
				return _maxCost;
			}
		};
	};
	
	return ElectricalData;
});