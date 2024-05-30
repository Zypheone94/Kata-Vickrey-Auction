import express from "express"
import cors from "cors"

import userRoute from './routes/userRoute.js'

const app = express()
const port = 8000

// Cors header to authorize requests
app.use(cors())

app.use('/user', userRoute);

app.listen(port, () => {
    console.log('Serveur démarré sur le port : ' + port)
})