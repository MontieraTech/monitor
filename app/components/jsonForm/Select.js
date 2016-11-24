
"use strict";

var React = require('react');


var Select = React.createClass({

    getInitialState : function (){
        return {
            values : "",
            list : []
        }
    },

	onBlurEvent : function (event){
		if(this.props.data.dataSource){
			this.props.data.dataSource.onChange(this.props.data.id, this.props.data.key, $(this.refs.slct).val().join(","));
		}
        
        if(this.props.data.parent){
            this.props.data.parent.onBlurEvent($(this.refs.slct).val().join(","));
        }
	},

	componentDidMount : function (){

        var data = this.props.data;
        var that = this;
        data.dataSource.getData(data.id, data.key, function (obj){
            var values = obj.val ? (Array.isArray(obj.val) ? obj.val : [obj.val]) : [];
            values = "," + values.join(",") + ",";
            that.setState( {
                "values" : values.toLowerCase(),
                "list" : obj.list
            })
        })

	},

    componentDidUpdate : function (){
        $(".selectpicker").selectpicker();
    },

    render:function(){

        var that = this;
        var multiple = this.props.data.multiple || "";
        return (
           <div className="JsonForm-Component-Wrapper">

				<select ref="slct" className="selectpicker" multiple={multiple} onChange={this.onBlurEvent}>
                {
                    this.state.list.map(function (val, idx){
                        var selected = 0;
                        if(that.state.values.indexOf("," + val.toLowerCase() + ",") >= 0){
                            selected = 1;
                        }
                        return <option selected={selected}>{val}</option>
                    })
                }
                </select>
			</div>
        )
    }
});

var SelectForm = React.createClass({

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
                        <Select data={this.props.data} />
                    </div>
                    <div className="col-xs-4"></div>
                </div>
			</div>
        )
    }
});


module.exports = {
	Form : SelectForm, 
	Control : Select
}