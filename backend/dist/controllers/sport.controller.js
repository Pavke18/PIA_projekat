"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportController = void 0;
const sportista_1 = __importDefault(require("../models/sportista"));
const disciplina_1 = __importDefault(require("../models/disciplina"));
const sport_1 = __importDefault(require("../models/sport"));
const ekipa_1 = __importDefault(require("../models/ekipa"));
const takmicenje_1 = __importDefault(require("../models/takmicenje"));
const rekord_1 = __importDefault(require("../models/rekord"));
class SportController {
    constructor() {
        this.dohvatiSveSportove = (req, res) => {
            sport_1.default.find({}, (err, sportovi) => {
                if (err)
                    console.log(err);
                else
                    res.json(sportovi);
            });
        };
        this.dohvatiDodateSportove = (req, res) => {
            sport_1.default.find({ 'dodato': 'da' }, (err, sportovi) => {
                if (err)
                    console.log(err);
                else
                    res.json(sportovi);
            });
        };
        this.dohvatiSveDiscipline = (req, res) => {
            disciplina_1.default.find({ 'disciplina': { $not: { $regex: "^$" } } }, (err, dis) => {
                if (err)
                    console.log(err);
                else
                    res.json(dis);
            });
        };
        this.dohvatiDiscipline = (req, res) => {
            let sport = req.body.sport;
            disciplina_1.default.find({ 'sport': { $regex: sport } }, (err, disc) => {
                if (err)
                    console.log(err);
                else
                    res.json(disc);
            });
        };
        this.dohvatiDodateDiscipline = (req, res) => {
            let sport = req.body.sport;
            disciplina_1.default.find({ 'sport': { $regex: sport }, 'dodato': 'da' }, (err, disc) => {
                if (err)
                    console.log(err);
                else
                    res.json(disc);
            });
        };
        this.dohvatiDodateEkipneDiscipline = (req, res) => {
            let sport = req.body.sport;
            disciplina_1.default.find({ 'sport': { $regex: sport }, 'dodato': 'da', 'vrsta': 'ekipni' }, (err, disc) => {
                if (err)
                    console.log(err);
                else
                    res.json(disc);
            });
        };
        this.dohvatiSportiste = (req, res) => {
            let ime_prezime = req.body.ime_prezime;
            let zemlja = req.body.zemlja;
            let sport = req.body.sport;
            let disciplina = req.body.disciplina;
            let pol = req.body.pol;
            let medalja = req.body.medalja;
            if (medalja) {
                sportista_1.default.find({ 'ime_prezime': { $regex: ime_prezime }, 'zemlja': { $regex: zemlja }, 'sport': { $regex: sport }, 'disciplina': { $regex: disciplina }, 'pol': { $regex: pol }, 'medalja': true }, (err, sportisti) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(sportisti);
                });
            }
            else {
                sportista_1.default.find({ 'ime_prezime': { $regex: ime_prezime }, 'zemlja': { $regex: zemlja }, 'sport': { $regex: sport }, 'disciplina': { $regex: disciplina }, 'pol': { $regex: pol } }, (err, sportisti) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(sportisti);
                });
            }
        };
        this.dohvatiSportisteZaEkipu = (req, res) => {
            let zemlja = req.body.zemlja;
            let sport = req.body.sport;
            let disciplina = req.body.disciplina;
            let pol = req.body.pol;
            sportista_1.default.find({ 'zemlja': zemlja, 'sport': sport, 'disciplina': { $regex: disciplina }, 'pol': { $regex: pol } }, (err, sportisti) => {
                if (err)
                    console.log(err);
                else
                    res.json(sportisti);
            });
        };
        this.dodajSportDisciplinu = (req, res) => {
            let sport = req.body.sport;
            let disciplina = req.body.disciplina;
            if (disciplina == '') {
                sport_1.default.findOne({ 'sport': sport, 'dodato': 'da' }, (err, s) => {
                    if (err)
                        console.log(err);
                    else {
                        if (s != null) {
                            res.json({ 'message': 'Izabrani sport vec je uspesno dodat', 'klasa': 'greska' });
                        }
                        else {
                            sport_1.default.collection.updateOne({ 'sport': sport }, { $set: { 'dodato': 'da' } });
                            if (sport == 'kosarka' || sport == 'odbojka' || sport == 'vaterpolo') {
                                disciplina_1.default.collection.updateOne({ 'sport': sport }, { $set: { 'dodato': 'da' } });
                            }
                            res.json({ 'message': 'Sport: ' + sport + ' je uspesno dodat', 'klasa': 'ok' });
                        }
                    }
                });
            }
            else {
                disciplina_1.default.findOne({ 'sport': sport, 'disciplina': disciplina, 'dodato': 'da' }, (err, d) => {
                    if (err)
                        console.log(err);
                    else {
                        if (d != null) {
                            res.json({ 'message': 'Izabrana disciplina vec je uspesno dodata', 'klasa': 'greska' });
                        }
                        else {
                            disciplina_1.default.collection.updateOne({ 'disciplina': disciplina }, { $set: { 'dodato': 'da' } });
                            sport_1.default.findOne({ 'sport': sport, 'dodato': 'ne' }, (err, s) => {
                                if (err)
                                    console.log(err);
                                else {
                                    if (s != null) {
                                        sport_1.default.collection.updateOne({ 'sport': sport }, { $set: { 'dodato': 'da' } });
                                    }
                                    res.json({ 'message': 'Disciplina: ' + disciplina + ' je uspesno dodata', 'klasa': 'ok' });
                                }
                            });
                        }
                    }
                });
            }
        };
        this.dohvatiSportisteDiscipline = (req, res) => {
            let sport = req.body.sport;
            let disciplina = req.body.disciplina;
            let pol = req.body.pol;
            sportista_1.default.find({ 'sport': sport, 'disciplina': disciplina, 'pol': pol }, (err, sportisti) => {
                if (err)
                    console.log(err);
                else
                    res.json(sportisti);
            });
        };
        this.dohvatiIzabraniSport = (req, res) => {
            let sport = req.body.sport;
            let disciplina = req.body.disciplina;
            // console.log('DOHVATI ' + sport + " " + disciplina);
            disciplina_1.default.findOne({ 'sport': sport, 'disciplina': { $regex: disciplina } }, (err, disc) => {
                if (err)
                    console.log(err);
                else
                    res.json(disc);
            });
        };
        this.dohvatiSportisteDrzave = (req, res) => {
            let zemlja = req.body.zemlja;
            sportista_1.default.find({ 'zemlja': zemlja }, (err, sportisti) => {
                if (err)
                    console.log(err);
                else
                    res.json(sportisti);
            });
        };
        this.dohvatiEkipe = (req, res) => {
            let sport = req.body.sport;
            let disciplina = req.body.disciplina;
            let pol = req.body.pol;
            ekipa_1.default.find({ 'sport': sport, 'disciplina': disciplina, 'pol': pol }, (err, ekipe) => {
                if (err)
                    console.log(err);
                else
                    res.json(ekipe);
            });
        };
        this.dodajTakmicenje = (req, res) => {
            let novoTakmicenje = new takmicenje_1.default(req.body);
            let sport = req.body.sport;
            let disciplina = req.body.disciplina;
            let pol = req.body.pol;
            takmicenje_1.default.findOne({ 'sport': sport, 'disciplina': { $regex: disciplina }, 'pol': pol }, (err, tak) => {
                if (err)
                    console.log(err);
                else {
                    if (tak) {
                        res.json({ 'message': 'Takmicenje za izabrani sport je vec formirano', 'klasa': 'greska' });
                    }
                    else {
                        novoTakmicenje.save().then(() => {
                            res.json({ 'message': 'Uspesno ste uneli takmicenje->' + sport + ", " + disciplina, 'klasa': 'ok' });
                        }).catch((err) => {
                            if (err)
                                console.log(err);
                        });
                    }
                }
            });
        };
        this.dohvatiRekorde = (req, res) => {
            rekord_1.default.find({}, (err, rekordi) => {
                if (err)
                    console.log(err);
                else
                    res.json(rekordi);
            });
        };
    }
}
exports.SportController = SportController;
//# sourceMappingURL=sport.controller.js.map