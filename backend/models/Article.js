import mongoose from "mongoose"
const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:String,
    author:{ref:"User",type:mongoose.SchemaTypes.ObjectId}
    
  },
  {timestamps:true}
)
const Article = mongoose.model('Article', articleSchema);
export default Article

