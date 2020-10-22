import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import { getMaxListeners } from 'superagent';
import busClassify from '../utils/generateDefaultRole'
import message from '../utils/messageMocks'

chai.use(chaiHttp);

describe('PHANTOM - TEST UTILS', () => {
    it('it should return bus category', () => {
        let smallVal = 20, mediumVal = 40, largeVal = 60
        expect(busClassify.classifyBus(smallVal)).to.be.a('string').eq('small')
        expect(busClassify.classifyBus(mediumVal)).to.be.a('string').eq('medium')
        expect(busClassify.classifyBus(largeVal)).to.be.a('string').eq('large')
    });

    it('it should return signup message', () => {
        let email='1',password='3'
        expect(message.signupEmail(email,password)).to.be.a('string')
    });
});
