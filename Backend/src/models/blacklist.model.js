const mongoose=require('mongoose');

const blacklistSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"Token must be required for black listing"]
    }
},{
    timestamps:true
})
const blacklistModel=mongoose.model("blackListToken",blacklistSchema);


module.exports=blacklistModel;