import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Korisnik=new Schema({
    korisnickoIme:{
        type:String
    },
    lozinka:{
        type:String
    },
    ime:{
        type:String
    },
    prezime:{
        type:String
    },
    zemlja:{
        type:String
    },
    email:{
        type:String
    },
    tip:{
        type:String
    }
}, {
    collection: 'Korisnik',
    versionKey: false //here
});

export default mongoose.model('Korisnik', Korisnik, 'korisnici');