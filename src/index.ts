import express, { Express } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { AddressInfo } from "net"

dotenv.config()

const app: Express = express()
app.use(express.json())
app.use(cors())

app.use("/challenge")

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo
        console.log(`Server is running in port ${address.port}`)
    } else {
        console.log(`Failure upon starting server.`)
    }
})