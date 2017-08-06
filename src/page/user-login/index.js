/*
* @Author: Administrator
* @Date:   2017-07-30 17:05:33
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-31 21:16:25
*/
require('./index.css');
require('page/commons/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mall = require('util/mall.js');

// 表单里的错误信息
var formError ={
	show : function(errMsg){
       $('.error-item').show().find('.err-msg').text(errMsg);
	},
    hide : function(){
       $('.error-item').hide().find('.err-msg').text('');
	}
};
var page = {
    init : function(){
    	this.bindEvent();
    },
    bindEvent : function(){
    	var _this = this;
    	$('#btn-submit').click(function(){
    		_this.submit();
    	});
    	$('.user-content').keyup(function(e){
	    	if(e.keyCode === 13){
              _this.submit();
	    	}    		
    	})
    },
    // 提交表单
    submit : function(){
      var formData = {
      	username : $.trim($('#username').val()),
      	password : $.trim($('#password').val())
      },
      validataResult = this.formValidata(formData);
      if(validataResult.status){
      	_user.login(formData, function(res){
      		window.location.href = _mall.getUrlParam('redirect') || './index.html';
      	}, function(errMsg){
          formError.show(errMsg);
      	});
      }else{
      	formError.show(validataResult.msg);
      }

    },
    // 表单字段验证
    formValidata : function(formData){
    	var result = {
            status : false,
            msg    : ''
    	};
        if(!_mall.validata(formData.username, 'require')){
        	result.msg = '用户名不能为空';
        	return result;
        }
        if(!_mall.validata(formData.password, 'require')){
        	result.msg = '密码不能为空';
        	return result;
        }
        // 验证通过，返回正确提示
        result.status = true;
        result.msg    = '验证通过';
        return result;
    }
};
$(function(){
	page.init();

})
