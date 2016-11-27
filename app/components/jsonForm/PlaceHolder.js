
"use strict";

var React = require('react');
var TextBox = require('./TextBox').Control;
var Select = require('./Select').Control;
var CheckBox = require('./CheckBox').Form;
var DateTime = require('./DateTime').Control;
var File = require('./File').Control;

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

		var that = this;
		$(document).on("click", function (event){
			
			if(event.target.className == "json-form-element-file"){
				return;
			}

			if(event.target.className == "glyphicon glyphicon-calendar" || 
				event.target.className.indexOf("json-form-element") >= 0){
				event.preventDefault();
				return;
			}

			console.log(event.target.className);
			that.setState({ "mode" : "placeholder" });	
		})	
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

			case "check":
				return <CheckBox data={props} />;

			case "datetime":
				return <DateTime data={props} />;
				
			case "file":
				return <File data={props} />;
		}
	},

    render:function(){

    	var val = (this.state.val == null || this.state.val == "undefined") ? "" : this.state.val.toString();
        return (
           <div className="no-pad no-mrg">
				
				{
					this.state.mode == "control" ? 

						this.DomElement() 

						: 

						<div className="JsonForm-PlaceHolder m-top" onClick={this.onClickEvent}>
							{val}
						</div>
				}
				
			</div>
        )
    }
});


module.exports = PlaceHolder;