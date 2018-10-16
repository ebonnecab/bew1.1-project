const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const Quote = require('../models/quote');
const sampleQuote= {
    "title": "Pickle Rick is great",
    "quote": "I'm scared Rick",
}

// TEST CREATE
it('should create a SINGLE quote on /character/quote POST', (done) => {
    chai.request(app)
        .post('/character/quote')
        .send(sampleQuote)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html
            done();
        });
});