require('dotenv').config()
const mongoURI = process.env.MONGO_URI || "mongodb+srv://brewurichard:kjkszpj123@cluster0.1ea3h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const mongoose=require("mongoose")

const connectToDB=async()=>{
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("DB Connected")
    } catch (error) {
        console.log(error)
    }
}
connectToDB()