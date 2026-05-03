import mongoose from "mongoose";
const connectDB=async()=>{
    try{
            await mongoose.connect(process.env.MONGO_URL);
            console.log("DB Connected")
    }
    catch(e){
        console.log("ERROR: "+e)
    }
    
}
export default connectDB