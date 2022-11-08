declare class RouteError {
    message: string | undefined;
    constructor(message?: string | undefined) {
        this.message = message;
    }
}