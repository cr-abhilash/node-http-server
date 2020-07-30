const http=require("http")
const fs=require("fs")
//creating http server 
http.createServer(function (req, res) {
    res.writeHead(200,{'Content-Type': 'text/plain'});
    if(req.url === "/html"){
        req.url = "/index.html";
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.end(fs.readFileSync("."+req.url));
    }
    else if(req.url === "/json"){
        res.writeHead(200,{'Content-Type': 'text/json'});
        req.url = "/output.json";
        res.end(fs.readFileSync("."+req.url));
    }
    
}).listen(8087)