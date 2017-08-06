/*
* @Author: Administrator
* @Date:   2017-07-30 12:59:31
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-05 19:34:36
*/

require('./index.css');
var _mall = require('util/mall.js');
var templateIndex = require('./side.string');
// 侧边导航
var navSide = {
	option : {
		name : '',
		navList : [
           {name: 'user-center', desc: '个人中心',href: './user-center.html'},
           {name: 'order-list', desc: '我的订单',href: './order-list.html'},
           {name: 'user-pass-update', desc: '修改密码',href: './user-pass-update.html'},
           {name: 'about', desc: '关于',href: './about.html'}
		] 
	},
	// 渲染导航菜单
	init : function(option){
		$.extend(this.option, option);
		this.renderNav();
	},
	renderNav : function(){
		// 计算active 数据
		for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
			if(this.option.navList[i].name === this.option.name){
				this.option.navList[i].isActive = true;
			}
		}
		// 渲染list
		var navHtml = _mall.renderHtml(templateIndex,{
			navList : this.option.navList
		});
		// 显示html
		$('#nav-side').html(navHtml);
	}
};
module.exports = navSide;