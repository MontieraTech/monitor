
"use strict";

var React = require('react');
var TextBox = require('./TextBox').Control;

var PlaceHolder = React.createClass({

	getInitialState : function (){
		return {
			mode : "placeholder"  // "placeholder" or "control"
		}
	},

	onClickEvent : function (){
		this.setState({ "mode" : "control" })
	},

	DomElement : function(){
		switch(this.props.data.typ){
			case "text":
				return <TextBox data={this.props.data} />;
		}
	},

    render:function(){
        return (
           <div className="JsonForm-Component-Wrapper">
				
				{
					this.state.mode == "control" ? 

						this.DomElement() 

						: 

						<div className="JsonForm-PlaceHolder" onClick={this.onClickEvent}>
							{this.props.data.val}
						</div>
				}
				
			</div>
        )
    }
});


module.exports = PlaceHolder;