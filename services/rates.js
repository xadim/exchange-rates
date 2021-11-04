const exchangeRates = require("../models/rates");

/**
 * Converts currency to Dollar
 * @param {*} amount
 * @param {*} currency
 * @returns
 */
let toDollar = async (amount, currency) => {
  rate = exchangeRates().filter((exRate) => exRate.currencyCode === currency);
  return amount / rate[0].exchangeRate;
};

/**
 * Returns the rate object
 * @param {*} currency
 * @returns
 */
let getRate = async (currency) =>
  exchangeRates().filter((exRate) => exRate.currencyCode === currency);

module.exports = { getRate, toDollar };
