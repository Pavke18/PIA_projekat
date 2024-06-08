"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sport_controller_1 = require("../controllers/sport.controller");
const sportRouter = express_1.default.Router();
sportRouter.route('/dohvatiSveSportove').get((req, res) => new sport_controller_1.SportController().dohvatiSveSportove(req, res));
sportRouter.route('/dohvatiDodateSportove').get((req, res) => new sport_controller_1.SportController().dohvatiDodateSportove(req, res));
sportRouter.route('/dohvatiSveDiscipline').get((req, res) => new sport_controller_1.SportController().dohvatiSveDiscipline(req, res));
sportRouter.route('/dohvatiDiscipline').post((req, res) => new sport_controller_1.SportController().dohvatiDiscipline(req, res));
sportRouter.route('/dohvatiDodateDiscipline').post((req, res) => new sport_controller_1.SportController().dohvatiDodateDiscipline(req, res));
sportRouter.route('/dohvatiDodateEkipneDiscipline').post((req, res) => new sport_controller_1.SportController().dohvatiDodateEkipneDiscipline(req, res));
sportRouter.route('/dohvatiSportiste').post((req, res) => new sport_controller_1.SportController().dohvatiSportiste(req, res));
sportRouter.route('/dohvatiSportisteZaEkipu').post((req, res) => new sport_controller_1.SportController().dohvatiSportisteZaEkipu(req, res));
sportRouter.route('/dodajSportDisciplinu').post((req, res) => new sport_controller_1.SportController().dodajSportDisciplinu(req, res));
sportRouter.route('/dohvatiSportisteDiscipline').post((req, res) => new sport_controller_1.SportController().dohvatiSportisteDiscipline(req, res));
sportRouter.route('/dohvatiIzabraniSport').post((req, res) => new sport_controller_1.SportController().dohvatiIzabraniSport(req, res));
sportRouter.route('/dohvatiSportisteDrzave').post((req, res) => new sport_controller_1.SportController().dohvatiSportisteDrzave(req, res));
sportRouter.route('/dohvatiEkipe').post((req, res) => new sport_controller_1.SportController().dohvatiEkipe(req, res));
sportRouter.route('/dodajTakmicenje').post((req, res) => new sport_controller_1.SportController().dodajTakmicenje(req, res));
sportRouter.route('/dohvatiRekorde').get((req, res) => new sport_controller_1.SportController().dohvatiRekorde(req, res));
exports.default = sportRouter;
//# sourceMappingURL=sport.routes.js.map