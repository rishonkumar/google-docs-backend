import express, {Request,Response} from "express";

import dotenv from "dotenv";

dotenv.config()

const PORT = 8000;
const app = express()
app.get("/", (req: Request, res: Response) => {res.send("Hi")})
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
