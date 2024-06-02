import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/list/:auctionId", async (req, res) => {
  const auctionId = req.params.auctionId;
  try {
    const bidList = await prisma.bid.findMany({
      where: {
        auctionId: parseInt(auctionId),
      },
    });
    return res.status(200).json({ data: bidList });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.post("/add", async (req, res) => {
  const { amount, bidderId, auctionId } = req.body;
  try {
    const newBid = await prisma.bid.create({
      data: {
        amount: parseFloat(amount),
        bidderId: parseInt(bidderId),
        auctionId: parseInt(auctionId),
      },
    });
    return res.status(200).json({ data: newBid });
  } catch (err) {
    return res.status(500).json({ err: err });
  }
});

export default router;
