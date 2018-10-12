const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const Character = require('../models/character');
const sampleCharacter= {
    "name": "Pickle Rick",
    "episode": "Episode 12",
    "origin": "The garage"
}

chai.use(chaiHttp);

describe('Characters', () => {

    // TEST INDEX
    it('should index ALL characters on / GET', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });

    // TEST NEW

    it('should display a NEW form on /character/new GET', (done) => {
        chai.request(app)
            .get('/character/new')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });

    // TEST CREATE
    it('should create a SINGLE character on /character POST', (done) => {
        chai.request(app)
            .post('/character')
            .send(sampleCharacter)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
    });
    // TEST SHOW
    it('should SHOW a single character on /character/<id> GET', (done) => {
        var character = new Character(sampleCharacter);
        character.save((err, data) => {
            chai.request(app)
                .get(`/character/${data._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });

        describe('Character', () => {

            after(() => {
                Character.deleteMany({
                    character: 'Pickle Rick'
                }).exec((err, character) => {
                    console.log(character)
                    character.remove();
                })
            });


        });

    });
    // TEST EDIT
    it('should edit a SINGLE character on /character/<id>/edit GET', (done) => {
        var character = new Character(sampleCharacter);
        character.save((err, data) => {
            chai.request(app)
                .get(`/character/${data._id}/edit`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });
    // TEST UPDATE
    it('should update a SINGLE character on /character/<id> PUT', (done) => {
        var character = new Character(sampleCharacter);
        character.save((err, data) => {
            chai.request(app)
                .put(`/character/${data._id}?_method=PUT`)
                .send({
                    'name': 'Officer Rick'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });
    // TEST DELETE
    it('should delete a SINGLE character on /character/<id> DELETE', (done) => {
        var character = new Character(sampleCharacter);
        character.save((err, data) => {
            chai.request(app)
                .delete(`/character/${data._id}?_method=DELETE`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });
});
