var fs = require("fs");
var buf = new Buffer(111111);
var fontSize = 20;
var fileName = 'style.css'

console.log("准备打开已存在的文件！");
fs.open(fileName, 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打开成功！");
   console.log("准备读取文件：");
   console.log(fd)
   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
         console.log(err);
      }
      // console.log(bytes + "  字节被读取");
      
      // 仅输出读取的字节
      if(bytes > 0){
         // console.log(buf.slice(0, bytes).toString());
         console.log(bytes)
         var str = buf.slice(0, bytes).toString()
         var reg = new RegExp('\\w+'+'px')
         while(reg.exec(str) !== null) {
         	var a = reg.exec(str)[0]
         	a = a.substring(0,a.length-2);
         	a = a / fontSize + 'rem';
         	// console.log(a)
         	str = str.replace(reg, a);
         	// console.log(str)
         }

         fs.writeFile(fileName, str,  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("数据写入成功！");
            console.log("--------我是分割线-------------")
            console.log("读取写入的数据！");

         });

         // console.log(reg.exec(str))
         // str = str.replace(/\d+[p][x]/g, )
         console.log(1)
         // console.log(str + 'hahahaha')
      }
   });
});