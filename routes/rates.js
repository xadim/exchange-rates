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

  returned = await serviceRates.convertingRate(to, amount, rate, from);
  return `Exchange Rate: ${amount} ${from.toUpperCase()} is ${returned.toFixed(2)} ${to.toUpperCase()}`;
}

/**
 * Additions two different currencies
 * @param {*} data 
 * @returns 
 */
let rateCalculator = async (data) => {
  try {
    const { from, amount, to, amount2, action, currency } = data;
    const rateCurrency = await serviceRates.getRate(currency),
      dollarAmount = await serviceRates.toDollar(amount, from),
      dollarAmount2 = await serviceRates.toDollar(amount2, to);
    const totalInDollar = await serviceRates.operationsRate(
      dollarAmount,
      dollarAmount2,
      action
    );
    const returned = await serviceRates.operationsRate(totalInDollar, rateCurrency[0].exchangeRate, 'multi');
    const message = `Exchange Rate: Add ${amount} ${from.toUpperCase()} to ${amount2} ${to.toUpperCase()} is ${returned.toFixed(
        2
      )} ${currency.toUpperCase()}`;
    return message;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = router;