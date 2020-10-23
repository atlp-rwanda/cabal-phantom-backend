import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import app from "../app";
import registerMock from './mock/registerMocks'
import updateMock from '../test/mock/updateProfileMock'

chai.use(chaiHttp);

describe("Phantom API test update profile", () => {
  it("Should not update user if name is empty ", done=>{
    chai 
      .request(app)
      .patch(`/api/v1/auth//updateProfile`)
      .set("Authorization", "Bearer " + updateMock.token.oparator)
      .send(registerMock.nameIsEmpty)
      .end((err,res)=>{
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("Name must not be empty")
        done();
      })
  }); 
  it("Should not update user if name is shorter than 4 chars ", done=>{
    chai 
      .request(app)
      .patch("/api/v1/auth//updateProfile")
      .set("Authorization", "Bearer " + updateMock.token.oparator)
      .send(registerMock.isShort)
      .end((err,res)=>{
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("Name must be atleast four characters")
        done();
      })
  }); 

  it("Should not update if no valid email is provided", done=>{
    chai 
      .request(app)
      .patch("/api/v1/auth//updateProfile")
      .set("Authorization", "Bearer " + updateMock.token.oparator)
      .send(registerMock.isAnEmail)
      .end((err,res)=>{
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("provide valid email")
        done();
      })
  }); 

  it("Should not update user if name is empty string ", done=>{
    chai 
      .request(app)
      .patch("/api/v1/auth//updateProfile")
      .set("Authorization", "Bearer " + updateMock.token.oparator)
      .send(registerMock.nameIsEmpty)
      .end((err,res)=>{
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("Name must not be empty")
        done();
      })
  }); 

  it("Should not update user if email is empty string ", done=>{
    chai 
      .request(app)
      .patch("/api/v1/auth//updateProfile")
      .set("Authorization", "Bearer " + updateMock.token.oparator)
      .send(registerMock.emailEmpty)
      .end((err,res)=>{
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("Email must not be empty")
        done();
      })
  }); 

  it("Should not update user if gender is longer than eight chars ", done=>{
    chai 
      .request(app)
      .patch("/api/v1/auth//updateProfile")
      .set("Authorization", "Bearer " + updateMock.token.oparator)
      .send(registerMock.isBig)
      .end((err,res)=>{
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("gender should be not more 8 characters")
        done();
      })
  }); 

  it("Should not update user if gender empty string ", done=>{
    chai 
      .request(app)
      .patch("/api/v1/auth//updateProfile")
      .set("Authorization", "Bearer " + updateMock.token.oparator)
      .send(registerMock.genderEmpty)
      .end((err,res)=>{
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("gender must not be empty characters")
        done();
      })
  }); 

  it("Should not update user if no birthdate is invalid", done=>{
    chai 
      .request(app)
      .patch("/api/v1/auth//updateProfile")
      .set("Authorization", "Bearer " + updateMock.token.oparator)
      .send(registerMock.invalidDate)
      .end((err,res)=>{
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("date of birth should be in a format yyyy-mm-dd")
        done();
      })
  }); 
  it("Should not update user if birthdate is empty", done=>{
    chai 
      .request(app)
      .patch("/api/v1/auth//updateProfile")
      .set("Authorization", "Bearer " + updateMock.token.oparator)
      .send(registerMock.emptyDate)
      .end((err,res)=>{
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("date of birth should be in a format yyyy-mm-dd")
        done();
      })
  }); 



  });
