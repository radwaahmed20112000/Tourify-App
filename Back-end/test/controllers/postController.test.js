let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

describe('Posts controller', function () {
  
    describe('GET /posts/feed', function () {
        
        it('it should retrun an array of the specified size', (done) => {
            let limit =20;
            chai.request(server)
                .get(`/posts/feed?limit=${limit}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(limit);
                    res.body[0].should.have.property('userName');
                    res.body[0].should.have.property('body');
                    done();
                });
        });
   
   
    });





});