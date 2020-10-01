import app from "../app";
import chai from "chai";
import chaiHttp from "chai-http";

import { expect } from "chai"
chai.use(chaiHttp);

describe("Phantom testing", () => {
  it("Phantom", done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        
          expect(res.body.message).to.equals('Welcome to our phantom beginning');
          done();
        });
    });
});