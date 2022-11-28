const ExpressAPI = require('../ExpressAPI');
const express = new ExpressAPI(7300, "localhost", "connected");
express.Init();
express.RouteGet("/", (req, res) => {
    res.send("Hello world");
}, new express.ResponseModel({
    type: 'string',
    status: 200
}));

express.RoutePost("/auth", (req, res) => {
    res.send("HEllo world");
});

express.RoutePut("/update", (req, res) => {
    res.send(200);
}, new express.ResponseModel({
    type: 'number',
    status: 200
}));

console.log(express.getRoutes());