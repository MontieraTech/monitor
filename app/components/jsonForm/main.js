
"use strict";

/*
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

-----------------------------

<select ref="slct" className="selectpicker" {multiple} onChange={this.onBlurEvent}>

*/

var React = require('react');
var DomElements = require('./DomElements');

module.exports = React.createClass({
    
	getInitialState : function (){
		return { 
			data : ""
		};
	},

	componentWillMount : function (){
		DomElements.init(this.props);
	},

	componentDidMount : function (){
	},

	getData : function (name, callback){
		this.props.dataSource.getData(name, function (data){
			callback(data);
		});
	},

	onChange : function (id, key, val){
		this.props.onChange(id, key, val);
	},

    render:function(){

    	var that = this;
        return (
           <div className="row">
				<div className="col-md-12">
					
					{
						Object.keys(that.props.scheme).map(function (key) {
  							//var elmnt = DOMElements[that.props.type][that.props.scheme[key].typ];
							//return <elmnt label={that.props.scheme[key].label || key} val={"temp"} parent={this} />
							return DomElements.get(key)
						})
					}
				</div>
			</div>
        )
    }
})