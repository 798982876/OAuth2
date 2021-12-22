## 实现步骤
1. 实现GET
2. POST 需要加上`xhr.setRequestHeader("Content-Type","application/json");";`
不然接收到的的body为空

## 设计登录表单
1. `<input>`
2. 获得用户输入的数据
   添加点击事件监听
3. ` xhr.open('POST', 'http://localhost:3000/data', false);//false意为同步`使获得的返回值不为空




