// conf.js
exports.config = {
	 framework: 'jasmine2'
	//,seleniumAddress: 'http://localhost:4444/wd/hub'
	,specs: ['spec.js']
	,baseUrl: 'http://localhost:8080/RenovationCalculator/'
	,directConnect: true
}
