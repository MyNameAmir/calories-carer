"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
function default_1(app) {
    mongoose_1.default.connect(app.get('mongodb'), { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
        logger_1.default.error(err);
        process.exit(1);
    });
    mongoose_1.default.Promise = global.Promise;
    app.set('mongooseClient', mongoose_1.default);
}
exports.default = default_1;
