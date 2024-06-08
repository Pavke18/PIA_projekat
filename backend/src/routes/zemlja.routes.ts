import express from 'express';
import { ZemljaController } from '../controllers/zemlja.controller';

const zemljaRouter=express.Router();

zemljaRouter.route('/dohvatiSveZemlje').get(
    (req,res)=>new ZemljaController().dohvatiSveZemlje(req,res)
)

zemljaRouter.route('/dohvatiSveZemljeSortirano').get(
    (req,res)=>new ZemljaController().dohvatiSveZemljeSortirano(req,res)
)

zemljaRouter.route('/azurirajBrojSportista').post(
    (req,res)=>new ZemljaController().azurirajBrojSportista(req,res)
)

zemljaRouter.route('/dohvatiZemlju').post(
    (req,res)=>new ZemljaController().dohvatiZemlju(req,res)
)

export default zemljaRouter;