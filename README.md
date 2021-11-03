# exchange-rates

===================

Exchange Rates Api is a powered by Node.js software that is RESTful api
application.

Currency code | Exchange rate
------------ | -------------
EUR | 0.87815
GBP | 0.78569
CAD | 1.31715
INR | 69.3492
MXN | 19.2316
AUD | 1.43534
CNY | 6.88191
MYR | 4.13785
COP | 3203.18

- Implement an End Point which can return the exchange rate from Euro to Dollars
- Extend your solution to convert US dollars to British Pounds
- Extend your solution to convert Euro to British Pounds
- Extend your solution to add 13.12 Euro to 99 British Pounds and return 185.64 CAD
## Dependencies Installation

`npm install`

## Packages installed:

**Express**: A lightweight Node.js web framework for spinning up RESTful APIs.
We will use this to handle routing in our backend API<br/> **body-parser**: A
middleware to parse incoming request inputs into our req.body object<br/>
**nodemon**: is a tool that helps develop node.js based applications by
automatically restarting the node application when file changes in the directory
are detected, <br/>**Mocha**: is a feature-rich JavaScript
test framework running on Node.js and in the browser, making asynchronous
testing simple and fun <br/> **Chai**: Chai is a BDD / TDD assertion library for
node and the browser that can be delightfully paired with any javascript testing
framework.<br/>**SuperTest**: HTTP assertions made easy.

## Insfrastructure Requirements
1. Node >=14.16.1

## Development server

Run `nodemon server.js --inspect` for a dev server. Navigate to
`http://localhost:4444/`. The app will automatically reload if you change any of
the source files.

## Automated API test

An Automatic REST JSON API Testing system has been implemented using Mocha &
Chai. By simply running `mocha` should test the api endpoints.

## Manually Testing the Endpoints
To test the Api, please use Postman (`https://www.postman.com/`) to make a call to the api `POST https://exc-rates.herokuapp.com/rates` passing these as the payload;
```
formData: {
    'from': 'eur',
    'amount': ' 13.12',
    'to': 'gbp',
    'amount2': '99',
    'action': 'add',
    'currency': 'cad'
}
```

The Api Endpoint `GET https://exc-rates.herokuapp.com/rates` returns all the Exchange rates from USD
## Demo Project

The project has been deployed on firebase and a demo can be seen here
https://exc-rates.herokuapp.com/rates

## App Version Number 
**5b8d0fd276b6d288905ed2f63a934e057e8feca2**
## TODO / Features

1. Add rates to MongoDB
2. Make calss to the database to fetch/Add/Update/Delete rates
3. Auth
4. ...
