var CrashkenReporter  = {

	jasmineStarted: function(suiteInfo) {
	},

	suiteStarted: function(result) {
		global.reportStack.push({
			type: 'suite',
			id: result.id,
			description: result.description,
			children: []
		});
	},

	specStarted: function(result) {
		global.reportStack.push({
			type: 'spec',
			id: result.id,
			description: result.description
		});
	},

	specDone: function(result) {
		global.reportStack.pop();
	},

	suiteDone: function(result) {
		global.reportStack.pop();
	}
}

module.exports = CrashkenReporter;
