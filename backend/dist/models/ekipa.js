"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Ekipa = new Schema({
    zemlja: {
        type: String
    },
    sport: {
        type: String
    },
    disciplina: {
        type: String
    },
    pol: {
        type: String
    },
    igraci: {
        type: Array
    }
}, {
    collection: 'Ekipa',
    versionKey: false //here
});
exports.default = mongoose_1.default.model('Ekipa', Ekipa, 'ekipe');
//# sourceMappingURL=ekipa.js.map