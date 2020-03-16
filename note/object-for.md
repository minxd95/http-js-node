## 객체의 내용을 반복문으로 읽기
```javascript
const team = {
  top: "minxd",
  mid: "Jin",
  jungle: "copotter"
}

for (var i in team) {
  console.log(`${i} : ${team[i]}`);
}
```


>Result :
```
top : minxd
mid : Jin
jungle : copotter
```


for문 안에서 i 는 team 객체의 속성명(index)이 된다.
'객체명[index]' 의 형태로 각각의 속성값을 불러올 수 있다.
