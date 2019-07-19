const http=require("http");
const myapp=require("./myapp");
const config=require("./config");

const port = process.env.PORT || config.port;

const server=http.createServer(myapp);

server.listen(port);