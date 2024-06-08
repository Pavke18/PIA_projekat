import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Zemlja=new Schema({
    zastava:{
        type:String
    },
    ime:{
        type:String
    },
    brojSportista:{
        type:Number
    },
    brZlatnih:{
        type:Number
    },
    brSrebrnih:{
        type:Number
    },
    brBronzanih:{
        type:Number
    },
    ukupnoMedalja:{
        type:Number
    }
});

export default mongoose.model('Zemlja', Zemlja, 'zemlje');