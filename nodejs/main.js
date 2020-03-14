const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");

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
        <p><a href="/write">write article</a></p>
        ${body}
      </body>
    </html>`;
};
const mList = files => {
  let filelist = "";
  files.forEach(element => {
    filelist += `<li><a href="/?id=${element}">${element}</a></li>`;
  });
  return filelist;
};

let app = http.createServer((request, response) => {
  // 브라우저에서 접속시마다 호출됨
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
  } else if (pathname == "/write") {
    fs.readdir("./data", (err, files) => {
      title = "WEB1 - Write";
      filelist = mList(files);
      let template = mContent(
        title,
        filelist,
        `<h2>Write article</h2><p><form action="/write_ok" method="post">
          <p><input type="text" name="title" placeholder="Write title here.." /></p>
          <p><textarea name="content" style="width:500px;height:300px" placeholder="Write content here.." /></textarea></p>
        <p><input type="submit" /></p>
              </form></p>`
      );
      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname == "/write_ok") {
    // if (request.method == "POST") {
    var body = "";
    request.on("data", data => {
      // if (body.length > 1e6) request.connection.destroy(); 과도한 데이터 수신 시 전송 종료.
      body += data;
    });
    request.on("end", () => {
      const post = qs.parse(body);
      const title = post.title;
      const content = post.content;
      fs.writeFile(`data/${title}`, content, "utf8", () => {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end(`title:${title}\ncontent:${content}`);
      });
    });
    //}
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
