"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Disciplina = new Schema({
    sport: {
        type: String
    },
    disciplina: {
        type: String
    },
    vrsta: {
        type: String
    },
    minIgraca: {
        type: Number
    },
    maxIgraca: {
        type: Number
    },
    dodato: {
        type: String
    }
}, {
    collection: 'Disciplina',
    versionKey: false //here
});
exports.default = mongoose_1.default.model('Disciplina', Disciplina, 'sportovi2');
//# sourceMappingURL=disciplina.js.map