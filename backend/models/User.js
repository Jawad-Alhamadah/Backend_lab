import mongoose from "mongoose";

let UsersSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,

        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    articles:[{ref:"Article",type:mongoose.SchemaTypes.ObjectId}]
})

const User = mongoose.model("User",UsersSchema)
export default User