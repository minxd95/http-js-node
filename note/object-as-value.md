## 값으로서의 함수
```javascript
var f = function(){
  console.log(1+1);
  console.log(1+2);
}
var a = [f]; // 1.
a[0]();
 
var o = {
  func:f // 2.
}
o.func();
```
> Result :
```javascript
2
3
2
3
```

1. 함수는 배열의 요소가 될 수 있다.
2. 함수는 객체의 메소드로 정의될 수 있다.

```javascript
var a = if(true){console.log('success')};
var b = while(true){console.log('success')};
```
> Result :
```
...\exam.js:1
var a = if (true) { console.log('success') };
        ^^
SyntaxError: Unexpected token 'if'
    at wrapSafe (internal/modules/cjs/loader.js:1063:16)
    at Module._compile (internal/modules/cjs/loader.js:1111:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1167:10)
    at Module.load (internal/modules/cjs/loader.js:996:32)
    at Function.Module._load (internal/modules/cjs/loader.js:896:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:71:12)
    at internal/main/run_main_module.js:17:47
```

에러 원인 : 제어문은 값이 아니기 때문에 변수에 대입될 수 없다.