// src/routes/rates.js

const express = require("express");
const router = express.Router();
const exchangeRates = [
  { currencyCode: "usd", exchangeRate: 1 },
  { currencyCode: "eur", exchangeRate: 0.87815 },
  { currencyCode: "gbp", exchangeRate: 0.78569 },
  { currencyCode: "cad", exchangeRate: 1.31715 },
  { currencyCode: "inr", exchangeRate: 69.3492 },
  { currencyCode: "mxn", exchangeRate: 19.2316 },
  { currencyCode: "aud", exchangeRate: 1.43534 },
  { currencyCode: "cny", exchangeRate: 6.88191 },
  { currencyCode: "myr", exchangeRate: 4.13785 },
  { currencyCode: "cop", exchangeRate: 3203.18 },
];

/**
 * Returns all rates
 */
router.get("/", async (req, res) => {
  try {
        res.status(200).json({
          success: true,
          data: exchangeRates,
        });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Exchange Rate Conversion
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
      ? await getRate(from)
      : await getRate(to);

  switch (to) {
    case "usd":
      returned = amount / rate[0].exchangeRate;
      break;
    default:
      returned = amount * rate[0].exchangeRate;
      if (from !== "usd") {
        const dollar = await toDollar(amount, from);
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
  const rateCurrency = await getRate(currency),
    dollarAmount = await toDollar(amount, from),
    dollarAmount2 = await toDollar(amount2, to);
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

/**
 * Converts currency to Dollar
 * @param {*} amount 
 * @param {*} currency 
 * @returns 
 */
let toDollar = async (amount, currency) => {
  rate = exchangeRates.filter((exRate) => exRate.currencyCode === currency);
  return amount / rate[0].exchangeRate;
}

/**
 * Returns the rate object
 * @param {*} currency 
 * @returns 
 */
let getRate = async currency => 
  exchangeRates.filter((exRate) => exRate.currencyCode === currency);

module.exports = router;