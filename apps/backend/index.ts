import { prisma } from "db/db"
import express from "express"
import cors from "cors"
import { user } from "./Route/Userlogin"
import { content } from "./Route/content"


const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())

app.use(express.json())

app.use("/login/v1" , user)

app.use("/content/v2" , content)


app.listen(PORT , ()=> console.log(` server is running on ${PORT}`) )