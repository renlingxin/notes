/* 引入依赖项 */
var express = require('express');
// ……
// body-parser是一个HTTP请求体解析的中间件
// 使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// ……

// 解析 application/json
app.use(bodyParser.json()); 
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());


// <<body-parser模块的API>>
// 当请求体解析之后，解析值会被放到req.body属性中，当内容为空时候，为一个空对象{}
// ---bodyParser.json()--解析JSON格式
// ---bodyParser.raw()--解析二进制格式
// ---bodyParser.text()--解析文本格式
// ---bodyParser.urlencoded()--解析文本格式
