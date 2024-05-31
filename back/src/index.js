import express from "express"
import cors from "cors"

import userRoute from './routes/userRoute.js'
import auctionRoute from './routes/auctionRoute.js'

const app = express()
const port = 8000

// Cors header to authorize requests
app.use(cors())

app.use('/user', userRoute);
app.use('/auction', auctionRoute);

app.listen(port, () => {
    console.log('Serveur démarré sur le port : ' + port)
})