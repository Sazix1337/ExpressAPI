class ExpressAPI {
    #express = require('express');
    #app = this.#express();
    routes = [];

    constructor(PORT, host, connectMessage) {
        this.PORT = PORT;
        this.host = host;
        this.connectMessage = connectMessage;
    }

    Init() {
        const path = require('path')
        this.#app.use(this.#express.static(path.join(__dirname)))
        this.#app.get('/exapi', (req, res) => {
            res.send(this.getRoutes());
        });

        this.#app.get('/express', (req, res) => {
            res.sendFile("/express_api/index.html", {root: __dirname})
        })

        this.#app.listen(this.PORT, this.host, (error) => {
            console.log(error? error : this.connectMessage ? this.connectMessage : `INFO: Connected on link: http://${this.host}:${this.PORT}`)
        });
    }

    RouteGet(path, callback) {
        this.#app.get(path, callback);
        this.routes.push({path, method: "GET", callback});
    }

    RoutePost(path, callback, RequestModel, ResponseModel) {
        this.#app.post(path, callback);
        this.routes.push({path, method: "POST", callback, requestModel: RequestModel, responseModel: ResponseModel});
    }

    RouteDelete(path, callback, RequestModel, ResponseModel) {
        this.#app.delete(path, callback);
        this.routes.push({path, method: "DELETE", callback, requestModel: RequestModel, responseModel: ResponseModel});
    }

    RoutePut(path, callback, RequestModel, ResponseModel) {
        this.#app.put(path, callback);
        this.routes.push({path, method: "PUT", callback, requestModel: RequestModel, responseModel: ResponseModel});
    }

    RouteUse(toUse, RequestModel) {
        this.#app.use(toUse);
    }

    getRoutes() {
        return this.routes
    }
}


const expressApi = new ExpressAPI(8800, "localhost");
expressApi.Init();
module.exports = ExpressAPI;