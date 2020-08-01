const http=require("http")
const fs=require("fs")
const server=http.createServer(function (req, res) {
    res.writeHead(200,{'Content-Type': 'text/plain'});
    const pattern_status = RegExp('/status/[0-9]{3}');
    const pattern_statusCode = RegExp('[0-9]{3}');
    const pattern_delay=  RegExp('/delay/[0-9]+');
    const pattern_delayTime=  RegExp('[0-9]+');
    let str=req.url;
    let delayUrl=null
    let statusUrl=null
    if(pattern_status.test(str)) statusUrl=str;
    if(pattern_delay.test(str))  delayUrl=str;
     switch(req.url){
         case "/":{
          fs.readFile('readme.txt', function(err, data) {
               if(err){
                    res.writeHead(400);
                    res.end()
                    return
               }
               res.writeHead(200, {'Content-Type': 'text/json'});
               return res.end(data);
            });
         }
         case "/html": 
               fs.readFile('index.html', function(err, data) {
                  if(err){
                    res.writeHead(400);
                    res.end()
                    return
                  }
                  res.writeHead(200, {'Content-Type': 'text/html'});
                  return res.end(data);
               });
               break;
          case "/json":
               fs.readFile('output.json', function(err, data) {
                    if(err){
                    res.writeHead(400);
                    res.end()
                    return
               }
               res.writeHead(200, {'Content-Type': 'text/json'});
               return res.end(data);
               });
               break;
          case  "/uuid":
               let uuid={"uuid": "14d96bb1-5d53-472f-a96e-b3a1fa82addd"}
               res.writeHead(200, {'Content-Type': 'text/json'});
               res.write(JSON.stringify(uuid))
               res.end()
               break;
                   
          case statusUrl :
               try{
               req.statusCode=str.match(pattern_status)[0];
               console.log(req.statusCode)
               res.writeHead(str.match(pattern_statusCode)[0]);
               }
               catch(e){
                    res.write(e)
               }
               res.on('error', (err) => {
                    console.error(err);
               });
               res.write("The status code has been updated to "+str.match(pattern_statusCode)[0])
               res.end();
               break;
          case delayUrl :
               let delay=str.match(pattern_delayTime)[0];
               console.log(delay)
               let delayTime= new Promise((resolve,reject)=>setTimeout(()=>{
                    res.write("This page has been delayed by"+ delay + "seconds")
                    resolve();
               },delay*1000));
               delayTime.then(()=>{res.end()}).catch((err)=>console.log(err))
               break;
          default:
               fs.readFile('readme.txt', function(err, data) {
                    if(err){
                     res.writeHead(400);
                     res.end()
                     return
                    }
                    res.writeHead(200, {'Content-Type': 'text/json'});
                    res.write("you may entered wrong url")
                    return res.end(data);
                    });

          }                    
}).listen(8085);


  
  