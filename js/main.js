const http = require("http");
const url = require("url");
const fs = require("fs");
const make = require("./lib/make.js");
const qs = require("querystring");

const app = http.createServer((request, response) => {
  const _url = request.url;
  const _pathname = url.parse(_url, true).pathname;
  const _query = url.parse(_url, true).query;

  if (_pathname == "/") {
    if (_query.id != undefined) {
      const _title = _query.id;
      fs.readdir(`./data`, "utf8", (err, list) => {
        fs.readFile(`./data/${_title}`, "utf8", (err, _description) => {
          const _list = make.list(list);
          const _template = make.template(
            _title,
            _list,
            `<p><a href="/write">[글 쓰기]</a>
            <a href="/modify?id=${_title}">[글 수정]</a>
            <a href="/delete?id=${_title}">[글 삭제]</a></p>
            <h2>${_title}</h2>
            <P>${_description}</p>`
          );
          response.writeHead(200);
          response.end(_template);
        });
      });
    } else {
      const _title = "Main";
      fs.readdir("./data", "utf8", (err, list) => {
        const _list = make.list(list);
        const _template = make.template(
          _title,
          _list,
          `<p><a href="/write">[글 쓰기]</a></p>${make.main}`
        );
        response.writeHead(200);
        response.end(_template);
      });
    }
  } else if (_pathname == "/write") {
    fs.readdir("./data", "utf8", (err, list) => {
      const _title = "Write";
      const _list = make.list(list);
      const _template = make.template(
        _title,
        _list,
        `<div>
        <h2>게시글 작성</h2>
        <form action="/write_ok" method="post">
        <p><input type="text" name="title" placeholder="제목을 입력하세요. (영문만 가능)" style="width:500px;" /></p>
        <p><textarea name="description" placeholder="내용을 입력하세요." style="width:500px;height:300px;"></textarea></p>
        <p><input type="submit" value="작성" style="width:100px;"></p></form>
        <p><a href="javascript:history.back();">[뒤로가기]</a></p>
        </div>`
      );
      response.writeHead(200);
      response.end(_template);
    });
  } else if (_pathname == "/write_ok") {
    let _body = "";
    request.on("data", data => {
      _body += data;
    });
    request.on("end", () => {
      const _post = qs.parse(_body);
      const _title = _post.title;
      const _description = _post.description;
      fs.writeFile(`data/${_title}`, _description, "utf8", () => {
        response.writeHead(302, { Location: `./?id=${_title}` });
        response.end();
      });
    });
  } else if (_pathname == "/modify") {
    fs.readdir("./data", "utf8", (err, list) => {
      const _title = "Modify";
      const _list = make.list(list);
      const _id = _query.id;
      fs.readFile(`./data/${_id}`, "utf8", (err, _description) => {
        const _template = make.template(
          _title,
          _list,
          `<div>
        <h2>게시글 수정</h2>
        <form action="/modify_ok" method="post">
        <p><input type="hidden" name="id" value="${_id}"/></p>
        <p><input type="text" name="title" placeholder="제목을 입력하세요. (영문만 가능)" value="${_id}" style="width:500px;" /></p>
        <p><textarea name="description" placeholder="내용을 입력하세요." style="width:500px;height:300px;">${_description}</textarea></p>
        <p><input type="submit" value="작성" style="width:100px;"></p>
        <p><a href="javascript:history.back();">[뒤로가기]</a></p></form>
        </div>`
        );
        response.writeHead(200);
        response.end(_template);
      });
    });
  } else if (_pathname == "/modify_ok") {
    let _body = "";
    request.on("data", data => {
      _body += data;
    });
    request.on("end", () => {
      _post = qs.parse(_body);
      fs.rename(`./data/${_post.id}`, `./data/${_post.title}`, err => {
        fs.writeFile(`./data/${_post.title}`, _post.description, err => {
          response.writeHead(302, { Location: `./?id=${_post.title}` });
          response.end();
        });
      });
    });
  } else if (_pathname == "/delete") {
    fs.unlink(`./data/${_query.id}`, () => {
      response.writeHead(302, { Location: "/" });
      response.end();
    });
  } else {
    response.writeHead(404);
    response.end("File not found");
  }
});
app.listen(3000);
