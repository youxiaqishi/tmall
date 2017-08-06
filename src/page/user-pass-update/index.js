/*
* @Author: Administrator
* @Date:   2017-08-05 10:59:46
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-06 10:39:50
*/

require('./index.css');
require('page/commons/nav/index.js');
require('page/commons/header/index.js');
var navSide       = require('page/commons/nav-side/index.js');
var _mall         = require('util/mall.js');
var _user         = require('service/user-service.js');

// 表单里的错误信息
var page = {
    init : function(){
    	this.onLoad();
    	this.bindEvent();
    },
    onLoad : function(){
    	navSide.init({
    		name : 'user-pass-update'
    	});
    },
    bindEvent : function(){
    	var _this = this;
    	$(document).on('click','.btn-submit', function(){
           var userInfo = {
               password        : $.trim($('#password').val()),
               passwordNew     : $.trim($('#password-new').val()),
               passwordConfirm : $.trim($('#password-confirm').val())
           },
           validateResult = _this.formValidata(userInfo);
           if(validateResult.status){
               _user.updatePassword({
               	passwordOld : userInfo.password,
               	passwordNew : userInfo.passwordNew,
               }, function(res, msg){
                  _mall.successTips(msg);
               }, function(errMsg){
               	_mall.errorTips(errMsg);
               })
           }else{
               _mall.errorTips(validateResult.msg);
           }
    	});
    },
    // 验证字段信息
    formValidata : function(formData){
    	var result = {
            status : false,
            msg    : ''
    	};
        // 验证密码不能为空
       if(!_mall.validata(formData.password, 'require')){
          result.msg = '原密码不能为空';
          return result;          
        }
        // 新密码长度
        if(!formData.passwordNew || formData.passwordNew.length < 6){
          result.msg = '密码长度不能少于6位';
          return result;       	
        }
        // 验证密码提示问题
        if(formData.passwordNew !== formData.passwordConfirm){
          result.msg = '两次输入的密码不一致';
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
});