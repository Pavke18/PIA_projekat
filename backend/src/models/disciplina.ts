import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Disciplina=new Schema({
    sport:{
        type:String
    },
    disciplina:{
        type:String
    },
    vrsta:{
        type:String
    },
    minIgraca:{
        type:Number
    },
    maxIgraca:{
        type:Number
    },
    dodato:{
        type:String
    } 
},{
    collection: 'Disciplina',
    versionKey: false //here
});

export default mongoose.model('Disciplina', Disciplina, 'sportovi2');