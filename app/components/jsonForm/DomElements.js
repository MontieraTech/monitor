
"use strict";

var React = require('react');

var TextBoxForm = require('./TextBox').Form;
var SelectForm = require('./Select').Form;
var CheckBoxForm = require('./CheckBox').Form;
var DateTimeForm = require('./DateTime').Form;
var FileForm = require('./File').Form;

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
			"mode" : this.props.type,
			"typ" : typ,
			"label" : (this.props.scheme[key].label || key),
			"multiple" : this.props.scheme[key].multiple || false,
			"val" : this.props.data ? this.props.data[key] : "",
			"dataSource" : this.props.dataSource  // parent.getData, parent.onChange
		}

		if(this.props.type == "table-cell"){
			return <PlaceHolder data={props} />
		}

		switch(typ){

			case "text":
				return <TextBoxForm data={props} />;

			case "select":
				return <SelectForm data={props} />;

			case "check":
				return <CheckBoxForm data={props} />;

			case "datetime":
				return <DateTimeForm data={props} />;

			case "file":
				return <FileForm data={props} />;
		}
	}

}

module.exports = DomElement;
    