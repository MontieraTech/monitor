
"use strict";

var React = require('react');


var File = React.createClass({

	onBlurEvent : function (){
		if(this.props.data.dataSource){
			this.props.data.dataSource.onChange(this.props.data.id, this.props.data.key, this.refs.filepath.value);
		}

		if(this.props.data.parent){
			this.props.data.parent.onBlurEvent(this.refs.filepath.value);
		}
	},

	onChangeEvent : function (){
		this.refs.filepath.value = this.refs.file.value;
		this.onBlurEvent();
	},

	componentDidMount : function (){
		this.refs.filepath.value = this.props.data.val;

		$('#btn-upload').click(function(e){
        	e.preventDefault();
        	$('#file').click();
        });
	},

	componentDidUpdate : function (){
		$(this.refs.file).focus();
	},

    render:function(){
    	// <input ref="tbx" type="text" className="form-control " onBlur={this.onBlurEvent} />

        return (
           <div className="JsonForm-Component-Wrapper">
           		<input type='file' id='file' className="json-form-element-file" ref='file' style={{"width":"0", "height":"0"}} onChange={this.onChangeEvent} onBlur={this.onChangeEvent} />
           		
           		<div className="row">
           			<div className="col-xs-12">
           				<div style={{"float":"left"}} >
           					<input type="text" ref="filepath" className="json-form-element-file" onBlur={this.onBlurEvent} />
           				</div>
           				<div style={{"float":"left"}} >
           					<button id='btn-upload' className="json-form-element-file">Browse</button>
           				</div>
					</div>
				</div>
           		
			</div>
        )
    }
});

var FileForm = React.createClass({

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
                        <File data={this.props.data} />
                    </div>
                    <div className="col-xs-4"></div>
                </div>
			</div>
        )
    }
});


module.exports = {
	Form : FileForm, 
	Control : File
}