
var mngr = require('./mngr');


module.exports = function (app) {

	app.route('/monitor/:cso?/').get(function (req, res) {
		console.log("req.params.cso = " + req.params.cso);
		if(!req.params.cso){
			res.json({"status" : "ok"});
		}
		else{
			mngr.monitor(req, res);	
		}
    });

	app.route('/cnfg').get(function (req, res) {
		var cnfgPath = (process.env.NODE_ENV === 'development') ? "../../cnfg/monitor.json" : "/src/cnfg/monitor.json";
		console.log("cnfg path = " + cnfgPath);
		var cnfg = require(cnfgPath);
		console.log(cnfg);
		res.json(cnfg);
	});
    

}