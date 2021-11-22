// src/routes/rates.js

const express = require("express");
const router = express.Router();
const exchangeRates = require("../models/rates");
const serviceRates = require("../services/rates");

/**
 * Returns all rates
 */
router.get("/", (req, res) => {
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
router.post("/", (req, res) => {
    const data = req.body;
    if (data.action) {
      return res.json({
        data: rateCalculator(data)
      });
    } else {
      return res.json({
        data: convertRate(data)
      });
    }
});

/**
 * Converts currencies
 * @param {*} data 
 * @returns 
 */
const convertRate = (data) => {
  const { from, to, amount } = data;
  let total = 0;
  try {
    const exchangeRateTo = serviceRates.getRate(to);
    const exchangeRateFrom = serviceRates.getRate(from);
    const rate = to === "usd" ? exchangeRateFrom : exchangeRateTo;

    total = serviceRates.convertingRate(to, amount, rate, from);  
    return serviceRates.returnBuilder(
      data,
      total,
      exchangeRateTo,
      exchangeRateFrom,
      "convert"
    );
  } catch (error) {
    console.log(error);
    return total;
  }
}

/**
 * Additions two different currencies
 * @param {*} data 
 * @returns 
 */
const rateCalculator = (data) => {
  try {
    const { from, amount, to, amount2, action, currency } = data;
    const rateCurrency = serviceRates.getRate(currency);
    const dollarAmount = serviceRates.toDollar(amount, from);
    const dollarAmount2 = serviceRates.toDollar(amount2, to);
    const totalInDollar = serviceRates.operationsRate(
      dollarAmount,
      dollarAmount2,
      action
    );
    const exchangeRateTo = serviceRates.getRate(to);
    const exchangeRateFrom = serviceRates.getRate(from);
    
    const totalConverted = serviceRates.operationsRate(
      totalInDollar,
      rateCurrency[0].exchangeRate,
      "multi"
    );
    
    return serviceRates.returnBuilder(
      data,
      totalConverted,
      exchangeRateFrom,
      rateCurrency,
      "calculate",
      action
    );
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = router;