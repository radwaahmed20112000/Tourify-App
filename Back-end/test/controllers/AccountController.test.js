/*
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
chai.use(chaiHttp);

describe('Account controller', function () {

    describe('Post /account/signup', function () {
           let newUser ={
               email: 'testgmail.com',
               name: 'test@g',
               password: "333",
               photo: "ddd",
               bool: false,
               country: 'dddd',
           }
           it('it should retrun 200 ok', (done) => {
                chai.request(server)
                    .post(`/account/signup`)
                    .send(newUser)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
    });



    describe('Post /account/login', function () {
        let newUser = {
            email: 'testgmail.com',
            password: "333",
            bool:false
        }
        it('it should retrun 200 ok', (done) => {
            chai.request(server)
                .post(`/account/login`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});
*/
