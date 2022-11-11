const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  const accounts = await prisma.account.findMany(); // SELECT
  res.send({ data: accounts });
});

  router.get("/:id", async (req, res, next) => {
    const account = await prisma.account.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    }); // SELECT UNIQUE
    res.send({ data: account });
  });
  
  router.post("/", async (req, res, next) => {
    const newAccount = await prisma.account.create({
      // INSERT
      data: req.body,
    });
  
    res.status(201).json(newAccount);
  });
  
  router.patch("/:id", async (req, res, next) => {
    const updateAccount = await prisma.account.update({
      // UPDATE
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
  
    res.status(200).json(updateAccount);
  });
  
  router.delete("/:id", async (req, res, next) => {
    const deleteAccount = await prisma.account.delete({
      // DELETE
      where: {
        id: parseInt(req.params.id),
      },
    });
  
    res.status(200).json(deleteAccount);
  });

module.exports = router;