/*
* @Author: Administrator
* @Date:   2017-07-31 07:01:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-05 19:52:03
*/

var _mall = require('util/mall.js');

var _user = {
	// 用户登录
	login : function(userInfo, resolve, reject){
		_mall.request({
			url     : _mall.getServerUrl('/user/login.do'),
			data    : userInfo,
			method  : 'POST',
			success : resolve,
			error   : reject
		});
	},
	// 检查用户名
	checkUsername : function(username, resolve, reject){
		_mall.request({
			url     : _mall.getServerUrl('/user/check_valid.do'),
			data    : {
				type : 'username',
				str  : username
			},
			method  : 'POST',
			success : resolve,
			error   : reject
		});
	},
	// 退出登录
	logout : function(resolve, reject){
		_mall.request({
			url     : _mall.getServerUrl('/user/logout.do'),
			method  : 'POST',
			success : resolve,
			error   : reject
		});
	},
	// 获取密码提示问题
	getQuestion : function(username, resolve, reject){
		_mall.request({
			url     : _mall.getServerUrl('/user/forget_get_question.do'),
			data    : username,
			method  : 'POST',
			success : resolve,
			error   : reject
		});		
	},
	// 检查密码提示问题答案
	checkAnswer : function(userInfo, resolve, reject){
			_mall.request({
			url     : _mall.getServerUrl('/user/forget_check_answer.do'),
			data    : userInfo,
			method  : 'POST',
			success : resolve,
			error   : reject
		});
	},
	// 重置密码
	resetPassword : function(userInfo, resolve, reject){
			_mall.request({
			url     : _mall.getServerUrl('/user/forget_reset_password.do'),
			data    : userInfo,
			method  : 'POST',
			success : resolve,
			error   : reject
		});		
	},
	// 获取用户个人中心
	getUserInfo : function(resolve, reject){
			_mall.request({
			url     : _mall.getServerUrl('/user/get_information.do'),
			method  : 'POST',
			success : resolve,
			error   : reject
		});	
	},
	// 更新个人信息
	updateUserInfo : function(userInfo,resolve, reject){
			_mall.request({
			url     : _mall.getServerUrl('/user/get_information.do'),
			data    : userInfo,
			method  : 'POST',
			success : resolve,
			error   : reject
		});	
	},
	// 登录状态下修改密码
    updatePassword : function(userInfo,resolve, reject){
			_mall.request({
			url     : _mall.getServerUrl('/user/get_information.do'),
			data    : userInfo,
			method  : 'POST',
			success : resolve,
			error   : reject
		});	
	},
	// 检查登录状态
}
module.exports = _user;