const ExpressAPI = require('../ExpressAPI');
const express = new ExpressAPI(7300, "localhost", "connected");
express.Init(2000);
express.RouteGet("/", (req, res) => {
    res.send("Hello world");
}, new express.ResponseModel({
    type: 'string',
    status: 200
}));

// express.websocket.on('connection', (ws) => {
//     console.log('connected')
// })

express.RoutePost("/auth", (req, res) => {
    res.send({
        x: 10,
        y: 20
    });
}, new express.RequestModel(), new express.ResponseModel({
    type: 'number'
}));

express.RoutePut("/update", (req, res) => {
    res.send(200);  
}, null, new express.ResponseModel({
    type: 'number',
    status: 200
}));

console.log(express.getRoutes());