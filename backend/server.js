import express from "express"
const app = express()
app.use(express.json())

let port = 8080
let blogs =[]
let users =[]
app.listen(port || 7000, () => console.log(`listening to ${port || 7000}`))

app.get("/blogs",(req,res)=>{
    res.json(blogs)
})

app.get("/blogs/:id",(req,res)=>{
    let id = parseFloat( req.params.id)
    let filtered = blogs.filter(post => post.id===id)
    res.json(filtered)
})

app.post("/blogs",(req,res)=>{
    let {username,post} = req.body
    blogs.push({username,post,"id":blogs.length+1})

    res.json(blogs)
})

app.delete("/blogs/:id",(req,res)=>{
    let id = parseInt(req.params.id)
    let filtered = blogs.filter(post => post.id!==id)
    blogs = filtered
    res.status(200).json({"mess":"post deleted"})

})


app.patch("/blogs/:id",(req,res)=>{
    
    let index;
    for (let i =0; i < blogs.length; i++){

        if (parseInt(blogs[i].id)===parseInt(req.params.id))  index=i
    }

    let body =req.body
    let {username,post} = body
    if(!index) return res.send("not found")
    blogs[index]= {"username":(username|| blogs[index].username) , "post": (post|| blogs[index].post),"id":blogs[index].id}
   
    res.json(blogs[index])
})


app.post("/signup",(req,res)=>{
    let {username,password,email} = req.body

    if(!username) return res.json({"mess":"Username is empty"})
    if(!password) return res.json({"mess":"password is empty"})

    if(users.filter(user=>user.username===username).length <=0){
        let new_user = {username,password,email,"id":users.length+1}

        users.push(new_user)
        return res.json(new_user)
    }
    return res.json({"mess":"User already exists"})
})



app.post("/login",(req,res)=>{

    let {username,password} = req.body

    if(!username) return res.json({"mess":"Username is empty"})
    if(!password) return res.json({"mess":"password is empty"})
    let user_filter = users.filter(user=>user.username===username)
    if(user_filter){
        
       if(user_filter[0].username===username && user_filter[0].password === password){
        res.json({"mess":"login sucessful"})
       }
    }
    return res.json({"mess":"Incorrect login"})

})