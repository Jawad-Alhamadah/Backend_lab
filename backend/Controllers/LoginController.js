
import bcrypt from "bcrypt"
import User from "../models/User.js";
export async function login (req, res) {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {

        return res.status(400).json({ message: 'User not found' });
        
     }

     let isMatched = await bcrypt.compare(password,user.password)
     if(!isMatched) return res.status(400).json({message:"Incorrect Password"})

     res.status(200).json({ message: 'Login successful', user });


}

export default login
