/*
* @Author: Administrator
* @Date:   2017-07-30 12:14:59
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-30 12:47:52
*/
require('./index.css');
var _mall = require('util/mall.js');
var header = {
	init : function(){
		this.bindEvent();
	},
	onLoad : function(){
		var keyword = _mall.getUrlParam('keyword');
		if(keyword){
			$('#search-btn').val(keyword);
		}
	},
	bindEvent : function(){
        var _this = this;
        $('#search-btn').click(function(){
        	_this.searchSubmit();
        });
        // 输入回车后，做提交操作
        $('#search-input').keyup(function(e){
        	if(e.keyCode === 13){
        		_this.searchSubmit();
        	}
        });
	},
	// 搜索提交
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}
		// keyword为空，返回主页
		else{
			_mall.goHome();
		}
	}
};
header.init();