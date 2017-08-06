/*
* @Author: Administrator
* @Date:   2017-08-05 10:59:46
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-06 09:12:01
*/

require('./index.css');
require('page/commons/nav/index.js');
require('page/commons/header/index.js');
var navSide       = require('page/commons/nav-side/index.js');
var _mall         = require('util/mall.js');
var _user         = require('service/user-service.js');
var templateIndex = require('./index.string');

// 表单里的错误信息
var page = {
    init : function(){
    	this.onLoad();
    	this.bindEvent();
    },
    onLoad : function(){
    	navSide.init({
    		name : 'user-center'
    	});
    	this.loadUserInfo();
    },
    bindEvent : function(){
    	var _this = this;
    	$(document).on('click','.btn-submit', function(){
           var userInfo = {
               phone : $.trim($('#phone').val()),
               email : $.trim($('#email').val()),
               question : $.trim($('#question').val()),
               answer : $.trim($('#answer').val())
           },
           validateResult = _this.formValidata(userInfo);
           if(validateResult.status){
               _user.updateUserInfo(userInfo, function(res, msg){
                  _mall.successTips(msg);
                  window.location.href = './user-center.html';
               }, function(errMsg){
               	_mall.errorTips(errMsg);
               })
           }else{
               _mall.errorTips(validateResult.msg);
           }
    	});
    },
    // 加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
       _user.getUserInfo(function(res){
          userHtml = _mall.renderHtml(templateIndex, res);
          $('.panel-body').html(userHtml);
       }, function(errMsg){
          _mall.errorTips(errMsg);
       })
    },
    // 验证字段信息
    formValidata : function(formData){
    	var result = {
            status : false,
            msg    : ''
    	};
        // 验证两次密码是否一致
       if(!_mall.validata(formData.phone, 'phone')){
          result.msg = '手机格式不正确';
          return result;          
        }
        // 验证邮箱格式
       if(!_mall.validata(formData.email, 'email')){
          result.msg = '邮箱格式不正确';
          return result;          
        }
        // 验证密码提示问题
        if(!_mall.validata(formData.question, 'require')){
          result.msg = '密码提示问题不能为空';
          return result;
        }
        // 验证密码提示问题答案
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