import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import app from "../app";
import userMock from './mock/userMocks'
import busMock from './mock/busMocks'

chai.use(chaiHttp);

describe('PHANTOM API - TEST BUS VALIDATION', () => {

    it('it should not add new bus when status is not valid', (done) => {
        chai.request(app)
            .post('/api/v1/buses')
            .set("Authorization", userMock.token.operator)
            .send(busMock.statusNotValid)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
    });

    it('it should add new bus', (done) => {
        chai.request(app)
            .post('/api/v1/buses')
            .set("Authorization", userMock.token.operator)
            .send(busMock.NewBus)
            .end((err, res) => {
                expect(res.statusCode).to.equal(201);
                done();
            });
    });
});

describe('PHANTOM API - TEST BUS MIDDLEWARE', () => {
    it('it should retrieve bus when id is not found', (done) => {
        let id = 44
        chai.request(app)
            .get('/api/v1/buses/' + id)
            .set("Authorization", userMock.token.operator)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                done();
            });
    });

    it('it should retrieve bus when id is not valid', (done) => {
        let id = '1fuftr'
        chai.request(app)
            .get('/api/v1/buses/' + id)
            .set("Authorization", userMock.token.operator)
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                done();
            });
    });

    it('it should not add new bus when plate is already exist', (done) => {
        chai.request(app)
            .post('/api/v1/buses')
            .set("Authorization", userMock.token.operator)
            .send(busMock.plateExist)
            .end((err, res) => {
                expect(res.statusCode).to.equal(409);
                done();
            });
    });
});

describe('PHANTOM API - TEST BUS CTRL', () => {
    it('it should retrieve all buses', (done) => {
        chai.request(app)
            .get('/api/v1/buses')
            .set("Authorization", userMock.token.operator)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('it should not retrieve buses when page not found', (done) => {
        chai.request(app)
            .get('/api/v1/buses?page=2&limit=10')
            .set("Authorization", userMock.token.operator)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                done();
            });
    });

    it('it should not retrieve when limit is undefined', (done) => {
        chai.request(app)
            .get('/api/v1/buses?page=1&limit=undefined')
            .set("Authorization", userMock.token.operator)
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                done();
            });
    });

    it('it should update a bus', (done) => {
        let id = 1
        chai.request(app)
            .patch('/api/v1/buses/' + id)
            .set("Authorization", userMock.token.operator)
            .send(busMock.updatedBus)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('it should not update a bus due to validation', (done) => {
        let id = 1
        chai.request(app)
            .patch('/api/v1/buses/' + id)
            .set("Authorization", userMock.token.operator)
            .send(busMock.NotUpdatedBus)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
    });

    it('it should delete a bus', (done) => {
        let id = 1
        chai.request(app)
            .delete('/api/v1/buses/' + id)
            .set("Authorization", userMock.token.operator)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
});
