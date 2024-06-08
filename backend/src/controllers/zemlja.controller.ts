import express from 'express';
import Zemlja from '../models/zemlja';

export class ZemljaController {
    dohvatiSveZemlje = (req: express.Request, res: express.Response) => {
        Zemlja.find({}, (err, zemlje) => {
            if (err) console.log(err);
            else res.json(zemlje);
        })
    }

    dohvatiSveZemljeSortirano = (req: express.Request, res: express.Response) => {
        Zemlja.find({}, (err, zemlje) => {
            if (err) console.log(err);
            else {

                res.json(zemlje);
            }
        }).sort({ 'ukupnoMedalja': -1 ,'brZlatnih':-1,'brSrebrnih':-1,'brBronzanih':-1})
    }

    azurirajBrojSportista = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;

        // console.log('AZUrira se' + ime);

        Zemlja.collection.updateOne({ 'ime': ime }, { $inc: { 'brojSportista': 1 } });
        // console.log('uspesno azuriran broj sportista zemlje ' + ime);
    }

    dohvatiZemlju= (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;

        Zemlja.findOne({'ime':ime}, (err, zemlja) => {
            if (err) console.log(err);
            else res.json(zemlja);
        })
    }
}