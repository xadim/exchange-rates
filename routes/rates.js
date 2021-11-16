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
        data: await rateCalculator(data)
      });
    } else {
      return res.json({
        data: await convertRate(data)
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
  try {
    const rate =
      to === "usd"
        ? await serviceRates.getRate(from)
        : await serviceRates.getRate(to);

    returned = await serviceRates.convertingRate(to, amount, rate, from);
    const message = `Exchange Rate: ${amount} ${from.toUpperCase()} is ${returned.toFixed(
      2
    )} ${to.toUpperCase()}`;

    const toBeReturned = {
      amount: parseFloat(returned.toFixed(2)),
      message: message,
    };
    return toBeReturned;
  } catch (error) {
    console.log(error);
    return returned;
  }
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
    const toRet = {
      amount: parseFloat(returned.toFixed(2)),
      message: message,
    };
    return toRet;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = router;