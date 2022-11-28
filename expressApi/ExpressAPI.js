class ExpressAPI {
    #express = require('express');
    #app = this.#express();
    routes = [];
    RequestModel = class {
        constructor(rq) {
            this.rq = rq;
        }
    }

    ResponseModel = class {
        constructor(rs) {
            this.rs = rs;
        }
    }

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

        this.#app.get("/exhost", (req, res) => {
            res.send(this.getHost());
        });

        this.#app.get('/express', (req, res) => {
            res.sendFile("/express_api/index.html", {root: __dirname})
        })

        this.#app.listen(this.PORT, this.host, (error) => {
            console.log(error? error : this.connectMessage ? this.connectMessage : `INFO: Connected on link: http://${this.host}:${this.PORT}`)
        });
    }

    RouteGet(path, callback, rs = this.ResponseModel) {
        this.#app.get(path, callback);
        this.routes.push({path, method: "GET", callback, responseType: rs.rs.type});
    }

    RoutePost(path, callback, rq = this.RequestModel, rs = this.ResponseModel) {
        this.#app.post(path, callback);
        this.routes.push({path, method: "POST", callback, requestModel: rq.rq, responseModel: rs.rs});
    }

    RouteDelete(path, callback, rq = this.RequestModel, rs = this.ResponseModel) {
        this.#app.delete(path, callback);
        this.routes.push({path, method: "DELETE", callback, requestModel: rq.rq, responseModel: rs.rs});
    }

    RoutePut(path, callback, rq = this.RequestModel, rs = this.ResponseModel) {
        this.#app.put(path, callback);
        this.routes.push({path, method: "PUT", callback, responseType: rs.rs});
    }

    RouteUse(toUse) {
        this.#app.use(toUse);
    }

    getRoutes() {
        for(let i = 0; i < this.routes.length; i++) {
            if(this.routes[i].path == "/exapi" || this.routes[i].path == "/express") {
                throw new RouteError(`[Unable to set route "${this.routes[i].path}]: already using by ExpressAPI"`)
            }
        }
        return this.routes
    }

    getHost() {
        return `http://${this.host}:${this.PORT}`;
    }
}

module.exports = ExpressAPI;