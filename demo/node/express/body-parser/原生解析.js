const http = require('http');

http.createServer(function(req, res){
    if(req.method.toLowerCase() === 'post'){
        let body = '';
        //此步骤为接收数据
        req.on('data', function(chunk){
            body += chunk;
        });
        //开始解析
        req.on('end', function(){
            if(req.headers['content-type'].indexOf('application/json')!==-1){
                JSON.parse(body);
            }else if(req.headers['content-type'].indexOf('application/octet-stream')!==-1){
                //Rwa格式请求体解析
            }else if(req.headers['content-type'].indexOf('text/plain')!==-1){
                //text文本格式请求体解析
            }else if(req.headers['content-type'].indexOf('application/x-www-form-urlencoded')!==-1){
                //url-encoded格式请求体解析
            }else{
            //其他格式解析
            }
        })
    }else{
        res.end('其他方式提交')
    }
}).listen(3000)