import express from "express";
import { PrismaClient } from "./generated/prisma/index.js";
import cors from 'cors'

const prisma = new PrismaClient()
const app = express();
app.use(cors())
app.use(express.json())

app.post( "/rotaAna" , async(req,res) => {
    await prisma.pessoa.create({ 
         data : {
            name : req.body.name,
            email : req.body.email,
            age : req.body.age
         }}
    )
    res.status(201).json(req.body) // usuario criado
})

app.delete("/rotaAna/:id" , async (req,res) => {
    await prisma.pessoa.delete({
        where : {
            id : req.params.id
        }
    })
        res.send("deletado")
})

app.get("/rotaAna" , async(req,res) => {
    const users = await prisma.pessoa.findMany()
    res.status(200).json(users)
})

app.put("/rotaAna/:id" , async (req,res) => {
    
    await prisma.pessoa.update({
        where : {
            id: req.params.id
        }  , 
        data : {
            name : req.body.name,
            email : req.body.email,
            age : req.body.age
        }
    })
    
    res.status(201).json(req.body) // usuario criado
})

app.listen(3000)