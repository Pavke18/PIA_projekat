import express from 'express';
import RasporedRezultat from '../models/raspored';
import Takmicenje from '../models/takmicenje';
import Sportista from '../models/sportista';
import Zemlja from '../models/zemlja';

export class TakmicenjeController {
    dohvatiDelegatovaTakmicenja = (req: express.Request, res: express.Response) => {
        let delegat = req.body.delegat;
        Takmicenje.find({ 'delegat': delegat }, (err, takmicenja) => {
            if (err) console.log(err);
            else res.json(takmicenja);
        })
    }

    dohvatiTakmicenje = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        Takmicenje.findOne({ 'sport': { $regex: sport }, 'disciplina': { $regex: disciplina }, 'pol': { $regex: pol } }, (err, tak) => {
            if (err) console.log(err);
            else res.json(tak);
        })
    }

    dodajRasporedTakmicenja = (req: express.Request, res: express.Response) => {
        let noviRaspored = new RasporedRezultat(req.body);
        let lokacija = req.body.lokacija;
        let vreme = req.body.vreme;
        let datum = req.body.datum;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let runda = req.body.runda;

        //proverava da li se na istoj lokaciji i u isto vreme vec rasporedjeno neko drugo takmicenje
        RasporedRezultat.findOne({ 'lokacija': lokacija, 'vreme': vreme, 'datum': datum }, (err, ras) => {
            if (err) console.log(err);
            else {
                if (ras) {
                    res.json({ 'message': 'Termin na lokaciji za izabrano takmicenje je vec zauzet!', 'klasa': 'greska' });
                }
                else {
                    //proverava da li je za zadati individualni sport vec dodat raspored za tu rundu i ako jeste samo ga promeni, a ako nije ubaci novi raspored
                    RasporedRezultat.findOne({ 'sport': { $regex: sport }, 'disciplina': { $regex: disciplina }, 'pol': { $regex: pol }, 'runda': { $regex: runda } }, (er, raspo) => {
                        if (er) console.log(er);
                        else {
                            if (raspo) {
                                RasporedRezultat.collection.updateOne({ 'sport': sport, 'disciplina': disciplina, 'pol': pol, 'runda': runda }, { $set: { 'vreme': vreme, 'datum': datum } });
                                res.json({ 'message': 'Raspored je uspesno promenjen', 'klasa': 'OK' });
                            }
                            else {
                                //unosi raspored za tu rundu samo ako je unet za prethodnu rundu
                                let prethodnaRunda = runda - 1;
                                RasporedRezultat.findOne({ 'sport': { $regex: sport }, 'disciplina': { $regex: disciplina }, 'pol': { $regex: pol }, 'runda': prethodnaRunda }, (e, ras) => {
                                    if (e) console.log(e);
                                    else {
                                        if (ras || prethodnaRunda == 0) {//moze da se unese raspored za datu rundu jer je unet za prethodnu rundu ili ako se unosi za prvu rundu
                                            noviRaspored.save().then(() => {
                                                Takmicenje.collection.updateOne({ 'sport': sport, 'disciplina': disciplina, 'pol': pol }, { $set: { 'unetRaspored': true } });
                                                res.json({ 'message': 'Raspored je uspesno dodat', 'klasa': 'OK' });
                                            }).catch((erro) => {
                                                if (erro) console.log(erro);
                                            })
                                        }
                                        else {
                                            res.json({ 'message': 'Nije unet raspored za prethodnu rundu', 'klasa': 'greska' });
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

    dodajRezultatTakmicenja = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let runda = req.body.runda;
        let takmicari = req.body.takmicari;

        //proverava da li je za izabrano takmicenje i tu rundu unet raspored
        RasporedRezultat.findOne({ 'sport': { $regex: sport }, 'disciplina': { $regex: disciplina }, 'pol': { $regex: pol }, 'runda': { $regex: runda } }, (err, ras) => {
            if (err) console.log(err);
            else {
                if (ras) {
                    //proverava da li su uneti rezultati za prethodnu rundu tog takmicenja
                    let prethodnaRunda = runda - 1;
                    RasporedRezultat.findOne({ 'sport': { $regex: sport }, 'disciplina': { $regex: disciplina }, 'pol': { $regex: pol }, 'runda': prethodnaRunda, 'unetiRezultati': true }, (er, rasp) => {
                        if (er) console.log(er);
                        else {
                            if (rasp || prethodnaRunda == 0) {//moze da se unese rezultat za datu rundu jer je unet za prethodnu rundu ili ako se unosi rezultat za prvu rundu
                                //proverava da li su vec uneti rezultati za izabrano takmicenje i tu rundu
                                RasporedRezultat.findOne({ 'sport': sport, 'disciplina': disciplina, 'pol': pol, 'runda': runda, 'unetiRezultati': true }, (erro, rez) => {
                                    if (erro) console.log(erro);
                                    else {
                                        if (rez) {
                                            res.json({ 'message': 'Rezultati za ' + runda + '. rundu su vec uneseni', 'klasa': 'greska' });
                                        }
                                        else {
                                            RasporedRezultat.collection.updateOne({ 'sport': sport, 'disciplina': disciplina, 'pol': pol, 'runda': runda }, { $set: { 'unetiRezultati': true, 'takmicari': takmicari } });
                                            res.json({ 'message': 'Rezultati za ' + runda + '. rundu su uspesno uneti', 'klasa': 'OK' });
                                        }
                                    }
                                })
                            }
                            else {
                                res.json({ 'message': 'Niste uneli rezultat za prethodnu rundu', 'klasa': 'greska' });
                            }
                        }
                    })
                }
                else {
                    res.json({ 'message': 'Niste uneli raspored odrzavanja ' + runda + '.  runde za izabrano takmicenje', 'klasa': 'greska' });
                }
            }
        });
    }

    dohvatiRezultateTakmicenjaIndivid = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let runda = req.body.runda;

        RasporedRezultat.findOne({ 'sport': sport, 'disciplina': disciplina, 'pol': pol, 'runda': runda }, (err, rez) => {
            if (err) console.log(err)
            else res.json(rez);
        })
    }

    osvojenaMedaljaIndivid = (req: express.Request, res: express.Response) => {
        // console.log('USAO SAM');
        let sportista = req.body.sportista;
        let zemlja = req.body.zemlja;
        let vrsta = req.body.vrsta;
        let disciplina = req.body.disciplina;
        // console.log(sportista+" "+zemlja+" "+vrsta+" "+disciplina);

        Sportista.collection.updateOne({ 'ime_prezime': sportista, 'disciplina': { $regex: disciplina } }, { $set: { 'medalja': true } });
        if (vrsta == 'zlatna') {
            Zemlja.collection.updateOne({ 'ime': zemlja }, { $inc: { 'brZlatnih': 1, 'ukupnoMedalja': 1 } })
        }
        if (vrsta == 'srebrna') {
            Zemlja.collection.updateOne({ 'ime': zemlja }, { $inc: { 'brSrebrnih': 1, 'ukupnoMedalja': 1 } })
        }
        if (vrsta == 'bronzana') {
            Zemlja.collection.updateOne({ 'ime': zemlja }, { $inc: { 'brBronzanih': 1, 'ukupnoMedalja': 1 } })
        }
    }
}