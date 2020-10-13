import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import app from "../app";
import userMock from './mock/userMocks'

chai.use(chaiHttp);

describe("Phantom API - Auth", () => {
    it('it should Not GET All Users without token', (done) => {
        chai.request(app)
            .get('/api/v1/auth')
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                done();
            });
    });

    it('it should Not GET All Users without permission', (done) => {
        chai.request(app)
            .get('/api/v1/auth')
            .set("Authorization", "Bearer " + userMock.token.operator)
            .end((err, res) => {
                expect(res.statusCode).to.equal(403);
                done();
            });
    });

    it('it should Not GET All Users without correct token', (done) => {
        //change rw to lw
        chai.request(app)
            .get('/api/v1/auth')
            .set("Authorization", "Bearer " + userMock.token.NotCorrect)
            .end((err, res) => {
                expect(res.statusCode).to.equal(403);
                done();
            });
    });

    it('it should GET All Users', (done) => {
        chai.request(app)
            .get('/api/v1/auth')
            .set("Authorization", "Bearer " + userMock.token.admin)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                done();
            });
    });
})