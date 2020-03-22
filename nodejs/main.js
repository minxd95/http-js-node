const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");
const m = require("./lib/template.js");
const path = require("path");

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
      filelist = m.List(files);
      if (queryData.id == undefined) {
        title = "Welcome";
        description = "Hello, node.js";
        let template = m.Content(
          title,
          filelist,
          `<h2>${title}</h2><p>${description}</p>`,
          `<p><a href="/write">Write</a></p>`
        );
        response.writeHead(200);
        response.end(template);
      } else {
        title = queryData.id;
        filteredId = path.parse(queryData.id).base;
        console.log(filteredId);
        fs.readFile(`data/${filteredId}`, "utf8", (err, description) => {
          //if(err) throw err;
          let template = m.Content(
            title,
            filelist,
            `<h2>${title}</h2><p>${description}</p>`,
            `<p><a href="/write">Write</a> <a href="/update?id=${title}">Update</a>
            <form action="delete_ok" method="post">
              <input type="hidden" name="id" value="${title}">
              <input type="submit" value="Delete">
            </form>`
          );
          response.writeHead(200);
          response.end(template);
        });
      }
    });
  } else if (pathname == "/write") {
    fs.readdir("./data", (err, files) => {
      title = "Write";
      filelist = m.List(files);
      let template = m.Content(
        title,
        filelist,
        `<h2>Write article</h2><p><form action="/write_ok" method="post">
          <p><input type="text" name="title" placeholder="Write title here.." /></p>
          <p><textarea name="description" style="width:500px;height:300px" placeholder="Write description here.." ></textarea></p>
        <p><input type="submit" /></p>
              </form></p>`,
        `<a href="javascript:history.back()">Back</a>`
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
      const description = post.description;
      fs.writeFile(`data/${title}`, description, "utf8", () => {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();
      });
    });
    //}
  } else if (pathname == "/update") {
    fs.readdir("./data", (err, files) => {
      title = `${queryData.id}`;
      filteredId = path.parse(queryData.id).base;
      console.log(filteredId);
      filelist = m.List(files);
      fs.readFile(`data/${filteredId}`, "utf8", (err, description) => {
        let template = m.Content(
          title,
          filelist,
          `<h2>Update article</h2><p><form action="/update_ok" method="post">
          <input type="hidden" name="id" value='${title}'/>
          <p><input type="text" name="title" placeholder="Write title here.." value='${title}'/></p>
          <p><textarea name="description" style="width:500px;height:300px" placeholder="Write description here.." />${description}</textarea></p>
        <p><input type="submit" /></p>
              </form></p>`,
          `<a href='javascript:history.back()'>Back</a>`
        );
        response.writeHead(200);
        response.end(template);
      });
    });
  } else if (pathname == "/update_ok") {
    // if (request.method == "POST") {
    var body = "";
    request.on("data", data => {
      // if (body.length > 1e6) request.connection.destroy(); 과도한 데이터 수신 시 전송 종료.
      body += data;
    });
    request.on("end", () => {
      const post = qs.parse(body);
      const title = post.title;
      const filteredId = path.parse(post.title).base;
      const id = post.id;
      const description = post.description;
      console.log(post);
      fs.rename(`data/${id}`, `data/${filteredId}`, err => {
        fs.writeFile(`data/${filteredId}`, description, "utf8", err => {
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        });
      });
    });
    //}
  } else if (pathname == "/delete_ok") {
    // if (request.method == "POST") {
    var body = "";
    request.on("data", data => {
      // if (body.length > 1e6) request.connection.destroy(); 과도한 데이터 수신 시 전송 종료.
      body += data;
    });
    request.on("end", () => {
      const post = qs.parse(body);
      const filteredId = path.parse(post.id).base;
      fs.unlink(`data/${filteredId}`, err => {
        response.writeHead(302, { Location: `/` });
        response.end();
      });
    });
    //}
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
