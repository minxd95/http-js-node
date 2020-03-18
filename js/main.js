const http = require("http");
const url = require("url");
const fs = require("fs");
const make = require("./lib/make.js");

const app = http.createServer((request, response) => {
  const _url = request.url;
  const _pathname = url.parse(_url, true).pathname;
  const _query = url.parse(_url, true).query;

  if (_pathname == "/") {
    if (_query.id != undefined) {
      const _title = _query.id;
      fs.readdir(`data`, "utf8", (err, list) => {
        fs.readFile(`data/${_title}`, "utf8", (err, _description) => {
          const _list = make.list(list);
          const _template = make.template(_title, _list, _description);
          response.writeHead(200);
          response.end(_template);
        });
      });
    } else {
      const _title = "Main";
      fs.readdir("data", "utf8", (err, list) => {
        const _list = make.list(list);
        fs.readFile("data/Main", "utf8", (err, _description) => {
          const _template = make.template(_title, _list, _description);
          response.writeHead(200);
          response.end(_template);
        });
      });
    }
  }

  //   response.writeHead(200);
  //   response.end("success");
});
app.listen(3000);
