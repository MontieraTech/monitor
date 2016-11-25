
"use strict";

var React = require('react');


var DateTime = React.createClass({

	onBlurEvent : function (){
		if(this.props.data.dataSource){
			this.props.data.dataSource.onChange(this.props.data.id, this.props.data.key, this.refs.dtinpt.value);
		}

		if(this.props.data.parent){
			this.props.data.parent.onBlurEvent(this.refs.dtinpt.value);
		}
	},

	componentDidMount : function (){
		var options = {
            defaultDate: this.props.data.val || "",
            format: 'DD/MM/YYYY'
        }

        $(this.refs.dt).datetimepicker(options);
	},

	componentDidUpdate : function (){
		$(this.refs.dtinpt).focus();
	},

    render:function(){
        return (
           <div className="JsonForm-Component-Wrapper">
				<div className="form-group">
                    <div ref="dt" className="input-group date json-form-element">
                        <input ref="dtinpt" type="text" className="form-control" onBlur={this.onBlurEvent} />
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
			</div>
        )
    }
});

var DateTimeForm = React.createClass({

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
                        <DateTime data={this.props.data} />
                    </div>
                    <div className="col-xs-4"></div>
                </div>
			</div>
        )
    }
});


module.exports = {
	Form : DateTimeForm, 
	Control : DateTime
}
