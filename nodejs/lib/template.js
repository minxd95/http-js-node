const m = {
  Content: (title, filelist, body, control) => {
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
        ${control}
        ${body}
      </body>
    </html>`;
  },
  List: files => {
    let filelist = "";
    files.forEach(element => {
      filelist += `<li><a href="/?id=${element}">${element}</a></li>`;
    });
    return filelist;
  }
};

module.exports = m;
