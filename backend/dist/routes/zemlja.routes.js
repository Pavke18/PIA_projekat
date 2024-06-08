"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zemlja_controller_1 = require("../controllers/zemlja.controller");
const zemljaRouter = express_1.default.Router();
zemljaRouter.route('/dohvatiSveZemlje').get((req, res) => new zemlja_controller_1.ZemljaController().dohvatiSveZemlje(req, res));
zemljaRouter.route('/dohvatiSveZemljeSortirano').get((req, res) => new zemlja_controller_1.ZemljaController().dohvatiSveZemljeSortirano(req, res));
zemljaRouter.route('/azurirajBrojSportista').post((req, res) => new zemlja_controller_1.ZemljaController().azurirajBrojSportista(req, res));
zemljaRouter.route('/dohvatiZemlju').post((req, res) => new zemlja_controller_1.ZemljaController().dohvatiZemlju(req, res));
exports.default = zemljaRouter;
//# sourceMappingURL=zemlja.routes.js.map