const make = {
  list: function(filelist) {
    let result = "<ol>";
    filelist.forEach(item => {
      result += `<a href="/?id=${item}"><li>${item}</li></a>`;
    });
    result += "</ol>";
    return result;
  },
  template: function(title, list, description) {
    return `
<!DOCTYPE html>
<html>
  <head>
    <title>정글러 - ${title}</title>
    <meta charset="utf-8">
    <script src="https://minxd95.github.io/study/js/colors.js"></script>
    <link rel="stylesheet" href="https://minxd95.github.io/study/js/style.css">
  </head>
  <body>
    <div class="wrap">
      <h1><a href="/">정글러</a></h1>
      <div id="grid">
        ${list}
        <div id="article">
          <h2>${title}</h2>
          <P>${description}</p>
        </div>
      </div>
    </div>
  </body>
</html>
`;
  }
};
module.exports = make;
