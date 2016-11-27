
"use strict";

var React = require('react');


var CheckBox = React.createClass({

	onClickEvent : function (){

		if(this.props.data.dataSource){
			this.props.data.dataSource.onChange(this.props.data.id, this.props.data.key, this.refs.chkbx.checked);
		}

		if(this.props.data.parent){
			this.props.data.parent.onBlurEvent(this.refs.chkbx.checked);
		}
	},

	componentDidMount : function (){
		if(this.props.data.val){
			$(this.refs.chkbx).attr("checked", 1);
		}
	},

    render:function(){
        return (
           <div className="JsonCell-Component-Wrapper">
				<input ref="chkbx" type="checkbox" className="json-form-element" onClick={this.onClickEvent} />
			</div>
        )
    }
});

var CheckBoxForm = React.createClass({

	getInitialState : function (){
		return {}
	},

    render:function(){

        return (
           <div className="JsonForm-Component-Wrapper">
				<div className="row m-top"> 
                    <div className="col-xs-6">
                    	{this.props.data.label}
                    </div>
                    <div className="col-xs-2">
                        <CheckBox data={this.props.data} />
                    </div>
                    <div className="col-xs-4"></div>
                </div>
			</div>
        )
    }
});


module.exports = {
	Form : CheckBoxForm, 
	Control : CheckBox
}