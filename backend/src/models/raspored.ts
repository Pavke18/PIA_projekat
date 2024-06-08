import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let RasporedRezultat = new Schema({
    sport: {
        type: String
    },
    disciplina: {
        type: String
    },
    pol: {
        type: String
    },
    datum: {
        type: String
    },
    vreme: {
        type: String
    },
    takmicari: {
        type: Array
    },
    lokacija:{
        type:String
    },
    runda:{
        type:String
    },
    unetiRezultati:{
        type:Boolean
    }
},{
    collection: 'RasporedRezultat',
    versionKey: false //here
});

export default mongoose.model('RasporedRezultat', RasporedRezultat, 'rasporediRezultatati');