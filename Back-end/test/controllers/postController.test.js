let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
chai.use(chaiHttp);
const jwt = require("jsonwebtoken");
const DB = require("../../DB/pool");

describe('Posts controller', function () {

        describe('GET /posts/feed', function () {
            const tests = [
                {limit:10 , offset :0 },
                { limit: 10, offset :70 },
                { limit: 30, offset :20 },
                { limit: 50, offset :0 },
                { limit: 100, offset :70 },

            ];

            tests.forEach(t=>{
                it('it should retrun an array of the at most the specified size', (done) => {
                    chai.request(server)
                        .get(`/posts/feed?limit=${t.limit}&offset=${t.offset}`)
                        .send({ email: process.env.TEST_TOKEN })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.at.most(t.limit);

                            let posts = res.body ; 
                            posts.forEach (p=>{
                                p.should.have.property('userName');
                                p.should.have.property('body');
                                p.should.have.property('userPhoto');
                                p.should.have.property('photos');
                                p.should.have.property('email');

                            })

                            done();
                        });
                });

            })
        })
        describe('GET /posts/profilePosts', function () {
            const tests = [
                { limit: 10, offset: 0 },
                { limit: 10, offset: 70 },
                { limit: 30, offset: 20 },
                { limit: 50, offset: 0 },
                { limit: 100, offset: 70 },

            ];

            tests.forEach(t => {
                it('it should retrun an array of the at most the specified size with the test user email', (done) => {
                    chai.request(server)
                        .get(`/posts/profilePosts?limit=${t.limit}&offset=${t.offset}`)
                        .send({ email: process.env.TEST_TOKEN })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.at.most(t.limit);

                            let posts = res.body;
                            posts.forEach(p => {
                                p.should.have.property('userName');
                                p.should.have.property('body');
                                p.should.have.property('userPhoto');
                                p.should.have.property('photos');
                                p.should.have.property('email');
                                p.email.should.be.equal(process.env.TEST_EMAIL)

                            })

                            done();
                        });
                });

            })
        })

        describe('GET /posts/feedCount', function () {
   
            it('it should retrun an array of the specified size', (done) => {
                chai.request(server)
                    .get(`/posts/feedCount`)
                    .send({ email: process.env.TEST_TOKEN})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.count.should.be.a('number');
                        done();
                    });
            });

        });

        describe('POST/posts/TripCreation', function () {
            const body = {
                email: process.env.TEST_TOKEN,
                body: "Hello",
                tags: ["hicking"],
                photos: ["photo1", "photo2"],
                organisation: "Trip Travel",
                rate: 5,
                budget: 2000,
                currency: "$",
                duration: 5,
                latitude: 32.5,
                longitude: 51
            };
            it('it should retrun Ok response', () => {
                chai.request(server)
                    .post(`/posts/TripCreation`)
                    .send(body)
                    .end((err, res) => {
                        res.should.have.status(200);
                        console.log(res);
                    });
            });

        });   

        describe('GET/posts/:id/:token', function () {
            beforeAll((done) => {
                let insertQuery1 = `INSERT INTO ${tableName} 
                (post_id,email, body, duration, organisation, rate, budget, currency, number_of_comments, number_of_likes)  VALUES
                (2,"${process.env.TEST_EMAIL}","postDescriotion",7,"Travel institution",3, 2000,"$", 0, 0 ) ;`;
                let insertQuery2 = `INSERT INTO ${tableName} 
                (post_id,email, body, duration, organisation, rate, budget, currency, number_of_comments, number_of_likes)  VALUES
                (3,"${process.env.TEST_EMAIL}","postDescriotion",7,"Travel institution",3, 2000,"$", 0, 0 ) ;`;
                
                DB(insertQuery1)
                DB(insertQuery2)            
            });
          
            const tests = [
                { id: 2, token: process.env.TEST_TOKEN },
                { id: 3, token: process.env.TEST_TOKEN },
            ];

            tests.forEach(t => {
                it('it should retrun a specific post its id and user token are passed through parameters', (done) => {
                    chai.request(server)
                        .get(`/posts/${id}/${token}`)
                        .send({ email: process.env.TEST_TOKEN })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            let post = res.body;
                                post.should.have.property('body');
                                post.should.have.property('duration');
                                post.should.have.property('organisation');
                                post.should.have.property('rate');
                                post.should.have.property('budget');
                                post.should.have.property('currency');
                                post.should.have.property('latitude');
                                post.should.have.property('longititude');
                                post.should.have.property('photos');
                                post.should.have.property('tags');
                                post.email.should.be.equal(process.env.TEST_EMAIL)
                                post.email.should.be.equal(id)
                            done();
                        });
                });

            })
        })

});
            

   
   





