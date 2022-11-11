var express = require('express');
var router = express.Router();

const package = require("../package.json");
const time = Date.now();
const now = new Date(time);

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.send( { server: 'Express with SQL' });
// });

router.get("/", (req, res, next) =>
  res.send({ name: package.name, date: now.toString() })
);

module.exports = router;
