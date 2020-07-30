const http=require("http")
const fs=require("fs")
//creating http server 
http.createServer(function (req, res) {
    res.writeHead(200,{'Content-Type': 'text/plain'});
    if(req.url === "/html"){
        req.url = "/index.html";
        res.writeHead(203,{'Content-Type': 'text/html'});
        res.end(fs.readFileSync("."+req.url));
    }
    
}).listen(8087)