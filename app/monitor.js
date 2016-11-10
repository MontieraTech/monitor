
"use strict";

var React = require('react');
var http = require('./http');

var Monitor = React.createClass({

	getInitialState : function (){
		return {
			data : []
		}
	},

	componentDidMount : function (){
		var that = this;
		http.get("/cnfg").then(function (data){

			that.gData = data;	
			that.run();

			setInterval(function (){
				that.run();
			}, 1000);
		});

		
	},

	gData : [],
	gIdx : 0,
	getNext : function(bNewCycle){

		if(this.gIdx == this.gData.length){
			this.gIdx = 0;
			if(!bNewCycle){
				return null;
			}
		}

		console.log("[getNext] " + this.gIdx);
		var obj = this.gData[this.gIdx];
		if(!obj.ping){ // first time
			obj.ping = [];
			obj.lastPing = 0;
			obj.lastCycle = 0;
			obj.idx = this.gIdx;

			this.gData[obj.idx] = obj;
		}

		console.log("[getNext] " + JSON.stringify(obj, null, "\t"));
		var dt = new Date().getTime();
		if(obj.lastPing != 0){
			
			console.log("[getNext] last ping is " + obj.lastPing);
			// last ping didn't finish yet

			// fail
			if( Math.abs(Number(dt) - Number(obj.lastPing)) > (30 * 1000) ){
				console.log("[getNext] ending session ...");
				obj.ping.push({ "status" : "fail - timeout" });
				obj.lastPing = 0;
				obj.lastCycle = obj.cycle + 1000;

				this.gData[obj.idx] = obj;
			}
			else{ // or wait ... next
				console.log("[getNext] waiting ...");
				this.gIdx++;	
				return this.getNext();
			}
		}

		var ts = obj.lastCycle || 0;
		if( Math.abs(Number(dt) - Number(ts)) < Number(obj.cycle) ){
			console.log("[getNext] not yet ...");
			this.gIdx++;
			return this.getNext();
		}

		return this.gData[this.gIdx++];
	},

	getUrl : function(obj){
		var url = obj.url;
		if(obj.typ == "s2s" && obj.name != "Monitoring Server"){
			url = "/monitor/cso/?url=" + encodeURIComponent(url);
		}

		var rnd = Math.floor((Math.random() * 100000));
		return url + ((url.indexOf("?") > 0) ? "&" : "?") + "rnd=" + rnd;
	},

	run : function(){
		
		console.log("---------------")
		var nextObj = this.getNext(true);
		if(!nextObj){
			return; // no-one is ready! wait for the timer
		}
		var dt = new Date().getTime();
		var that = this;

		nextObj.lastPing = dt;
		
		console.log("[run][1] " + JSON.stringify(nextObj, null, "\t"));

		// typ = s2s (server to server)
		// typ = cso (cross site origin)

		var func = nextObj.typ == "s2s" ? http.getJSON : http.getJSONP;
		func(this.getUrl(nextObj), nextObj.idx, function (idx, data){

			var obj = that.gData[idx]; // could change while pinging .. take it again

			if(obj.lastPing == 0){
				console.log("[run][] session ended already");
				// session already terminated
				return;
			}

			obj.lastCycle = new Date().getTime();
			obj.lastPing = 0;
			if(!obj.ping){
				obj.ping = [];
			}
			obj.ping.push(data);

			console.log("[run][2] " + JSON.stringify(obj, null, "\t"));

			that.gData[obj.idx] = obj;
			that.setState( { data : that.gData } );
		});

	},

	render : function () {

		var that = this;
		return (<div className="container-fluid">
					<div className="row">
						<div className="col-xs-12">
							{
	                            that.state.data.map(function(obj, idx){
	                         		return <Service	data={obj} />
	                            })
							}
                        </div>   
                    </div>
				</div>);

	}
});

var Service = React.createClass({

	render : function () {	

		var that = this;

		if(!that.props.data.ping){
			return null;
		}

		var ttl = $.extend({}, that.props.data);
		delete ttl.ping;

		return (<div className="container-fluid">
					<div className="row" style={{"border-bottom" : "1px solid gray"}}>
						<div className="col-xs-3">
							<h5 title={JSON.stringify(ttl, null, "\t")}>{that.props.data.name}</h5>
						</div>
						<div className="col-xs-9">
							{
								that.props.data.ping.map(function (val, idx){
									return <Result data={val} />
								})
							}
                        </div>   
                    </div>
				</div>);

	}
});

var Result = React.createClass({

	render : function () {	

		var that = this;

		if(!that.props.data || that.props.data.monitor_error){
			return <img src='/images/red.png' title={JSON.stringify(that.props.data, null, "\t")} style={{"margin-right" : "2px"}} />
		}
		else{
			return <img src='/images/green.png' title={JSON.stringify(that.props.data, null, "\t")} style={{"margin-right" : "2px"}} />
		}
	}
});

module.exports = Monitor;