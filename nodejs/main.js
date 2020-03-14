let http = require("http");
let fs = require("fs");
let url = require("url");

const mContent = (title, filelist, body) => {
  return `<!doctype html>
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
        ${body}
      </body>
    </html>`;
};
const mList = files => {
  let filelist = "";
  files.forEach(element => {
    filelist += `<li><a href="?id=${element}">${element}</a></li>`;
  });
  return filelist;
};

let app = http.createServer((request, response) => {
  let _url = request.url;
  let queryData = url.parse(_url, true).query; // 요청된 url의 쿼리데이터 가져오기
  const pathname = url.parse(_url, true).pathname;
  let title;
  let filelist = "";
  let files = [];
  if (pathname == "/") {
    fs.readdir("./data", (err, files) => {
      // if (err) throw err;
      filelist = mList(files);
      if (queryData.id == undefined) {
        title = "Welcome";
        description = "Hello, node.js";
        let template = mContent(
          title,
          filelist,
          `<h2>${title}</h2><p>${description}</p>`
        );
        response.writeHead(200);
        response.end(template);
      } else {
        title = queryData.id;
        fs.readFile(`data/${title}`, "utf8", (err, description) => {
          //if(err) throw err;
          let template = mContent(
            title,
            filelist,
            `<h2>${title}</h2><p>${description}</p>`
          );
          response.writeHead(200);
          response.end(template);
        });
      }
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
