"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const takmicenje_controller_1 = require("../controllers/takmicenje.controller");
const takmicenjeRouter = express_1.default.Router();
takmicenjeRouter.route('/dohvatiMojaTakmicenja').post((req, res) => new takmicenje_controller_1.TakmicenjeController().dohvatiDelegatovaTakmicenja(req, res));
takmicenjeRouter.route('/dohvatiTakmicenje').post((req, res) => new takmicenje_controller_1.TakmicenjeController().dohvatiTakmicenje(req, res));
takmicenjeRouter.route('/dodajRasporedTakmicenja').post((req, res) => new takmicenje_controller_1.TakmicenjeController().dodajRasporedTakmicenja(req, res));
takmicenjeRouter.route('/dodajRezultatTakmicenja').post((req, res) => new takmicenje_controller_1.TakmicenjeController().dodajRezultatTakmicenja(req, res));
takmicenjeRouter.route('/dohvatiRezultateTakmicenjaIndivid').post((req, res) => new takmicenje_controller_1.TakmicenjeController().dohvatiRezultateTakmicenjaIndivid(req, res));
takmicenjeRouter.route('/osvojenaMedaljaIndivid').post((req, res) => new takmicenje_controller_1.TakmicenjeController().osvojenaMedaljaIndivid(req, res));
exports.default = takmicenjeRouter;
//# sourceMappingURL=takmicenje.routes.js.map