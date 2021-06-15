var request = require('supertest')
const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
var should = chai.should()
chai.use(chaiHttp)

describe('vérification du chargement des pages', function(){
    var app;
    beforeEach(function (){
        app = require('./app');
    });
    afterEach(function(){
        }
    );
    it('reponse /', function testSlash(done){
        request(app)
            .get('/')
            .expect(200, done);
    });
    it('404 erreur', function testPath(done){
        request(app)
            .get('/foo/bar')
            .expect(404, done);
    });
});


describe ('test de l\'api', function testApi(done){
    var app;
    beforeEach(function (){
        app = require('./app');
    }
    );
    it('abonnes ', function (done) {
        request(app).get("/abonnes").end((err,response) => {
            response.should.have.status(200);
            response.should.be.a('Object');
            response.body.length.should.not.be.eq(0);
            done();
        });

    });
    it('interventions ', function (done) {
        request(app).get("/interventions").end((err,response) => {
            response.should.have.status(200);
            response.should.be.a('Object');
            response.body.length.should.not.be.eq(0);
            done();
        });

    });
    it('etats ', function (done) {
        request(app).get("/etats").end((err,response) => {
            response.should.have.status(200);
            response.should.be.a('Object');
            response.body.length.should.not.be.eq(0);
            done();
        });

    });
    it('motifs ', function (done) {
        request(app).get("/motifs").end((err,response) => {
            response.should.have.status(200);
            response.should.be.a('Object');
            response.body.length.should.not.be.eq(0);
            done();
        });

    });
    it('types ', function (done) {
        request(app).get("/types").end((err,response) => {
            response.should.have.status(200);
            response.should.be.a('Object');
            response.body.length.should.not.be.eq(0);
            done();
        });

    });
    it('personnes ', function (done) {
        request(app).get("/personnes").end((err,response) => {
            response.should.have.status(200);
            response.should.be.a('Object');
            response.body.length.should.not.be.eq(0);
            done();
        });

    });

});

