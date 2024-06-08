import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Rekord = new Schema({
   godina:{
       type:String
   },
   mesto:{
       type:String
   },
   disciplina:{
       type:String
   },
   takmicar:{
       type:String
   },
   drzava:{
       type:String
   },
   rezultat:{
       type:String
   }
});

export default mongoose.model('Rekord', Rekord, 'rekordi');