var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量的配置线上online 开发Dev
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
//获取html-webpack-plugin参数的函数
var getHtmlConfig = function(name, title){
	return {
		template : './src/view/'+ name +'.html',
      	filename : 'view/'+ name +'.html',
        title    : title,
      	inject   : true,
      	hash     : true,
      	chunks   : ['common', name]
	}
}
//webpack config文件
var config = {
    entry: {
      'result': ['./src/page/result/index.js'],
    	'common': ['./src/page/commons/index.js'],
    	'index' : ['./src/page/index/index.js'],
    	'login' : ['./src/page/login/index.js']
    },
    output: {
        path: "./dist",
        publicPath : '/dist', //解决文件匹配 此时代表http://localhost:8088
        filename: "js/[name].js"
    },
    externals :{
     'jquery' : 'window.jQuery' //怎样引入jquery
    },

    module: {
    		loaders: [
        { 
          test: /\.string$/,
          loader: 'html-loader'
        },
    		{ 
    			test: /\.css$/,
    			loader: ExtractTextPlugin.extract("style-loader", "css-loader") //?
    		},
		
        {
　　　　　　test: /\.(png|jpg|GIF|gif|woff|svg|eot|ttf)\??.*$/,
　　　　　　loader: 'url-loader?limit=100&name=resouce/[name].[ext]' //?
　　　　}
         ]
    },
    resolve : {
      alias : {
        node_modules    : __dirname + '/node_modules',
        util    : __dirname + '/src/util',
        page    : __dirname + '/src/page',
        service : __dirname + '/src/service',
        image   : __dirname + '/src/image',
      }
    },
    plugins :[
      //独立模块到js/base.js
      new webpack.optimize.CommonsChunkPlugin({
      	name :'common', //通用模块的处理
      	filename : 'js/base.js'
      }),
      //打包css独立文件
      new ExtractTextPlugin("css/[name].css"),
      //html模板处理
      new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
      new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
      new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))

    ]
};
if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}



module.exports  = config;