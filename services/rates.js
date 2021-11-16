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
const getRate = (currency) =>
  exchangeRates().filter((exRate) => exRate.currencyCode === currency);

/**
 * Returns the rate number
 * @params {*} currency1, currency2, action
 * @returns
 */
const operationsRate = (currency1, currency2, action) => {
    switch (action) {
      case "sub":
        totalInDollar = currency1 - currency2;
        break;
      case "multi":
        totalInDollar = currency1 * currency2;
        break;
      case "div":
        totalInDollar = currency1 / currency2;
        break;
      default:
        totalInDollar = currency1 + currency2;
    }
    return totalInDollar;
}

/**
 * returns number
 * @param {*} to 
 * @param {*} amount 
 * @param {*} rate 
 * @param {*} from 
 * @returns 
 */
let convertingRate = async(to, amount, rate, from) => {
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
    return returned;
}

module.exports = { getRate, toDollar, operationsRate, convertingRate };
