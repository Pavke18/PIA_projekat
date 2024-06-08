import express from 'express';
import Sportista from '../models/sportista';
import Disciplina from '../models/disciplina';
import Sport from '../models/sport';
import Ekipa from '../models/ekipa';
import Takmicenje from '../models/takmicenje';
import Rekord from '../models/rekord';

export class SportController {
    dohvatiSveSportove = (req: express.Request, res: express.Response) => {
        Sport.find({}, (err, sportovi) => {
            if (err) console.log(err);
            else res.json(sportovi);
        })
    }

    dohvatiDodateSportove = (req: express.Request, res: express.Response) => {
        Sport.find({ 'dodato': 'da' }, (err, sportovi) => {
            if (err) console.log(err);
            else res.json(sportovi);
        })
    }

    dohvatiSveDiscipline = (req: express.Request, res: express.Response) => {
        Disciplina.find({ 'disciplina': { $not: { $regex: "^$" } } }, (err, dis) => {
            if (err) console.log(err);
            else res.json(dis);
        })

    }

    dohvatiDiscipline = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;

        Disciplina.find({ 'sport': { $regex: sport } }, (err, disc) => {
            if (err) console.log(err);
            else res.json(disc);
        })
    }

    dohvatiDodateDiscipline = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;

        Disciplina.find({ 'sport': { $regex: sport }, 'dodato': 'da' }, (err, disc) => {
            if (err) console.log(err);
            else res.json(disc);
        })
    }

    dohvatiDodateEkipneDiscipline = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;

        Disciplina.find({ 'sport': { $regex: sport }, 'dodato': 'da', 'vrsta': 'ekipni' }, (err, disc) => {
            if (err) console.log(err);
            else res.json(disc);
        })
    }

    dohvatiSportiste = (req: express.Request, res: express.Response) => {
        let ime_prezime = req.body.ime_prezime;
        let zemlja = req.body.zemlja;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let medalja = req.body.medalja;

        if (medalja) {
            Sportista.find({ 'ime_prezime': { $regex: ime_prezime }, 'zemlja': { $regex: zemlja }, 'sport': { $regex: sport }, 'disciplina': { $regex: disciplina }, 'pol': { $regex: pol }, 'medalja': true }, (err, sportisti) => {
                if (err) console.log(err);
                else res.json(sportisti);
            })
        }
        else {
            Sportista.find({ 'ime_prezime': { $regex: ime_prezime }, 'zemlja': { $regex: zemlja }, 'sport': { $regex: sport }, 'disciplina': { $regex: disciplina }, 'pol': { $regex: pol } }, (err, sportisti) => {
                if (err) console.log(err);
                else res.json(sportisti);
            })
        }
    }

    dohvatiSportisteZaEkipu = (req: express.Request, res: express.Response) => {
        let zemlja = req.body.zemlja;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        Sportista.find({ 'zemlja': zemlja, 'sport': sport, 'disciplina': { $regex: disciplina }, 'pol': { $regex: pol } }, (err, sportisti) => {
            if (err) console.log(err);
            else res.json(sportisti);
        })

    }

    dodajSportDisciplinu = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;

        if (disciplina == '') {
            Sport.findOne({ 'sport': sport, 'dodato': 'da' }, (err, s) => {
                if (err) console.log(err);
                else {
                    if (s != null) {
                        res.json({ 'message': 'Izabrani sport vec je uspesno dodat', 'klasa': 'greska' });
                    }
                    else {
                        Sport.collection.updateOne({ 'sport': sport }, { $set: { 'dodato': 'da' } });
                        if (sport == 'kosarka' || sport == 'odbojka' || sport == 'vaterpolo') {
                            Disciplina.collection.updateOne({ 'sport': sport }, { $set: { 'dodato': 'da' } });
                        }
                        res.json({ 'message': 'Sport: ' + sport + ' je uspesno dodat', 'klasa': 'ok' });
                    }
                }
            })
        }
        else {
            Disciplina.findOne({ 'sport': sport, 'disciplina': disciplina, 'dodato': 'da' }, (err, d) => {
                if (err) console.log(err);
                else {
                    if (d != null) {
                        res.json({ 'message': 'Izabrana disciplina vec je uspesno dodata', 'klasa': 'greska' });
                    }
                    else {
                        Disciplina.collection.updateOne({ 'disciplina': disciplina }, { $set: { 'dodato': 'da' } });
                        Sport.findOne({ 'sport': sport, 'dodato': 'ne' }, (err, s) => {
                            if (err) console.log(err);
                            else {
                                if (s != null) {
                                    Sport.collection.updateOne({ 'sport': sport }, { $set: { 'dodato': 'da' } });
                                }
                                res.json({ 'message': 'Disciplina: ' + disciplina + ' je uspesno dodata', 'klasa': 'ok' });
                            }
                        })
                    }
                }
            })
        }
    }

    dohvatiSportisteDiscipline = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        Sportista.find({ 'sport': sport, 'disciplina': disciplina, 'pol': pol }, (err, sportisti) => {
            if (err) console.log(err);
            else res.json(sportisti);
        });
    }

    dohvatiIzabraniSport = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;

        // console.log('DOHVATI ' + sport + " " + disciplina);

        Disciplina.findOne({ 'sport': sport, 'disciplina': { $regex: disciplina } }, (err, disc) => {
            if (err) console.log(err);
            else res.json(disc);
        })
    }

    dohvatiSportisteDrzave = (req: express.Request, res: express.Response) => {
        let zemlja = req.body.zemlja;


        Sportista.find({ 'zemlja': zemlja }, (err, sportisti) => {
            if (err) console.log(err);
            else res.json(sportisti);
        })

    }

    dohvatiEkipe = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        Ekipa.find({ 'sport': sport, 'disciplina': disciplina, 'pol': pol }, (err, ekipe) => {
            if (err) console.log(err);
            else res.json(ekipe);
        })
    }

    dodajTakmicenje = (req: express.Request, res: express.Response) => {
        let novoTakmicenje = new Takmicenje(req.body);
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol=req.body.pol;

        Takmicenje.findOne({ 'sport': sport, 'disciplina': { $regex: disciplina },'pol':pol }, (err, tak) => {
            if (err) console.log(err);
            else {
                if (tak) {
                    res.json({ 'message': 'Takmicenje za izabrani sport je vec formirano', 'klasa': 'greska' });
                }
                else {
                    novoTakmicenje.save().then(() => {
                        res.json({ 'message': 'Uspesno ste uneli takmicenje->' + sport + ", " + disciplina, 'klasa': 'ok' })
                    }).catch((err) => {
                        if (err) console.log(err);
                    })
                }
            }
        })
    }

    dohvatiRekorde = (req: express.Request, res: express.Response) => {
        Rekord.find({}, (err, rekordi) => {
            if (err) console.log(err);
            else res.json(rekordi);
        })
    }
}