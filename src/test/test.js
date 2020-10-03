import app from "../app";
import chai from "chai";
import chaiHttp from "chai-http";

import { expect } from "chai"
chai.use(chaiHttp);

describe("Phantom API test", () => {
  describe('/GET Welcome', () => {
    it('it should GET welcome', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe('/all unspecified routes', () => {
    it('it should handle all unspecified routes', (done) => {
      chai.request(app)
        .get('/ghyy')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
  });
});
