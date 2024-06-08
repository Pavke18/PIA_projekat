"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const korisnik_controller_1 = require("../controllers/korisnik.controller");
const korisnikRouter = express_1.default.Router();
korisnikRouter.route('/prijavaKor').post((req, res) => new korisnik_controller_1.KorisnikController().prijavaKor(req, res));
korisnikRouter.route('/promenaLozinke').post((req, res) => new korisnik_controller_1.KorisnikController().promeniLozinku(req, res));
korisnikRouter.route('/registracija').post((req, res) => new korisnik_controller_1.KorisnikController().registracija(req, res));
korisnikRouter.route('/dohvatiZahteve').get((req, res) => new korisnik_controller_1.KorisnikController().dohvatiZahteve(req, res));
korisnikRouter.route('/prihvatiZahtev').post((req, res) => new korisnik_controller_1.KorisnikController().prihvatiZahtev(req, res));
korisnikRouter.route('/odbijZahtev').post((req, res) => new korisnik_controller_1.KorisnikController().odbijZahtev(req, res));
korisnikRouter.route('/dohvatiDelegate').get((req, res) => new korisnik_controller_1.KorisnikController().dohvatiDelegate(req, res));
korisnikRouter.route('/ubaciSportistu').post((req, res) => new korisnik_controller_1.KorisnikController().ubaciSportistu(req, res));
korisnikRouter.route('/ubaciEkipu').post((req, res) => new korisnik_controller_1.KorisnikController().ubaciEkipu(req, res));
exports.default = korisnikRouter;
//# sourceMappingURL=korisnik.routes.js.map