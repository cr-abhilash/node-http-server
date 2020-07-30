const http=require("http")
const fs=require("fs")
//creating http server 
http.createServer(function (req, res) {
    res.writeHead(200,{'Content-Type': 'text/plain'});
    const pattern_status = RegExp('/status/[0-9]{3}');
    const pattern_statusCode = RegExp('[0-9]{3}');
    let str=req.url;
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
    else if(pattern_status.test(req.url)){ This is default page!!
        req.statusCode=str.match(pattern_statusCode)[0];
        res.writeHead(str.match(pattern_statusCode)[0]);
        res.url="/"
        res.write("The status code has been updated to "+str.match(pattern_statusCode)[0])
        res.end();
   }
    
}).listen(8087)