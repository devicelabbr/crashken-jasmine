const CrashkenClient = require('crashken-client');
const CrashkenReporter = require('./CrashkenReporter');
const _ = require('lodash');



beforeAll((done)=>{

	if(!process.env.apiKey){
		fail('API Key must be set (e.g: apiKey=123)');
	}

	if(!process.env.deviceId){
		fail('Device Id must be set (e.g: deviceId=321)');
	}

	let opts = {};
	let desiredCapabilities = {};

	if(process.env.crashkenHost){
		opts.hostname = process.env.crashkenHost;
	}

	if(process.env.crashkenPort){
		opts.port = process.env.crashkenPort;
	}

	if(process.env.capabilities){
		try{
			desiredCapabilities = JSON.parse(process.env.capabilities);
		} catch(e) {
			console.error(e.stack);
			throw e;
		}
	}

	let crashken = new CrashkenClient(process.env.apiKey,process.env.deviceId, desiredCapabilities, opts);
	try{
		crashken.connect((err, resp) =>{
			if(err) return fail(err);
			global.crashken = crashken;
			global.reportMap = [];
			global.reportStack = [];
			done();
		});
	}catch(e){
		console.log(e.stack);
		fail(e);
	}

});

beforeEach((done) =>{
	crashken.setExecutionGroup(global.reportStack, done);
});

afterEach((done) =>{
	done();
});

afterAll((done)=>{
	console.log(JSON.stringify(global.reportMap));
	global.crashken.disconnect(done);
});

module.exports = {
	init: () => {
		jasmine.getEnv().addReporter(CrashkenReporter);
	}
}
