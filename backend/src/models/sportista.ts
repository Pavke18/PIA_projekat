import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Sportista=new Schema({
    ime_prezime:{
        type:String
    },
    zemlja:{
        type:String
    },
    sport:{
        type:String
    },
    disciplina:{
        type:String
    },
    pol:{
        type:String
    },
    medalja:{
        type:Boolean
    }
},{
    collection: 'Sportista',
    versionKey: false //here
});

export default mongoose.model('Sportista', Sportista, 'sportisti');