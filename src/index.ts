import express, { Request, Response } from "express";

import dotenv from "dotenv";
import env from "./config/env.config";
import db from "./db/models";
import router from "./routes";

dotenv.config()

const PORT = env.PORT;
const app = express()
app.use(express.json())

app.use(router)

//. this will create the tables if they don't exist
db.sequelize.sync()


app.get("/", (req: Request, res: Response) => { res.send("Hi") })

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
