var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer((request,response) => {
    var _url = request.url;
    var queryData = url.parse(_url, true).query; // 요청된 url의 쿼리데이터 가져오기
    const pathname = url.parse(_url, true).pathname;
    let title;
    let filelist="";
    let files=[];
    fs.readdir("./data", (err, files) => {
      if(err) throw err;
    });
    files.forEach((file,index) => {
      filelist+=`<li><a href="/?id=${file}">${file}</a></li>`;
    });
    console.log(filelist);
    if(pathname=='/') {
      if(queryData.id==undefined) {
        title = 'Welcome';
        description = 'Hello, node.js'
        var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ol>
            ${filelist}
          </ol>
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;
        response.writeHead(200);
        response.end(template);
      } else {
        title=queryData.id;
        fs.readFile(`data/${title}`, 'utf8', (err,description) => {
          //if(err) throw err;
          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ol>
              ${filelist}
            </ol>
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template);
        });
      }
    } else {
      response.writeHead(404);
      response.end('Not found');
    }

});
app.listen(3000);
