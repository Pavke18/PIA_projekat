import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Takmicenje=new Schema({
    sport:{
        type:String
    },
    disciplina:{
        type:String
    },
    pol:{
        type:String
    },
    datumPocetka:{
        type:String
    },
    datumKraja:{
        type:String
    },
    lokacija:{
        type:String
    },
    delegat:{
        type:String
    },
    tip:{
        type:String
    },
    takmicari:{
        type:Array
    },
    brRundi:{
        type:Number
    }
},{
    collection: 'Takmicenje',
    versionKey: false //here
});

export default mongoose.model('Takmicenje', Takmicenje, 'takmicenja');