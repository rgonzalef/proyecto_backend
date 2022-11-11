
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));



// SELECT
router.get("/", async (req, res, next) => {
  const transactions = await prisma.transaction.findMany(); 
  res.send({ data: transactions });
});

// SELECT UNIQUE
router.get("/:id", async (req, res, next) => {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  }); 
  res.send({ data: transaction });
});


const convert = async (conversion_rates, body, res) => {
  const newTransaction = await prisma.transaction.create({
    data: {
      ...body,
      amount: body.dollar_amount * conversion_rates,
    },
  });

  res.status(201).json(newTransaction);
};

//CREATE
router.post("/", async (req, res, next) => {
  if (req.body.is_dollar) {
    fetch(
      "https://v6.exchangerate-api.com/v6/a1342127c4e22bcfbdae55a5/latest/USD"
    )
      .then((response) => response.json())
      .then((data) => {
        convert(data.conversion_rates.PEN, req.body, res);
      });
  } else {
    const newTransaction = await prisma.transaction.create({
      data: req.body,
    });

    res.status(201).json(newTransaction);
  }
});


// UPDATE
router.patch("/:id", async (req, res, next) => {
  const updateTransaction = await prisma.transaction.update({
    
    where: {
      id: parseInt(req.params.id),
    },
    data: req.body,
  });

  res.status(200).json(updateTransaction);
});


// DELETE
router.delete("/:id", async (req, res, next) => {
  const deleteTransaction = await prisma.transaction.delete({
    
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.status(200).json(deleteTransaction);
});
module.exports = router;
