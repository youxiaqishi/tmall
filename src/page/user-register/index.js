/*
* @Author: Administrator
* @Date:   2017-07-30 17:05:33
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-02 21:54:23
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
      // 验证username
      $('#username').blur(function(){
        var username = $.trim($(this).val());
        if(!username){
          return;
        }
        _user.checkUsername(username, function(res){
          formError.hide();
        }, function(errMsg){
          formError.show(errMsg);
        });
      });
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
      	username        : $.trim($('#username').val()),
        phone           : $.trim($('#phone').val()),
        email           : $.trim($('#email').val()),
        question        : $.trim($('#question').val()),
        answer          : $.trim($('#key').val()),
        passwordConfirm : $.trim($('#passwordConfirm').val()),
      	password        : $.trim($('#password').val())
      },
      validataResult = this.formValidata(formData);
      if(validataResult.status){
      	_user.login(formData, function(res){
      		window.location.href =  './result.html?type=register';
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
        if(formData.password.length < 6){
          result.msg = '密码长度不能少于6';
          return result;          
        }
        // 验证两次密码是否一致
       if(formData.password !== formData.passwordConfirm){
          result.msg = '两次输入的密码不一致';
          return result;          
        }
       if(!_mall.validata(formData.phone, 'phone')){
          result.msg = '手机格式不正确';
          return result;          
        }
       if(!_mall.validata(formData.email, 'email')){
          result.msg = '邮箱格式不正确';
          return result;          
        }
        if(!_mall.validata(formData.question, 'require')){
          result.msg = '密码提示问题不能为空';
          return result;
        }
        if(!_mall.validata(formData.answer, 'require')){
          result.msg = '密码提示问答案不能为空';
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
