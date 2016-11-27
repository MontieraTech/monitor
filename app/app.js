
"use strict";

var React = require('react');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory= ReactRouter.hashHistory

var ReactDOM = require('react-dom');

var Monitor = require('./monitor');
var JsonForm = require('./components/JsonForm/main');

var App = React.createClass({

	render : function () {

		return (<div className="container-fluid">
					<div className="row">
						<div className="col-xs-12">
                            <Monitor />
                        </div>   
                    </div>
				</div>);

	}
});

var App2 = React.createClass({

	getInitialState : function (){
		return { 

			data : { 	
				"id" : 10001, 
				"name" : "XC111-AT-DE",
				"country" : { 
					val : "DE",
					list : ["IT","FR","DE"]
				},
				"days" : { 
					val : "SU",
					list : ["SU","MO","TU"]
				},
				"isHidden" : false,
				"date" : "2016-11-12",
				"imageOnDisk" : "c:/resources/images/aa.jpg",
			},

			scheme : {
		        id : {
		            typ : "text"
		        },
		        name : {
		            typ : "text"
		        },
		        country : {
		        	typ : "select",
		        	multiple : true
		        },
		        days : {
		        	typ : "select"
		        },
		        isHidden : {
		        	typ : "check",
		        	label : "Is Hidden?"
		        },
		        date : {
		        	typ : "datetime",
		        },
		        imageOnDisk : {
		        	typ : "file"
		        }
		    }
		}
	},

	onChange : function (id, key, val){
		$("#out").append("<div>[" + id + "][" + key + "][" + val + "]</div>");
		var state = this.state;
		if(state.data[key].val){
			state.data[key].val = val;
		}
		else{
			state.data[key]	= val;
		}
		// this.setState(state);

        // $(".json-form-element").blur();

	},

	getData : function (id, name, callback){
		if(this.state.data[name].list){
			callback(this.state.data[name]);
		}
		else{
			callback({ val : this.state.data[name], list : [] })
		}
	},

	render : function () {

		// <JsonForm type={"form"} data={this.state.data} id={"myId"} dataSource={this} scheme={this.state.scheme} onChange={this.onChange} />
		// <JsonForm type={"table"} data={this.state.data} id={"column-0-1"} dataSource={this} scheme={{ "id" : this.state.scheme.id }} onChange={this.onChange} />

// 

		return (<div className="container-fluid">
					<div className="row">
						<div className="col-xs-5">
							
							<div className="row">
								<div className="col-xs-12">
									<table>
										<th>A</th>
										<th>B</th>
										<th>C</th>

										<tr>
											<td style={{"width" : "250px"}}><JsonForm type={"table-cell"} data={this.state.data} id={"column-0-1"} dataSource={this} scheme={{ "id" : this.state.scheme.id }} onChange={this.onChange} /></td>
											<td style={{"width" : "250px"}}><JsonForm type={"table-cell"} data={this.state.data} id={"column-0-2"} dataSource={this} scheme={{ "name" : this.state.scheme.name }} onChange={this.onChange} /></td>
											<td style={{"width" : "250px"}}><JsonForm type={"table-cell"} data={this.state.data} id={"column-0-3"} dataSource={this} scheme={{ "country" : this.state.scheme.country }} onChange={this.onChange} /></td>
										</tr>

										<tr>
											<td style={{"width" : "250px"}}><JsonForm type={"table-cell"} data={this.state.data} id={"column-1-1"} dataSource={this} scheme={{ "id" : this.state.scheme.id }} onChange={this.onChange} /></td>
											<td style={{"width" : "250px"}}><JsonForm type={"table-cell"} data={this.state.data} id={"column-1-2"} dataSource={this} scheme={{ "days" : this.state.scheme.days }} onChange={this.onChange} /></td>
											<td style={{"width" : "250px"}}><JsonForm type={"table-cell"} data={this.state.data} id={"column-1-3"} dataSource={this} scheme={{ "isHidden" : this.state.scheme.isHidden }} onChange={this.onChange} /></td>
										</tr>
										<tr>
											<td style={{"width" : "250px"}}><JsonForm type={"table-cell"} data={this.state.data} id={"column-2-1"} dataSource={this} scheme={{ "id" : this.state.scheme.id }} onChange={this.onChange} /></td>
											<td style={{"width" : "250px"}}><JsonForm type={"table-cell"} data={this.state.data} id={"column-2-2"} dataSource={this} scheme={{ "date" : this.state.scheme.date }} onChange={this.onChange} /></td>
											<td style={{"width" : "250px"}}><JsonForm type={"table-cell"} data={this.state.data} id={"column-2-3"} dataSource={this} scheme={{ "imageOnDisk" : this.state.scheme.imageOnDisk }} onChange={this.onChange} /></td>
										</tr>
									</table>
								</div>   
                    		</div>
							<div className="row" style={{"margin-top" : "100px"}}>
								<div className="col-xs-12">
									<JsonForm type={"form"} data={this.state.data} id={"myId"} dataSource={this} scheme={this.state.scheme} onChange={this.onChange} />
					    		</div>   
                    		</div>

                    									
							
                        </div>   
                        <div className="col-xs-5 col-xs-offset-1">
                        	<div id="out"></div>
                        </div>   
                    </div>
                   
				</div>);

	}
});

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

var routes = (
	<Router history={hashHistory}>
        <Route path="/" component={App}></Route>
        <Route path="json" component={App2}></Route>
	</Router>
);


ReactDOM.render(routes, document.getElementById('app'));
