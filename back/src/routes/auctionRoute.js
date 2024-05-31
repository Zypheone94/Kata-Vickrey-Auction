import express  from "express";
import {PrismaClient} from "@prisma/client"

const router = express.Router()
const prisma = new PrismaClient()

router.get('/list', async (req, res) => {
    try {
        const auctionList = await prisma.auction.findMany()
        res.status(200).json({data: auctionList})
    }
    catch (error) {
        console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
})

router.post('/create', async (req, res) => {
    try {
        const newAuction = await prisma.auction.create({
            data: {
                title: "Gameboy",
                description: "Very old gaming système",
                reservePrice: 100
            }
        })
        res.status(201).json(newAuction)
    }
    catch (error){
        res.status(500).json({ error: 'An error occured when creating new auction' });
    }
})

export default router