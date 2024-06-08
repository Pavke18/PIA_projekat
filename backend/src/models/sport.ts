import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Sport = new Schema({
    sport: {
        type: String
    },
    dodato: {
        type: String
    }
},{
    collection: 'Sport',
    versionKey: false //here
});

export default mongoose.model('Sport', Sport, 'sportovi1');