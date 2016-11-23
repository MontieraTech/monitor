
"use strict";

var React = require('react');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory= ReactRouter.hashHistory

var ReactDOM = require('react-dom');

var Monitor = require('./monitor');
var JsonForm = require('./components/JsonForm');

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
				"name" : "XC111-AT-DE"
			},

			scheme : {
		        id : {
		            typ : "text"
		        },
		        name : {
		            typ : "text"
		        }
		    }
		}
	},

	onChange : function (data){
		alert(data);
	},

	getData : function (name){
		return { val : this.state.data[name], list : [] }
	},

	render : function () {

		return (<div className="container-fluid">
					<div className="row">
						<div className="col-xs-12">
                            <JsonForm type={"form"} id={"myId"} dataSource={this} scheme={this.state.scheme} onChange={this.onChange} />
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