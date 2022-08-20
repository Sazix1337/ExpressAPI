class ResponseModel {
    responseModelClass
    properties

    getProps() {
        // return this.properties.filter(prop => prop !== "requestModelClass")
        console.log(this.properties)
    }
}
responseModel = ResponseModel

module.exports = ResponseModel