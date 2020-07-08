const http = require('http')


var https = http.createServer((req, res) => {
    console.log(req)
    res.end('dfsdf')
    // res.send('fdsd')
})
https.listen(9999, () => {
    console.log(9999)
})