const ExpressAPI = require('../ExpressAPI');
const express = new ExpressAPI(7300, "localhost", "connected");
express.Init(2000);
express.RouteGet("/", (req, res) => {
    res.send("Hello world");
}, new express.ResponseModel({
    type: 'string',
    status: 200
}));

const WebSocket = require('ws');
const WebSocketServer = new WebSocket('ws://localhost:2000');

WebSocketServer.onopen = () => {
    console.log('Connected to WebSocket');
    let i = 0;
    setInterval(() => {
        i = i + 1;
        WebSocketServer.send(JSON.stringify({data: i}))
    }, 2000);
}

express.RoutePost("/auth", (req, res) => {
    res.send({
        x: 10,
        y: 20
    });
}, new express.RequestModel(), new express.ResponseModel({
    type: 'object'
}));

express.RoutePut("/update", (req, res) => {
    res.send(200);  
}, null, new express.ResponseModel({
    type: 'number',
    status: 200
}));

console.log(express.getRoutes());