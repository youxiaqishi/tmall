/*
* @Author: Administrator
* @Date:   2017-07-30 17:05:33
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-04 21:32:56
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
    data : {
      username  : '',
      question  : '',
      answer    : '',
      password  : ''
    },
    init : function(){
      this.onLoad();
    	this.bindEvent();
    },
    onLoad : function(){
      this.loadStepUsername();
    },
    bindEvent : function(){
    	var _this = this;
      // 用户名下一步的点击
      $('#submit-username').click(function(){
        var username = $.trim($('#username').val());
        if(username){
          _user.getQuestion(username, function(res){
             _this.data.username = username;
             _this.data.question = res;
             _this.loadStepQusetion();
          }, function(errMsg){
            formError.show(errMsg);
          })
        }
      });
      // 密码提示问题答案下一步的点击
      $('#submit-answer').click(function(){
        var answer = $.trim($('#answer').val());
        if(answer){
          _user.checkAnswer( {
            username : _this.data.username,
            question : _this.data.question,
            answer   : answer
          }, function(res){
             _this.data.answer = answer;
             _this.data.token  = token;
            _this.loadStepPassword();
          }, function(errMsg){
            formError.show(errMsg);
          })
        }
      });
      // 新密码的下一步的点击
      $('#submit-password').click(function(){
        var password = $.trim($('#password').val());
        if(answer && password.length >= 6){
          _user.resetPassword( {
            username : _this.data.username,
            passwordNew : password,
            forgetToken : _this.data.token
          }, function(res){
            window.location.href = 'result.html?type=pass-reset';
          }, function(errMsg){
            formError.show(errMsg);
          })
        }
        else{
          formError.show('请输入不少于6位的新密码');
        }
      });
    },
    // 加载输入用户名的一步
    loadStepUsername : function(){
       $('.step-username').show();
    }, 
    // 加载输入密码提示问题
    loadStepQusetion : function(){
       formError.hide();
       $('.step-username').hide()
           .siblings('.step-question').show()
           .find('.question').text(this.data.question);
    },
    // 加载输入密码提示问题答案 
    loadStepPassword : function(){
       formError.hide();
       $('.step-question').hide()
           .siblings('.step-password').show();
    } 
};
$(function(){
	page.init();

})
