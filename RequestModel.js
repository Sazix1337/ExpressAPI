module.exports = class RequestModel {
    requestModelClass
    constructor() {
        if(this.requestModelClass instanceof this) {
            this.properties = Object.getOwnPropertyNames(new this.requestModelClass());
        }
    }

    getProps() {
        return this.properties.filter(prop => prop !== "requestModelClass")
    }
}