import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import app from "../app";
import userMock from './mock/userMocks'
import registerMock from './mock/registerMocks'

chai.use(chaiHttp);

describe("Phantom API test register", () => {
      it("Should not create new user if email aready exists", done=>{
        chai 
          .request(app)
          .post("/api/v1/auth/register")
          .set("Authorization", "Bearer " + userMock.token.admin)
          .send(registerMock.existingUser)
          .end((err,res)=>{
            expect(res.body).to.be.a("object");
            expect(res).to.have.status(409);
            done();
          })
      });   
      
      it("Should not create new user if no name is provided ", done=>{
        chai 
          .request(app)
          .post("/api/v1/auth/register")
          .set("Authorization", "Bearer " + userMock.token.admin)
          .send(registerMock.nameNotFound)
          .end((err,res)=>{
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("name is required")
            done();
          })
      }); 

      it("Should not create new user if no valid email is provided", done=>{
        chai 
          .request(app)
          .post("/api/v1/auth/register")
          .set("Authorization", "Bearer " + userMock.token.admin)
          .send(registerMock.isAnEmail)
          .end((err,res)=>{
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("provide valid email")
            done();
          })
      }); 

      it("Should not create new user if name is empty string ", done=>{
        chai 
          .request(app)
          .post("/api/v1/auth/register")
          .set("Authorization", "Bearer " + userMock.token.admin)
          .send(registerMock.nameIsEmpty)
          .end((err,res)=>{
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("Name must not be empty")
            done();
          })
      }); 

      it("Should not create new user if name is shorter than 4 chars ", done=>{
        chai 
          .request(app)
          .post("/api/v1/auth/register")
          .set("Authorization", "Bearer " + userMock.token.admin)
          .send(registerMock.isShort)
          .end((err,res)=>{
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("Name must be atleast four characters")
            done();
          })
      }); 

      it("Should not create new user if no email is provided ", done=>{
        chai 
          .request(app)
          .post("/api/v1/auth/register")
          .set("Authorization", "Bearer " + userMock.token.admin)
          .send(registerMock.emailNotGiven)
          .end((err,res)=>{
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("email is required")
            done();
          })
      }); 

      it("Should not create new user if email is empty string ", done=>{
        chai 
          .request(app)
          .post("/api/v1/auth/register")
          .set("Authorization", "Bearer " + userMock.token.admin)
          .send(registerMock.emailEmpty)
          .end((err,res)=>{
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("Email must not be empty")
            done();
          })
      }); 

      it("Should not create new user if gender is longer than eight chars ", done=>{
        chai 
          .request(app)
          .post("/api/v1/auth/register")
          .set("Authorization", "Bearer " + userMock.token.admin)
          .send(registerMock.isBig)
          .end((err,res)=>{
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("gender should be not more 8 characters")
            done();
          })
      }); 

      it("Should not create new user if gender is not given ", done=>{
        chai 
          .request(app)
          .post("/api/v1/auth/register")
          .set("Authorization", "Bearer " + userMock.token.admin)
          .send(registerMock.genderNotGiven)
          .end((err,res)=>{
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("gender is required")
            done();
          })
      }); 

      it("Should not create new user if gender empty string ", done=>{
        chai 
          .request(app)
          .post("/api/v1/auth/register")
          .set("Authorization", "Bearer " + userMock.token.admin)
          .send(registerMock.genderEmpty)
          .end((err,res)=>{
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("gender must not be empty characters")
            done();
          })
      }); 

      it("Should not create new user if no birth date given ", done=>{
        chai 
          .request(app)
          .post("/api/v1/auth/register")
          .set("Authorization", "Bearer " + userMock.token.admin)
          .send(registerMock.birthDateNotGiven)
          .end((err,res)=>{
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("birthdate is required")
            done();
          })
      }); 

      it("Should not create new user if no birthdate is invalid", done=>{
        chai 
          .request(app)
          .post("/api/v1/auth/register")
          .set("Authorization", "Bearer " + userMock.token.admin)
          .send(registerMock.invalidDate)
          .end((err,res)=>{
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("date of birth should be in a format yyyy-mm-dd")
            done();
          })
      }); 
      it("Should not create new user if birthdate is empty", done=>{
        chai 
          .request(app)
          .post("/api/v1/auth/register")
          .set("Authorization", "Bearer " + userMock.token.admin)
          .send(registerMock.emptyDate)
          .end((err,res)=>{
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("date of birth should be in a format yyyy-mm-dd")
            done();
          })
      }); 

  });
