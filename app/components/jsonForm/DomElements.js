
"use strict";

var React = require('react');

var TextBoxForm = require('./TextBox').Form;
var SelectForm = require('./Select').Form;

var PlaceHolder = require('./PlaceHolder');


/*
<DOMElements.form.text data={"A"} />
const DOMElements = {

	"form" : {
		"text" : function text(props){
			return <TextBoxForm data={props} />
		}
	},
	"table" : {
		"text" : function text(props){
			return <TextBox data={props} />
		}
	}
}
*/

var DomElement = {

	props : {
		id : null,
		type : null,
		data : null,
		dataSource : null,
		scheme : null,
		onChange : null
	},

	init : function(props){
		this.props = props;
	},

	get : function (key){

		var typ = this.props.scheme[key].typ;

		var props = {
			"id" : this.props.id,
			"key" : key,
			"typ" : typ,
			"label" : (this.props.scheme[key].label || key),
			"multiple" : this.props.scheme[key].multiple || false,
			"val" : this.props.data ? this.props.data[key] : "",
			"dataSource" : this.props.dataSource  // parent.getData, parent.onChange
		}

		if(this.props.type == "table"){
			return <PlaceHolder data={props} />
		}

		switch(typ){

			case "text":
				return <TextBoxForm data={props} />;

			case "select":
				return <SelectForm data={props} />;
		}
	}

}

module.exports = DomElement;
    