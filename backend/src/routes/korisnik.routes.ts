import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';

const korisnikRouter=express.Router();

korisnikRouter.route('/prijavaKor').post(
    (req,res)=>new KorisnikController().prijavaKor(req,res)
)

korisnikRouter.route('/promenaLozinke').post(
    (req,res)=>new KorisnikController().promeniLozinku(req,res)
)

korisnikRouter.route('/registracija').post(
    (req,res)=>new KorisnikController().registracija(req, res)
)

korisnikRouter.route('/dohvatiZahteve').get(
    (req,res)=>new KorisnikController().dohvatiZahteve(req,res)
)

korisnikRouter.route('/prihvatiZahtev').post(
    (req,res)=>new KorisnikController().prihvatiZahtev(req,res)
)

korisnikRouter.route('/odbijZahtev').post(
    (req,res)=>new KorisnikController().odbijZahtev(req,res)
)

korisnikRouter.route('/dohvatiDelegate').get(
    (req,res)=>new KorisnikController().dohvatiDelegate(req,res)
)

korisnikRouter.route('/ubaciSportistu').post(
    (req,res)=>new KorisnikController().ubaciSportistu(req,res)
)

korisnikRouter.route('/ubaciEkipu').post(
    (req,res)=>new KorisnikController().ubaciEkipu(req,res)
)

export default korisnikRouter;