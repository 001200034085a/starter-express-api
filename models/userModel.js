const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    image:{
        type:String
    },
    name:{
        type:String, 
        require:true
    },
    email:{
        type:String,
        require:true
    },
    age:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    textarea:{
        type:String,
        require:true
    },
    isAdmin:{
        type: String, 
        require:true,
        default:false
    },
    isAdmin1:{
        type:String
    },
    isAdmin2:{
        type:String
    },
    isAdmin3:{
        type:String
    },
    isAdmin4:{
        type:String
    },
    isAdmin5:{
        type:String
    },
    isAdmin6:{
        type:String
    },
    isAdmin7:{
        type:String
    },
    isAdmin8:{
        type:String
    },
});

userSchema.pre('save',async function (next){
//    mã hóa password trước khi lưu vào user database
    if(!this.isModified('password')){
        return next();
    } 
    try{
       const salt = await bcrypt.genSalt(10);
       this.password = await bcrypt.hash(this.password, salt);
       return next();
    }
    catch(err){
        return next(err);
    }
})

const User = mongoose.model('User',userSchema);

module.exports = User;