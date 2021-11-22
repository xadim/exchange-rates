const exchangeRates = require("../models/rates");

/**
 * Converts currency to Dollar
 * @param {*} amount
 * @param {*} currency
 * @returns
 */
const toDollar = (amount, currency) => {
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
const convertingRate = (to, amount, rate, from) => {
    switch (to) {
      case "usd":
        returned = amount / rate[0].exchangeRate;
        break;
      default:
        returned = amount * rate[0].exchangeRate;
        if (from !== "usd") {
          const dollar = toDollar(amount, from);
          returned = dollar * rate[0].exchangeRate;
        }
    }
    return returned;
}

/**
 * 
 * @param {*} data 
 * @param {*} totalInDollar 
 * @param {*} rateCurrency 
 * @param {*} requestedService 
 * @param {*} op 
 * @returns array object
 */
const returnBuilder = (
  data,
  total,
  exchangeRateTo,
  exchangeRateFrom, 
  requestedService,
  op
) => {
  console.log(data);
  const { from, amount, to, amount2, currency } = data;
  let message = `Exchange Rate: ${amount} ${from.toUpperCase()} is ${total.toFixed(
    2
  )} ${to.toUpperCase()}`;

  if (requestedService === "calculate") {
    message = `Exchange Rate: ${op.toUpperCase()} ${amount} ${from.toUpperCase()} to ${amount2} ${to.toUpperCase()} is ${total.toFixed(
      2
    )} ${currency.toUpperCase()}`;
  }
  return {
    amountSend: amount2,
    amount: parseFloat(total.toFixed(2)),
    exchangeRateFrom: exchangeRateFrom,
    exchangeRateTo: exchangeRateTo,
    message: message,
  };
};

module.exports = {
  getRate,
  toDollar,
  operationsRate,
  convertingRate,
  returnBuilder,
};
