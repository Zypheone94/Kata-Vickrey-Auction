import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/list", async (req, res) => {
  try {
    const auctionList = await prisma.auction.findMany();
    res.status(200).json({ data: auctionList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/readAuction/:id", async (req, res) => {
  const auctionId = parseInt(req.params.id);

  try {
    const auctionData = await prisma.auction.findUnique({
      where: {
        id: auctionId,
      },
    });
    res.status(201).json({ data: auctionData });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured when searching for auction" });
  }
});

router.post("/create", async (req, res) => {
  const { title, description, reservePrice } = req.body;

  const now = new Date();
  const expiration = new Date(now.getTime() + 10 * 60000);

  try {
    const newAuction = await prisma.auction.create({
      data: {
        title,
        description,
        reservePrice: parseFloat(reservePrice),
        createdTime: now,
        expiration: expiration,
      },
    });
    res.status(201).json(newAuction);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
