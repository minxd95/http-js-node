myfunc = (a, b, callback) => {
  a += 10;
  b += 10;
  callback(a, b);
};

myfunc(1, 2, (i, j) => {
  console.log(i + j);
});
