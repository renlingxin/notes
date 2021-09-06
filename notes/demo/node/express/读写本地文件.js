routers.post('/postcomment:cid', (req, res) => {
    let {
        cid
    } = req.params;
    let data = req.body;
    console.log(data);
    let newdata = {
        "user_name": "匿名用户",
        "add_time": data.time,
        "content": data.content
    }
    // 将接收的数据写入comment.json
    fs.readFile('./json/comment.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var person = data.toString(); //将二进制的数据转换为字符串
        person = JSON.parse(person); //将字符串转换为json对象
        for (item of person) {
            // console.log(item);
            if (item.id == cid) {
                item.message.push(newdata);
            }
        }
        let str = JSON.stringify(person);
        fs.writeFile('./json/comment.json', str, (err) => {
            if (err) {
                console.log
            };
            console.log('写完文件了');
        });
    })
    res.send('提交好了哦！')
})