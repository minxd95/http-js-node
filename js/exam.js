/*
const로 정의된 함수를 재할당 하면 오류 발생
const test = (a,b) => {
  return a+b;
}
test = (a,b,c) => {
  return a*b*c;
}
*/

let test = (a,b) => {
  return a+b;
}
console.log(test(1,3));
test = (a,b,c) => {
  return a*b*c;
}
console.log(test(1,2,3));
// 정상작동
