const http=require("http")
const fs=require("fs")
//creating http server 
http.createServer(function (req, res) {
    res.writeHead(200,{'Content-Type': 'text/plain'});
    res.end(fs.readFileSync("readme.txt"))
}).listen(8087)