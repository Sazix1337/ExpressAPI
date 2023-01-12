module.exports = class WebSocket {
    constructor(wsPort) {
        const WebSocket = require('ws');

        function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        const wss = new WebSocket.Server({port: wsPort});

        const clients = new Map();
        wss.on('connection', ws => {
            const id = uuidv4();
            const data = { connectionId: id };
            console.log('WebSocket Started');

            clients.set(data);
            console.log(`New client connected with id: ${id}`);

            ws.on('message', msg => {
                const message = JSON.parse(msg);
                message.sender = data.connectionId;

                console.log('New Message:', message);
            });

            ws.on("close", () => {
                clients.delete(ws);
            });
        });
    };
};