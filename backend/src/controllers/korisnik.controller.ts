import express from 'express';
import Zahtev from '../models/zahtev';
import Korisnik from '../models/korisnik';
import Sportista from '../models/sportista';
import Takmicenje from '../models/takmicenje';
import Ekipa from '../models/ekipa';

export class KorisnikController {
    prijavaKor = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;

        Korisnik.findOne({ 'korisnickoIme': korisnickoIme, 'lozinka': lozinka }, (err, korisnik) => {
            if (err) console.log(err);
            else res.json(korisnik);
        })
    }

    promeniLozinku = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;
        let novaLozinka = req.body.nova;

        Korisnik.findOne({ 'korisnickoIme': korisnickoIme, 'lozinka': lozinka }, (err, kor) => {
            if (err) console.log(err);
            else {
                if (kor) {
                    if (lozinka != novaLozinka) {
                        Korisnik.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'lozinka': novaLozinka } }, () => {
                            res.json({ 'message': 'lozinka promenjena' })
                        }).catch(err => console.log(err));
                    }
                    else {
                        res.json({ 'message': 'Nova lozinka ne sme biti ista kao stara' });
                    }
                }
                else res.json({ 'message': 'Unesite ispravne podatke!' });
            }
        })
    }

    registracija = (req: express.Request, res: express.Response) => { //ubacuje u bazu zahteva, tj. kreira korisnicki zahtev koji organizator mora da odobri

        let ubaciZahtev = new Zahtev(req.body);

        // console.log(req.body);

        //proverava da li je korisnicko ime zauzeto i da li vec postoji vodja za tu zemlju u bazi korisnici
        let korisnickoIme = req.body.korisnickoIme;
        let tip = req.body.tip;
        let zemlja = req.body.zemlja;

        Korisnik.findOne({ 'korisnickoIme': korisnickoIme }, (err, kor) => {
            if (err) console.log(err);
            else {
                if (kor) {
                    res.json({ 'message': 'Korisnicko ime ' + korisnickoIme + ' je zauzeto!' })
                }
                else {
                    Zahtev.findOne({ 'korisnickoIme': korisnickoIme }, (err, zah) => {
                        if (err) console.log(err);
                        else {
                            if (zah) {
                                res.json({ 'message': 'Korisnicko ime ' + korisnickoIme + ' je zauzeto!' })
                            }
                            else {
                                Korisnik.findOne({ 'tip': 'vodja', 'zemlja': zemlja }, (err, korisnik) => {
                                    if (err) console.log(err);
                                    else {
                                        if (korisnik && tip == 'vodja') {
                                            res.json({ 'message': 'Vodja vec postoji za zemlju ' + zemlja + '!' })
                                        }
                                        else {
                                            Zahtev.findOne({ 'tip': 'vodja', 'zemlja': zemlja }, (err, zahtev) => {
                                                if (err) console.log(err);
                                                else {
                                                    if (zahtev && tip == 'vodja') {
                                                        res.json({ 'message': 'Vodja vec postoji za zemlju ' + zemlja + '!' })
                                                    }
                                                    else {
                                                        ubaciZahtev.save().then((zahtev) => {
                                                            res.status(200).json({ 'message': 'zahtev je dodat' });
                                                        }).catch((err) => {
                                                            res.status(400).json({ 'message': err });
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    dohvatiZahteve = (req: express.Request, res: express.Response) => {
        Zahtev.find({}, (err, zahtevi) => {
            if (err) console.log(err);
            else res.json(zahtevi);
        })
    }

    prihvatiZahtev = (req: express.Request, res: express.Response) => {
        let noviKorisnik = new Korisnik(req.body);

        noviKorisnik.save().then(() => {
            Zahtev.deleteOne({ 'korisnickoIme': req.body.korisnickoIme }, (err) => {
                if (err) console.log(err);
                else {
                    Zahtev.find({}, (err, zahtevi) => {
                        if (err) console.log(err);
                        else res.json(zahtevi);
                    })
                }
            });
        }).catch((err) => { if (err) console.log(err) });
    }

    odbijZahtev = (req: express.Request, res: express.Response) => {
        Zahtev.deleteOne({ 'korisnickoIme': req.body.korisnickoIme }, (err) => {
            if (err) console.log(err);
            else {
                Zahtev.find({}, (err, zahtevi) => {
                    if (err) console.log(err);
                    else res.json(zahtevi);
                })
            }
        });
    }

    dohvatiDelegate = (req: express.Request, res: express.Response) => {
        Korisnik.find({ 'tip': 'delegat' }, (err, delegati) => {
            if (err) console.log(err);
            else res.json(delegati);
        })
    }

    ubaciSportistu = (req: express.Request, res: express.Response) => {
        let noviSportista = new Sportista(req.body);
        let ime_prezime = req.body.ime_prezime;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;

        //prvo treba da proveri da li je organizator formirao takmicenje za taj sport i disciplinu
        Takmicenje.findOne({ 'sport': sport, 'disciplina': disciplina }, (e, tak) => {
            if (e) console.log(e);
            else {
                if (tak != null) {
                    res.json({ 'message': 'Prijava je istekla, takmicenje je vec formirano', 'klasa': 'greska' })
                }
                else {
                    //provera da li je sportista vec unet za neki drugi sport
                    Sportista.findOne({ 'ime_prezime': ime_prezime, 'sport': { $not: { $regex: sport } } }, (err, spo) => {
                        if (err) console.log(err)
                        else {
                            if (spo != null) {
                                res.json({ 'message': 'Sportista je vec prijavljen za neki drugi sport', 'klasa': 'greska' });
                            }
                            else {
                                //proverava da li je sportista vec unet za izabranu disciplinu
                                Sportista.findOne({ 'ime_prezime': ime_prezime, 'sport': sport, 'disciplina': disciplina }, (erro, sp) => {
                                    if (erro) console.log(erro);
                                    else {
                                        if (sp != null) {
                                            res.json({ 'message': 'Sportista je vec prijavljen za izabranu disciplinu', 'klasa': 'greska' });
                                        }
                                        else {
                                            //proverava da li je sportista unet za neku drugu disciplinu izabranog sporta
                                            Sportista.findOne({ 'ime_prezime': ime_prezime, 'sport': sport, 'disciplina': { $not: { $regex: disciplina } } }, (erroo, spp) => {
                                                if (erroo) console.log(erroo);
                                                else {
                                                    //svakako dodajemo u bazu novog sportistu 
                                                    if (spp) { //ne azuriramo broj sportista te zemlje
                                                        noviSportista.save().then(() => {
                                                            res.json({ 'message': 'Sportista je uspesno prijavljen', 'klasa': 'ok', 'azuriraj': 'ne' })
                                                        }).catch((err) => { if (err) console.log(err) });
                                                    }
                                                    else { //prvi put unosimo ovog sportistu pa povecavamo broj sportista te zemlje
                                                        noviSportista.save().then(() => {
                                                            res.json({ 'message': 'Sportista je uspesno prijavljen', 'klasa': 'ok', 'azuriraj': 'da' })
                                                        }).catch((err) => { if (err) console.log(err) });
                                                    }
                                                }
                                            })
                                        }
                                    }

                                })
                            }
                        }
                    })
                }
            }
        })
    }

    ubaciEkipu = (req: express.Request, res: express.Response) => {
        let novaEkipa = new Ekipa(req.body);
        let zemlja = req.body.zemlja;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;

        // console.log(zemlja+ "-"+sport+ "-"+disciplina)

        //prvo treba da proveri da li je organizator formirao takmicenje za taj sport i disciplinu
        Takmicenje.findOne({ 'sport': sport, 'disciplina': disciplina }, (e, tak) => {
            if (e) console.log(e);
            else {
                if (tak != null) {
                    res.json({ 'message': 'Prijava je istekla, takmicenje je vec formirano', 'klasa': 'greska' })
                }
                else {
                    //provera da li je ekipa za tu zemlju, sport i disciplinu vec uneta 
                    Ekipa.findOne({ 'zemlja': zemlja, 'sport': sport, 'disciplina': { $regex: disciplina } }, (err, ek) => {
                        if (err) console.log(err);
                        else {
                            if (ek != null) {
                                res.json({ 'message': 'Ekipa je vec prijavljena', 'klasa': 'greska' });
                            }
                            else {
                                novaEkipa.save().then(() => {
                                    res.json({ 'message': 'Ekipa je uspesno prijavljena', 'klasa': 'ok' })
                                }).catch((err) => { if (err) console.log(err) });
                            }
                        }
                    })

                }
            }
        })
    }
}