import express from "express";
import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = "My_secret";

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
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await prisma.user.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        mail: email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      mail: email,
    },
  });
  if (!user) {
    return res.status(400).send({ error: "Error, user not found" });
  } else {
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).send("Incorrect password");
    }
    const token = jwt.sign({ username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ data: token });
  }
});

export default router;
