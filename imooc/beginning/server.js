/**
 * Created by su on 16/12/8.
 */
var http = require('http')//引用http模块，用js写的，用来创建一个web服务器或处理http相关的任务；
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.end('Hello Wrold\n')
}).listen(1337,'127.0.0.1')