"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Service {
    response({ code, message, data, error }) {
        return {
            code,
            message: code !== 500 ? message : process.env.DEBUG ? message : 'Request failed due to an internal error.',
            data,
            error
        };
    }
}
exports.default = Service;
