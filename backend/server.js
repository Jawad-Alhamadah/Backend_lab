import express from "express"
import mongoose from "mongoose"
import Article from "./models/Article.js"
import Book from "./models/Book.js"
import dotenv from 'dotenv'

dotenv.config()


startConnection().catch(err => console.log(err))
async function startConnection() {
    // console.log()
    await mongoose.connect(process.env.CONNECTION_STRING)

    console.log("connected to Mongoose")
}


const app = express()
app.use(express.json())

let port = 8080

app.listen(port || 7000, () => console.log(`listening to ${port || 7000}`))


app.get("/book/:id", (req, res) => {
    let {id} = req.params
 
    Book.findOne({"_id":id})
    .then(result=>res.json(result))

})

app.post("/book", (req, res) => {
    let { author, title, version, publishedDate, isDigital, price, languages, catagory } = req.body
    let book = new Book({
        author: author || "",
        title: title || "",
        version: version || "",
        publishedDate: publishedDate || "",
        isDigital: isDigital || "",
        price: price || "",
        languages: languages || "",
        catagory: catagory || ""
    }
    )
    book.save()
    .then(result=>res.json(result))

})



app.get("/book", (req, res) => {
  Book.find()
    .then(result=>res.json(result))

})






app.patch("/book/:id", (req, res) => {
    const userId = req.params.id
    const { author, title, version, publishedDate, isDigital, price, languages, catagory } = req.body
    console.log(author)
    console.log(userId)
    const book = new Book({
        author: author 
    }
    )
   // findByIdAndUpdate(id,{author:req.body.author},{new:true})
    Book.findByIdAndUpdate(userId,book)
    .then(result=>res.send())

})


app.patch("/book/:id", (req, res) => {
  let {id} =req.params
   // findByIdAndUpdate(id,{author:req.body.author},{new:true})
    Book.findByIdAndDelete(id,book)
    .then(result=>res.send())

})
