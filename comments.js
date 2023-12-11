// create web server
// 1. load modules
var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var url = require('url');
// 2. create web server object
var server = http.createServer(function(req, res){
    // 3. request
    var parsedUrl = url.parse(req.url);
    var resource = parsedUrl.pathname;
    console.log('resource = ' + resource);
    // 4. response
    if(resource == '/create'){
        fs.readFile('./create.html', 'utf-8', function(error, data){
            if(error){
                res.writeHead(500, {'Content-Type':'text/html'});
                res.end('500 Internal Server ' + error);
            }else{
                res.writeHead(200, {'Content-Type':'text/html'});
                res.end(data);
            }
        });
    }else if(resource == '/create_process'){
        var body = '';
        req.on('data', function(data){
            body += data;
        });
        req.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`./data/${title}`, description, 'utf8', function(error){
                if(error){
                    res.writeHead(500, {'Content-Type':'text/html'});
                    res.end('500 Internal Server ' + error);
                }else{
                    res.writeHead(200, {'Content-Type':'text/html'});
                    res.end('success');
                }
            });
        });
    }else if(resource == '/update'){
        fs.readdir('./data', function(error, filelist){
            if(error){
                res.writeHead(500, {'Content-Type':'text/html'});
                res.end('500 Internal Server ' + error);
            }else{
                var list = '';
                for(var i=0; i<filelist.length; i++){
                    list += `<li><a href="/update?id=${filelist[i]}">${filelist[i]}</a></li>`;
                }
                fs.readFile(`./update.html`, 'utf-8', function(error, data){
                    if(error){
                        res.writeHead(500, {'Content-Type':'text/html'});
                        res.end('500 Internal Server ' + error);
                    }else{
                        var template = data.replace('#list', list);
                        res.writeHead(200, {'Content-Type':'text/html'});
                        res.end(template);
                    }
                });
            }
        });
    }else if(resource == '/update'){
        fs.readdir('./data', function(error, filelist){
            if(error){
                res.writeHead(500, {'Content-Type':'text/html'});
                res.end('500 Internal Server ' + error);
            }else{
                var list = '';
                for(var i=0; i<filelist.length; i++){
                    list += `<li><a href="/update?id=${filelist[i]}">${filelist[i]}</a></li>`;
                }
                fs.readFile(`./update.html`, 'utf-8', function(error, data){
                    if(error){
                        res.writeHead(500, {'Content-Type':'text/html'});
                        res.end('500 Internal Server ' + error);
                    }else{
                        var template = data.replace('#list', list);
                        res.writeHead(200, {'Content-Type':'text/html'});
                        res.end(template);
                    }
                });
            }
        });
    }
});