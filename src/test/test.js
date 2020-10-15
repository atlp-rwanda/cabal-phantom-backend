
import app from "../app";
import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';

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

describe('/POST Login user', () => {
  it('should check if Data provided ', (done) => {
    chai.request(app)
        .post('/api/v1/users/login')
        .send({
          email:"nkubito@gmail.com",
          password:""
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equals("Fill required fields");
          done();
        });
  });

  const user = {
       email:"nkubito@phantom.com",
       password:"admin"
     }
  it('it should check if  user exist', (done) => {
    chai.request(app)
        .post('/api/v1/users/login')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equals("success");
          expect(res.body.message).to.equals("Login successful");
          done();
        });
  });
  it('should check if provided info is incorrect', (done) => {
    chai.request(app)
        .post('/api/v1/users/login')
        .send({
          email:"nkubito@phantom.com",
          password:"adminus"
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equals("Invalid Username or passoword");
          done();
        });
  });
});

describe("Phantom testing", () => {
  it("Should return a welcome message", done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        
          expect(res.body.message).to.equals('Welcome to our phantom beginning');
          done();
        });
    });

    it("Should get all users", done=>{
      chai
        .request(app)
        .get("/api/v1/users")
        .end((err,res)=>{
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("array");
          done();
        })
    });

    it('get a single user by id', async () => {
      const id = 1 
      expect(id).to.be.not.null;
      chai
        .request(app)
        .get(`/api/v1/users/${id}`)
        .end((err,res)=>{
          expect(res.status).eq(200);
          const m = res.body;
          expect(m).to.be.not.null;
          expect(res.body).to.be.a("array");
        });
    });


});


