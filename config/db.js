import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/ecommmerce`)
        console.log("DB connected");
    } catch (error) {
        // throw new Error(error);
        console.log(error)
        process.exit(1)
    }
}


export default connectDB