import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import Article from "../models/Article.js";
export async function postArticle (req, res) {
    try {

        const user = await User.findById(req.user.id)
        if (!user) {
            //user not found
            console.log("kij")
            res.send("user not found")
        }
            console.log(user._id)
        const article = await new Article({
            title: req.body.title,
            body: req.body.body,
            author: user._id
        })
        await article.save()
        console.log(user)

        user.articles.push(article._id)
        await user.save()
 
        res.send("article created")

    }
    catch (err) { console.log(err) }

}

export default postArticle