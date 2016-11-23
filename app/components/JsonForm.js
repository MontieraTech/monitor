
"use strict";

var React = require('react');


var PlaceHolder = React.createClass({

    render:function(){
        return (
           <div className="JsonForm-Component-Wrapper">
				<div className="JsonForm-PlaceHolder">
					{this.props.data}
				</div>
			</div>
        )
    }
});

var TextBox = React.createClass({

    render:function(){
        return (
           <div className="JsonForm-Component-Wrapper">
				<input type="text" className="form-control" value={this.props.data.val} />
			</div>
        )
    }
});

var TextBoxForm = React.createClass({

	getInitialState : function (){
		return {}
	},

	componentDidMount : function (){

	},

    render:function(){
        return (
           <div className="JsonForm-Component-Wrapper">
				<div className="row m-top"> 
                    <div className="col-xs-2">
                    	{this.props.data.label}
                    </div>
                    <div className="col-xs-6">
                        <TextBox data={{ "val" : this.props.data.val}} />
                    </div>
                    <div className="col-xs-4"></div>
                </div>
			</div>
        )
    }
});

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

module.exports = React.createClass({
    
	getInitialState : function (){
		return { 
			data : ""
		};
	},

	componentWillMount : function (){

		$(".JsonForm-PlaceHolder").on("click", function (){

		});
	},

	componentDidMount : function (){
	},

	getData : function (name, callback){
		this.props.dataSource.getData(name, function (data){
			callback(data);
		});
	},

	onChange : function (data){
		this.props.onChange(data);
	},

	DomElement : function (typ, props){
		switch(typ){

			case "placeHolder" : 
				break;
			case "text":
				return (this.props.type == "form" ? <TextBoxForm data={props} /> : <TextBox data={props} />)
		}
	},

    render:function(){

    	//if(!this.state.data){
    	//	return null;
    	//}
    	var that = this;
        return (
           <div className="row">
				<div className="col-md-12">
					
					{
						Object.keys(that.props.scheme).map(function (key) {
  							//var elmnt = DOMElements[that.props.type][that.props.scheme[key].typ];
							//return <elmnt label={that.props.scheme[key].label || key} val={"temp"} parent={this} />
							var data = { 
								"label" : (that.props.scheme[key].label || key),
								"val" : "temp" ,
								"parent" : that
							}
							return that.DomElement(that.props.scheme[key].typ, data)
						})
					}
				</div>
			</div>
        )
    }
})