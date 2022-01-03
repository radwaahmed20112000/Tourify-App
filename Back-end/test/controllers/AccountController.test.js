
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
chai.use(chaiHttp);

describe('Account controller', function () {

    describe('Post /account/signup', function () {
        console.log("helloo");
           let newUser ={
               email: 'testgmail.com',
               name: 'test@g',
               password: "333",
               photo: "ddd",
               google: false,
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




    describe('Post /account/signup', function () {
        console.log("helloo");
           let newUser ={
               email: 'testgmail.com',
               name: 'test@g',
               password: "333",
               photo: "ddd",
               google: false,
               country: 'dddd',
           }
           it('it should retrun 200 ok', (done) => {
                chai.request(server)
                    .post(`/account/signup`)
                    .send(newUser)
                    .end((err, res) => {
                        res.should.have.status(409);
                        done();
                    });
            });
    });




    describe('Post /account/signup', function () {
        console.log("helloo");
           let newUser ={
               email: 'test2gmail.com',
               name: 'test@g',
               password: "",
               photo: "ddd",
               google: false,
               country: 'dddd',
           }
           it('it should retrun 200 ok', (done) => {
                chai.request(server)
                    .post(`/account/signup`)
                    .send(newUser)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            });
    });




    //sign up for google 
    describe('Post /account/signup', function () {
        console.log("helloo");
           let newUser ={
               email: 'testinggmail.com',
               name: 'test@g',
               password: null,
               photo: "ddd",
               google: true,
               country: null,
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




    // login for google
    describe('Post /account/login', function () {
        let newUser = {
            email: 'testgmail.com',
            password: null,
            google:true
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

   
   

    describe('Post /account/login', function () {
        let newUser = {
            email: 'testgmail.com',
            password: "333",
            google:false
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


    describe('Post /account/login', function () {
        let newUser = {
            email: 'testgmail.com',
            password: "3333",
            google:false
        }
        it('it should retrun 200 ok', (done) => {
            chai.request(server)
                .post(`/account/login`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

    describe('Post /account/login', function () {
        let newUser = {
            email: 'test@gmail.com',
            password: "333",
            google:false
        }
        it('it should retrun 200 ok', (done) => {
            chai.request(server)
                .post(`/account/login`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });






});

