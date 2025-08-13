const http = require('http')
const app = require("./src/app");
const connectDB = require("./src/db/db");
const SetupSocketioserver = require("./src/socket/socket.server");

const httpServer = http.createServer(app)

SetupSocketioserver(httpServer)

connectDB()

httpServer.listen(3000,()=>{
    console.log('server running on port 3000');
})