

var request= require("request");


var Mngr = {

	monitor : function (req, res){

		var url = decodeURIComponent(req.query.url);

		request(url, function (error, response, body) {
	      
			if (!error && response.statusCode == 200) {
				res.send(body);
			}
			else{
				res.send({"monitor_error" : JSON.stringify(error)});
			}
	    });

	}
}


module.exports = Mngr;