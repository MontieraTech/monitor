
"use strict";

var React = require('react');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory= ReactRouter.hashHistory

var ReactDOM = require('react-dom');

var Monitor = require('./monitor');

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

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

var routes = (
	<Router history={hashHistory}>
        <Route path="/" component={App}></Route>
	</Router>
);


ReactDOM.render(routes, document.getElementById('app'));