import express from "express"
import {PrismaClient} from "@prisma/client"
import cors from "cors"

const prisma = new PrismaClient()

const app = express()
const port = 8000

// Cors header to authorize requests
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.post('/add', async (req, res) => {
    try {
      const newUser = await prisma.user.create({
        data: {
          firstname: 'John',
          lastname: 'Doe',
          mail: 'john.doe@example.com'
        }
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

app.get('/list', async (req, res) => {
    try {
        const usersList = await prisma.user.findMany()
        res.status(200).json({data: usersList})
    }
    catch (error) {
        console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
})

app.listen(port, () => {
    console.log('Serveur démarré sur le port : ' + port)
})