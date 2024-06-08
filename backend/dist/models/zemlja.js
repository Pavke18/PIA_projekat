"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Zemlja = new Schema({
    zastava: {
        type: String
    },
    ime: {
        type: String
    },
    brojSportista: {
        type: Number
    },
    brZlatnih: {
        type: Number
    },
    brSrebrnih: {
        type: Number
    },
    brBronzanih: {
        type: Number
    },
    ukupnoMedalja: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Zemlja', Zemlja, 'zemlje');
//# sourceMappingURL=zemlja.js.map