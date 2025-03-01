import express from "express" ;
import dotenv from "dotenv" ; 
import morgan from "morgan" ; 
import mongoose from "mongoose" ; 
import routerCategory  from "./routes/category"  ;
import routerProduct from "./routes/products" ;
import  userRouter from "./routes/user"  
import  routerOrders from "./routes/orders" 
import path from "path" 

import Auth from "./helpers/jwt"
import cors from "cors" 
import Error from "./helpers/Error"

const app = express() ;  

dotenv.config() ; 

const port = process.env.PORT ; 
const api = process.env.API_URl  ;  

// Middleware  
app.use(cors()) 
app.use(Auth()) 
app.use(Error)
app.use(express.json()) 
app.use(express.urlencoded({
    extended:true
}))  
//Définir mes fichiers téléchargés de maniére statique ...
app.use('/public/uploads', express.static(__dirname + '/public/uploads')); 
//morgan pour enrigistrer les requétes http pour node js (utilisation d'une chaine de format prédéfinie)
app.use(morgan('tiny')) 


//connection avec ma base de donnée .
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 
.then(()=> console.log("connection à la base de donnée réussie"))
.catch(()=>console.log("La connection à la base donnée à  échouée "))
// app.get(`${api}/products` ,(req,res)=>{ 
    
//     res.send("hello")
// })    


app.use(`${api}` , routerCategory)
app.use( `${api}`, routerProduct)
app.use( `${api}`, userRouter) 
app.use( `${api}`, routerOrders) 


app.listen(port ,()=>{ 
    console.log(`Le serveur est lancé sur le port ${port}`)
})