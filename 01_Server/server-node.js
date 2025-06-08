const http = require('http');
const hostname = '127.0.0.1';

const port = 3000;

const server  = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        res.end("Home Page.");
    }else if (req.url === '/contact'){
        res.statusCode = 200
        res.setHeader('Content-Type','text/plain');
        res.end("Contact-Page")
    }else{
        res.statusCode = 404
        res.setHeader('Content-Type','text/plain');
        res.end("404 Page Not found");
    }
})

server.listen(port,hostname,()=>{
    console.log(`Server is running on location http://${hostname}:${port}`)
})
