import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:String,
    author:String,
    version:String,
    publishedDate:Date,
    isDigital:Boolean,
    price:Number,
    languages:[String],
    catagory:String

    
})
const Book = mongoose.model("Book",bookSchema)
export default  Book 

