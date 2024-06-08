"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let RasporedRezultat = new Schema({
    sport: {
        type: String
    },
    disciplina: {
        type: String
    },
    pol: {
        type: String
    },
    datum: {
        type: String
    },
    vreme: {
        type: String
    },
    takmicari: {
        type: Array
    },
    lokacija: {
        type: String
    },
    runda: {
        type: String
    },
    unetiRezultati: {
        type: Boolean
    }
}, {
    collection: 'RasporedRezultat',
    versionKey: false //here
});
exports.default = mongoose_1.default.model('RasporedRezultat', RasporedRezultat, 'rasporediRezultatati');
//# sourceMappingURL=raspored.js.map