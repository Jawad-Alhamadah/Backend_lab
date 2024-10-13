import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
export async function registerUsesr (req, res) {

    const { username, email, password } = req.body;
    const isExistUser = await User.findOne({ email });

    let hashedPassword = await bcrypt.hash(password, 10)
    if (isExistUser) {
        return res.json({ messsage: "email already exists" })
    }

    const newUser = new User({ username, email, password: hashedPassword }) 

    const token = jwt.sign(

        { id: newUser._id, email: newUser.email },

        process.env.JWT_SECRET,

        { expiresIn: '1h' }

    );
    await newUser.save()
    res.status(201).json({ message: 'User registered successfully', user: newUser, token: token })

}

export default registerUsesr