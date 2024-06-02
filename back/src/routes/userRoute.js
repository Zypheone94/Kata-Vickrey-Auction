import express from "express";
import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt"

const router = express.Router();
const prisma = new PrismaClient();

router.get("/list", async (req, res) => {
  try {
    const usersList = await prisma.user.findMany();
    res.status(200).json({ data: usersList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/add", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    const newUser = await prisma.user.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        mail: email,
        password: hashedPassword
      },
    });
    res.status(201).json({ data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

export default router;
