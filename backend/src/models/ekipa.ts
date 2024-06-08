import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Ekipa=new Schema({
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
    igraci:{
        type:Array
    }
},{
    collection: 'Ekipa',
    versionKey: false //here
});

export default mongoose.model('Ekipa', Ekipa, 'ekipe');