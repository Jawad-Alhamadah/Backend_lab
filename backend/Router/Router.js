
import { Router } from "express";
const router=Router()

export default router

import { login } from "../Controllers/LoginController.js";
import registerUser from "../Controllers/RegisterUserController.js"
import postArticleController from "../Controllers/PostArticleController.js"
import jwt from 'jsonwebtoken';

function auth(req, res, next) {


    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, process.env.JWT_secret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user;
        next()
    });

}



router.post("/addArticle", auth, postArticleController)

router.post("/register", registerUser)



router.post("/login",login)