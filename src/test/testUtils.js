import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import busClassify from '../utils/generateDefaultRole'

chai.use(chaiHttp);

describe('PHANTOM - TEST UTILS', () => {
    it('it should return bus category', () => {
        let smallVal = 20, mediumVal = 40, largeVal = 60
        expect(busClassify.classifyBus(smallVal)).to.be.a('string').eq('small')
        expect(busClassify.classifyBus(mediumVal)).to.be.a('string').eq('medium')
        expect(busClassify.classifyBus(largeVal)).to.be.a('string').eq('large')
    });
});
