import express  from "express";
import {PrismaClient} from "@prisma/client"

const router = express.Router()
const prisma = new PrismaClient()

router.get('/list', async (req, res) => {
    try {
        const usersList = await prisma.user.findMany()
        res.status(200).json({data: usersList})
    }
    catch (error) {
        console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
})

router.post('/add', async (req, res) => {
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

export default router