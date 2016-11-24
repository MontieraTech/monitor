
"use strict";

var React = require('react');


var TextBox = React.createClass({

	onBlurEvent : function (event){
		if(this.props.data.dataSource){
			this.props.data.dataSource.onChange(this.props.data.id, this.props.data.key, this.refs.tbx.value);
		}

		if(this.props.data.parent){
			this.props.data.parent.onBlurEvent(this.refs.tbx.value);
		}
	},

	componentDidMount : function (){
		this.refs.tbx.value = this.props.data.val;
	},

    render:function(){
        return (
           <div className="JsonForm-Component-Wrapper">
				<input ref="tbx" type="text" className="form-control" onBlur={this.onBlurEvent} />
			</div>
        )
    }
});

var TextBoxForm = React.createClass({

	getInitialState : function (){
		return {}
	},

    render:function(){

        return (
           <div className="JsonForm-Component-Wrapper">
				<div className="row m-top"> 
                    <div className="col-xs-2">
                    	{this.props.data.label}
                    </div>
                    <div className="col-xs-6">
                        <TextBox data={this.props.data} />
                    </div>
                    <div className="col-xs-4"></div>
                </div>
			</div>
        )
    }
});


module.exports = {
	Form : TextBoxForm, 
	Control : TextBox
}