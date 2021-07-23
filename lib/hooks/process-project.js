"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// used to build the query string passed to the reCAPTCHA service
const querystring_1 = __importDefault(require("querystring"));
// used to connect with the reCAPTCHA service
const axios_1 = __importDefault(require("axios"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.default = (options = {}) => {
    return async (context) => {
        // extract the incoming request data
        const { data } = context;
        // FYI
        console.log(data);
        // verify the incoming token against the reCAPTCHA service
        const response = await axios_1.default.post('https://www.google.com/recaptcha/api/siteverify', querystring_1.default.stringify({
            secret: process.env.RECAPTCHA_SECRET,
            response: data.token
        }));
        // FYI
        console.log(response.data.score);
        // if the response fails or the score is too low, throw an error
        if (!response.data.success || response.data.score < 0.5) {
            console.log(response.data.score);
            throw new Error('reCAPTCHA fail');
        }
        // if everything is OK, carry on
        return context;
    };
};
