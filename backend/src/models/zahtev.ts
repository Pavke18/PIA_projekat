import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Zahtev = new Schema({
    korisnickoIme: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    zemlja: {
        type: String
    },
    email: {
        type: String
    },
    tip: {
        type: String
    },
}, {
    collection: 'Zahtev',
    versionKey: false //here
});

export default mongoose.model('Zahtev', Zahtev, 'zahtevi');