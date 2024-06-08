"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Sport = new Schema({
    sport: {
        type: String
    },
    dodato: {
        type: String
    }
}, {
    collection: 'Sport',
    versionKey: false //here
});
exports.default = mongoose_1.default.model('Sport', Sport, 'sportovi1');
//# sourceMappingURL=sport.js.map