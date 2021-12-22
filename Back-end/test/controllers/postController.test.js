let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

describe('Posts controller', function () {
  
    describe('GET /posts/feed', function () {
        const tests = [
            {limit:10 , offset =10 },
            { limit: 10, offset =70 },
            { limit: 30, offset =20 },
            { limit: 50, offset =40 },
            { limit: 100, offset =70 },

        ];
        tests.forEach(t=>{
            it('it should retrun an array of the specified size', (done) => {
                chai.request(server)
                    .get(`/posts/feed?limit=${t.limit}&offset=${t.offset}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(t.limit);
                        res.body[0].should.have.property('userName');
                        res.body[0].should.have.property('body');
                        res.body[0].should.have.property('title');

                        done();
                    });
            });

        })

   
   
    });





});