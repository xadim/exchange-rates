/**
 * API Cake testing
 * @author Khadime Diakhate
 */
let should = require("should");
let chai = require("chai");
let expect = chai.expect;
const request = require("supertest");
const app = require("../server");

/**
 * Test for the rates endpoints
 */
describe("exchangerate API test", () => {
  /**
   * Returns all the rates
   */
  it("Get all Rates", (done) => {
    request(app)
      .get("/rates")
      .expect(200)
      .end((err, resp) => {
        let allrates = {};
        try {
          allrates = resp.body.data;
        } catch (e) {
          allrates = {};
        }

        expect(resp.statusCode).to.equal(200);
        if (allrates[0].should.have.property("exchangeRate")) {
          expect(allrates[0].currencyCode).to.be.a("string");
        }
        done();
      });
  });

  /**
   * Exchange rates done right
   */
  it("should respond with exchange rates", function (done) {
    request(app)
      .post("/rates")
      .send({
        from: "eur",
        amount: 13.12,
        to: "gbp",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .end((error, resp) => {
        chai;
        expect(JSON.parse(resp.text).data.amount).to.be.equal(11.74);
      });
    done();
  });

  /**
   * Exchange rates with calculation
   */
  it("should respond with exchange rates and calculating the end result", function (done) {
    request(app)
      .post("/rates")
      .send({
        from: "eur",
        amount: 13.12,
        to: "gbp",
        amount2: 99,
        action: "add",
        currency: "cad",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .end((error, resp) => {
        chai;
        expect(JSON.parse(resp.text).data.amount).to.be.equal(185.64);
      });
    done();
  });
});
