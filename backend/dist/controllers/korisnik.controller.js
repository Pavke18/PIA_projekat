"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikController = void 0;
const zahtev_1 = __importDefault(require("../models/zahtev"));
const korisnik_1 = __importDefault(require("../models/korisnik"));
const sportista_1 = __importDefault(require("../models/sportista"));
const takmicenje_1 = __importDefault(require("../models/takmicenje"));
const ekipa_1 = __importDefault(require("../models/ekipa"));
class KorisnikController {
    constructor() {
        this.prijavaKor = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let lozinka = req.body.lozinka;
            korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme, 'lozinka': lozinka }, (err, korisnik) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnik);
            });
        };
        this.promeniLozinku = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let lozinka = req.body.lozinka;
            let novaLozinka = req.body.nova;
            korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme, 'lozinka': lozinka }, (err, kor) => {
                if (err)
                    console.log(err);
                else {
                    if (kor) {
                        if (lozinka != novaLozinka) {
                            korisnik_1.default.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'lozinka': novaLozinka } }, () => {
                                res.json({ 'message': 'lozinka promenjena' });
                            }).catch(err => console.log(err));
                        }
                        else {
                            res.json({ 'message': 'Nova lozinka ne sme biti ista kao stara' });
                        }
                    }
                    else
                        res.json({ 'message': 'Unesite ispravne podatke!' });
                }
            });
        };
        this.registracija = (req, res) => {
            let ubaciZahtev = new zahtev_1.default(req.body);
            // console.log(req.body);
            //proverava da li je korisnicko ime zauzeto i da li vec postoji vodja za tu zemlju u bazi korisnici
            let korisnickoIme = req.body.korisnickoIme;
            let tip = req.body.tip;
            let zemlja = req.body.zemlja;
            korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme }, (err, kor) => {
                if (err)
                    console.log(err);
                else {
                    if (kor) {
                        res.json({ 'message': 'Korisnicko ime ' + korisnickoIme + ' je zauzeto!' });
                    }
                    else {
                        zahtev_1.default.findOne({ 'korisnickoIme': korisnickoIme }, (err, zah) => {
                            if (err)
                                console.log(err);
                            else {
                                if (zah) {
                                    res.json({ 'message': 'Korisnicko ime ' + korisnickoIme + ' je zauzeto!' });
                                }
                                else {
                                    korisnik_1.default.findOne({ 'tip': 'vodja', 'zemlja': zemlja }, (err, korisnik) => {
                                        if (err)
                                            console.log(err);
                                        else {
                                            if (korisnik && tip == 'vodja') {
                                                res.json({ 'message': 'Vodja vec postoji za zemlju ' + zemlja + '!' });
                                            }
                                            else {
                                                zahtev_1.default.findOne({ 'tip': 'vodja', 'zemlja': zemlja }, (err, zahtev) => {
                                                    if (err)
                                                        console.log(err);
                                                    else {
                                                        if (zahtev && tip == 'vodja') {
                                                            res.json({ 'message': 'Vodja vec postoji za zemlju ' + zemlja + '!' });
                                                        }
                                                        else {
                                                            ubaciZahtev.save().then((zahtev) => {
                                                                res.status(200).json({ 'message': 'zahtev je dodat' });
                                                            }).catch((err) => {
                                                                res.status(400).json({ 'message': err });
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        };
        this.dohvatiZahteve = (req, res) => {
            zahtev_1.default.find({}, (err, zahtevi) => {
                if (err)
                    console.log(err);
                else
                    res.json(zahtevi);
            });
        };
        this.prihvatiZahtev = (req, res) => {
            let noviKorisnik = new korisnik_1.default(req.body);
            noviKorisnik.save().then(() => {
                zahtev_1.default.deleteOne({ 'korisnickoIme': req.body.korisnickoIme }, (err) => {
                    if (err)
                        console.log(err);
                    else {
                        zahtev_1.default.find({}, (err, zahtevi) => {
                            if (err)
                                console.log(err);
                            else
                                res.json(zahtevi);
                        });
                    }
                });
            }).catch((err) => { if (err)
                console.log(err); });
        };
        this.odbijZahtev = (req, res) => {
            zahtev_1.default.deleteOne({ 'korisnickoIme': req.body.korisnickoIme }, (err) => {
                if (err)
                    console.log(err);
                else {
                    zahtev_1.default.find({}, (err, zahtevi) => {
                        if (err)
                            console.log(err);
                        else
                            res.json(zahtevi);
                    });
                }
            });
        };
        this.dohvatiDelegate = (req, res) => {
            korisnik_1.default.find({ 'tip': 'delegat' }, (err, delegati) => {
                if (err)
                    console.log(err);
                else
                    res.json(delegati);
            });
        };
        this.ubaciSportistu = (req, res) => {
            let noviSportista = new sportista_1.default(req.body);
            let ime_prezime = req.body.ime_prezime;
            let sport = req.body.sport;
            let disciplina = req.body.disciplina;
            //prvo treba da proveri da li je organizator formirao takmicenje za taj sport i disciplinu
            takmicenje_1.default.findOne({ 'sport': sport, 'disciplina': disciplina }, (e, tak) => {
                if (e)
                    console.log(e);
                else {
                    if (tak != null) {
                        res.json({ 'message': 'Prijava je istekla, takmicenje je vec formirano', 'klasa': 'greska' });
                    }
                    else {
                        //provera da li je sportista vec unet za neki drugi sport
                        sportista_1.default.findOne({ 'ime_prezime': ime_prezime, 'sport': { $not: { $regex: sport } } }, (err, spo) => {
                            if (err)
                                console.log(err);
                            else {
                                if (spo != null) {
                                    res.json({ 'message': 'Sportista je vec prijavljen za neki drugi sport', 'klasa': 'greska' });
                                }
                                else {
                                    //proverava da li je sportista vec unet za izabranu disciplinu
                                    sportista_1.default.findOne({ 'ime_prezime': ime_prezime, 'sport': sport, 'disciplina': disciplina }, (erro, sp) => {
                                        if (erro)
                                            console.log(erro);
                                        else {
                                            if (sp != null) {
                                                res.json({ 'message': 'Sportista je vec prijavljen za izabranu disciplinu', 'klasa': 'greska' });
                                            }
                                            else {
                                                //proverava da li je sportista unet za neku drugu disciplinu izabranog sporta
                                                sportista_1.default.findOne({ 'ime_prezime': ime_prezime, 'sport': sport, 'disciplina': { $not: { $regex: disciplina } } }, (erroo, spp) => {
                                                    if (erroo)
                                                        console.log(erroo);
                                                    else {
                                                        //svakako dodajemo u bazu novog sportistu 
                                                        if (spp) { //ne azuriramo broj sportista te zemlje
                                                            noviSportista.save().then(() => {
                                                                res.json({ 'message': 'Sportista je uspesno prijavljen', 'klasa': 'ok', 'azuriraj': 'ne' });
                                                            }).catch((err) => { if (err)
                                                                console.log(err); });
                                                        }
                                                        else { //prvi put unosimo ovog sportistu pa povecavamo broj sportista te zemlje
                                                            noviSportista.save().then(() => {
                                                                res.json({ 'message': 'Sportista je uspesno prijavljen', 'klasa': 'ok', 'azuriraj': 'da' });
                                                            }).catch((err) => { if (err)
                                                                console.log(err); });
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        };
        this.ubaciEkipu = (req, res) => {
            let novaEkipa = new ekipa_1.default(req.body);
            let zemlja = req.body.zemlja;
            let sport = req.body.sport;
            let disciplina = req.body.disciplina;
            // console.log(zemlja+ "-"+sport+ "-"+disciplina)
            //prvo treba da proveri da li je organizator formirao takmicenje za taj sport i disciplinu
            takmicenje_1.default.findOne({ 'sport': sport, 'disciplina': disciplina }, (e, tak) => {
                if (e)
                    console.log(e);
                else {
                    if (tak != null) {
                        res.json({ 'message': 'Prijava je istekla, takmicenje je vec formirano', 'klasa': 'greska' });
                    }
                    else {
                        //provera da li je ekipa za tu zemlju, sport i disciplinu vec uneta 
                        ekipa_1.default.findOne({ 'zemlja': zemlja, 'sport': sport, 'disciplina': { $regex: disciplina } }, (err, ek) => {
                            if (err)
                                console.log(err);
                            else {
                                if (ek != null) {
                                    res.json({ 'message': 'Ekipa je vec prijavljena', 'klasa': 'greska' });
                                }
                                else {
                                    novaEkipa.save().then(() => {
                                        res.json({ 'message': 'Ekipa je uspesno prijavljena', 'klasa': 'ok' });
                                    }).catch((err) => { if (err)
                                        console.log(err); });
                                }
                            }
                        });
                    }
                }
            });
        };
    }
}
exports.KorisnikController = KorisnikController;
//# sourceMappingURL=korisnik.controller.js.map