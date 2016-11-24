
"use strict";

var React = require('react');
var TextBox = require('./TextBox').Control;
var Select = require('./Select').Control;

var PlaceHolder = React.createClass({

	getInitialState : function (){
		return {
			mode : "placeholder",  // "placeholder" or "control"
			val : ""
		}
	},

	componentDidMount : function (){
		var obj = this.props.data.val;
		this.setState({ "val" : (obj.val || obj) });
	},

	onClickEvent : function (){
		this.setState({ "mode" : "control" })
	},

	onBlurEvent : function (val){
		console.log("PlaceHolder blur " + val);
		this.setState({ "mode" : "placeholder", "val" : val });
	},

	DomElement : function(){

		var props = this.props.data;
		props.val = this.state.val;
    	props.parent = this;

		switch(this.props.data.typ){
			case "text":
				return <TextBox data={props} />;
			case "select":
				return <Select data={props} />;
		}
	},

    render:function(){

        return (
           <div className="JsonForm-Component-Wrapper">
				
				{
					this.state.mode == "control" ? 

						this.DomElement() 

						: 

						<div className="JsonForm-PlaceHolder m-top" onClick={this.onClickEvent}>
							{this.state.val}
						</div>
				}
				
			</div>
        )
    }
});


module.exports = PlaceHolder;