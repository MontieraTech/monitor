
"use strict";

var $ = require('jquery');

module.exports = {

    getJSONP : function (url, idx, callback){
        $.ajax({
            url:url,
            dataType:"jsonp",
            success : function (data){
                callback(idx, data);
            },
            error:function (data){
                callback(idx, null);
            }
        })
    },

    getJSON : function(url, idx, callback){
        $.ajax({
            url:url,
            dataType:"json",
            success : function (data){
                callback(idx, data);
            },
            error:function (data){
                callback(idx, null);
            }
        })
    },
    
    get : function(url){
        return new Promise(function(success,error){
            $.ajax({
                url:url,
                success:success,
                error:error
            })
        })
    },
    post:function(url,data){
        return new Promise(function(success,error){
            $.ajax({
                url:url,
                type:"POST",
                data:data,
                success:success,
                error:error
            })
        })
    },
    patch:function(url,data){
        return new Promise(function(success,error){
            $.ajax({
                url:url,
                type:"PATCH",
                data:data,
                success:success,
                error:error
            })
        })
    },
    del:function(url){
        return new Promise(function(success,error){
            $.ajax({
                url:url,
                type:"DELETE",
                success:success,
                error:error
            })
        })
    }
}