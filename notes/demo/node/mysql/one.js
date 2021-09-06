const db =require('./index.js');

// 获取id 为1 的数据
// db.q(`select * from user where id=?`,['11'],function(err,results){
//     if(err) throw err;console.log(results);
// }) 

// 显示所有的数据
db.q(`select * from user`,[''],function(err,results){
    if(err) throw err;
    
    console.log(results);
    
}) 
// console.log(ren);
// 插入数据
// db.q(`insert into user (id,username,pwd) values (?,?,?)`,[11,'renlingxin',123],function(err,results){
//     if(err) throw err;
//     console.log(results);
// }) 