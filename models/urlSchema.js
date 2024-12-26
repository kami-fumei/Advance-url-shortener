import mongo from "mongoose";

const urlSchema =mongo.Schema({
    //og->Original
    ogUrl:{
        type:String,
        required:true,
        
    },
    //sh->Short url
     shUrl:{
        type:String,
        required:true,
        unique:true,
     },
     createdAt: { 
        type: Date, 
        default: Date.now },
        //visted data and time
      vistDT:[ { time:{
        type:Number,
      }}],
      //number of clickes
      noClick:{
        type:Number
      },
     //ip adderss
     ip:{
        type:String
     }, 
     //dives ios or android or pc 
     dives:{
        type:String,
     }

})

export const urls = mongo.model("urls",urlSchema);

