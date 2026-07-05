import mongoose from "mongoose";
import bcrypt from "bcrypt";

const addressSchema = mongoose.Schema({
    phone:{
        type: String,
        
    },
    pincode:{
        type: String,
        
    },
    address:{
        type: String,  
    },
    
},{_id: false})


const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    role:{
        type:String,
        enum: ["user","admin"],
        default: "user"
    },
    address:[addressSchema]
        
},{timestamps: true})

userSchema.pre("save",async function(next){
    try {
        if(!this.isModified('password')){
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password,salt);
        console.log(hashedPassword);
        this.password = hashedPassword;
        next();
    } catch (error) {
        console.log("password error",error)
    }
})

const User = mongoose.model("User",userSchema);

export default User;