import express from 'express';
import { TakmicenjeController } from '../controllers/takmicenje.controller';

const takmicenjeRouter=express.Router();

takmicenjeRouter.route('/dohvatiMojaTakmicenja').post(
    (req,res)=>new TakmicenjeController().dohvatiDelegatovaTakmicenja(req,res)
)

takmicenjeRouter.route('/dohvatiTakmicenje').post(
    (req,res)=>new TakmicenjeController().dohvatiTakmicenje(req,res)
)

takmicenjeRouter.route('/dodajRasporedTakmicenja').post(
    (req,res)=>new TakmicenjeController().dodajRasporedTakmicenja(req,res)
)

takmicenjeRouter.route('/dodajRezultatTakmicenja').post(
    (req,res)=>new TakmicenjeController().dodajRezultatTakmicenja(req,res)
)

takmicenjeRouter.route('/dohvatiRezultateTakmicenjaIndivid').post(
    (req,res)=>new TakmicenjeController().dohvatiRezultateTakmicenjaIndivid(req,res)
)

takmicenjeRouter.route('/osvojenaMedaljaIndivid').post(
    (req,res)=>new TakmicenjeController().osvojenaMedaljaIndivid(req,res)
)

export default takmicenjeRouter;