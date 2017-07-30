/*
* @Author: Administrator
* @Date:   2017-07-30 17:07:42
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-30 17:32:48
*/

require('./index.css');
require('page/commons/nav-simple/index.js');
var _mall = require('util/mall.js');

$(function(){
	var type = _mall.getUrlParam('type') || 'default',
	    $element = $('.' + type + '-success');
	    // 显示对应的操作
	$element.show();
})