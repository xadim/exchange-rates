// src/routes/rates.js

const express = require("express");
const router = express.Router();
const exchangeRates = require("../models/rates");
const serviceRates = require("../services/rates");

/**
 * Returns all rates
 */
router.get("/", async (req, res) => {
  try {
        res.status(200).json({
          success: true,
          data: exchangeRates(),
        });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * 
 * Exchange Rate Conversion
 */
router.post("/", async (req, res) => {
    const data = req.body;
    if (data.action) {
      return res.json({
        message: await rateCalculator(data),
        success: true,
      });
    } else {
      return res.json({
        message: await convertRate(data),
        success: true,
      });
    }
});

/**
 * Converts currencies
 * @param {*} data 
 * @returns 
 */
let convertRate = async (data) => {
  const { from, to, amount } = data;
  let returned = 0;

  const rate =
    to === "usd"
      ? await serviceRates.getRate(from)
      : await serviceRates.getRate(to);

  switch (to) {
    case "usd":
      returned = amount / rate[0].exchangeRate;
      break;
    default:
      returned = amount * rate[0].exchangeRate;
      if (from !== "usd") {
        const dollar = await serviceRates.toDollar(amount, from);
        returned = dollar * rate[0].exchangeRate;
      }
  }
  return `Exchange Rate: ${amount} ${from.toUpperCase()} is ${returned.toFixed(2)} ${to.toUpperCase()}`;
}

/**
 * Additions two different currencies
 * @param {*} data 
 * @returns 
 */
let rateCalculator = async (data) => {
  const { from, amount, to, amount2, action, currency } = data;
  const rateCurrency = await serviceRates.getRate(currency),
    dollarAmount = await serviceRates.toDollar(amount, from),
    dollarAmount2 = await serviceRates.toDollar(amount2, to);
    switch(action) {
      case "sub":
        totalInDollar = dollarAmount - dollarAmount2;
        break;
      default:
        totalInDollar = dollarAmount + dollarAmount2;
    }
    const returned = totalInDollar * rateCurrency[0].exchangeRate,
      message = `Exchange Rate: Add ${amount} ${from.toUpperCase()} to ${amount2} ${to.toUpperCase()} is ${returned.toFixed(
        2
      )} ${currency.toUpperCase()}`;
  return message;
}

module.exports = router;