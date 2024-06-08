"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZemljaController = void 0;
const zemlja_1 = __importDefault(require("../models/zemlja"));
class ZemljaController {
    constructor() {
        this.dohvatiSveZemlje = (req, res) => {
            zemlja_1.default.find({}, (err, zemlje) => {
                if (err)
                    console.log(err);
                else
                    res.json(zemlje);
            });
        };
        this.dohvatiSveZemljeSortirano = (req, res) => {
            zemlja_1.default.find({}, (err, zemlje) => {
                if (err)
                    console.log(err);
                else {
                    res.json(zemlje);
                }
            }).sort({ 'ukupnoMedalja': -1, 'brZlatnih': -1, 'brSrebrnih': -1, 'brBronzanih': -1 });
        };
        this.azurirajBrojSportista = (req, res) => {
            let ime = req.body.ime;
            // console.log('AZUrira se' + ime);
            zemlja_1.default.collection.updateOne({ 'ime': ime }, { $inc: { 'brojSportista': 1 } });
            // console.log('uspesno azuriran broj sportista zemlje ' + ime);
        };
        this.dohvatiZemlju = (req, res) => {
            let ime = req.body.ime;
            zemlja_1.default.findOne({ 'ime': ime }, (err, zemlja) => {
                if (err)
                    console.log(err);
                else
                    res.json(zemlja);
            });
        };
    }
}
exports.ZemljaController = ZemljaController;
//# sourceMappingURL=zemlja.controller.js.map