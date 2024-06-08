import express from 'express';
import { SportController } from '../controllers/sport.controller';

const sportRouter=express.Router();

sportRouter.route('/dohvatiSveSportove').get(
    (req,res)=>new SportController().dohvatiSveSportove(req,res)
)

sportRouter.route('/dohvatiDodateSportove').get(
    (req,res)=>new SportController().dohvatiDodateSportove(req,res)
)

sportRouter.route('/dohvatiSveDiscipline').get(
    (req,res)=>new SportController().dohvatiSveDiscipline(req,res)
)

sportRouter.route('/dohvatiDiscipline').post(
    (req,res)=>new SportController().dohvatiDiscipline(req,res)
)

sportRouter.route('/dohvatiDodateDiscipline').post(
    (req,res)=>new SportController().dohvatiDodateDiscipline(req,res)
)

sportRouter.route('/dohvatiDodateEkipneDiscipline').post(
    (req,res)=>new SportController().dohvatiDodateEkipneDiscipline(req,res)
)

sportRouter.route('/dohvatiSportiste').post(
    (req,res)=>new SportController().dohvatiSportiste(req,res)
)

sportRouter.route('/dohvatiSportisteZaEkipu').post(
    (req,res)=>new SportController().dohvatiSportisteZaEkipu(req,res)
)

sportRouter.route('/dodajSportDisciplinu').post(
    (req,res)=>new SportController().dodajSportDisciplinu(req,res)
)

sportRouter.route('/dohvatiSportisteDiscipline').post(
    (req,res)=>new SportController().dohvatiSportisteDiscipline(req,res)
)

sportRouter.route('/dohvatiIzabraniSport').post(
    (req,res)=>new SportController().dohvatiIzabraniSport(req,res)
)

sportRouter.route('/dohvatiSportisteDrzave').post(
    (req,res)=>new SportController().dohvatiSportisteDrzave(req,res)
)

sportRouter.route('/dohvatiEkipe').post(
    (req,res)=>new SportController().dohvatiEkipe(req,res)
)

sportRouter.route('/dodajTakmicenje').post(
    (req,res)=>new SportController().dodajTakmicenje(req,res)
)

sportRouter.route('/dohvatiRekorde').get(
    (req,res)=>new SportController().dohvatiRekorde(req,res)
)

export default sportRouter;