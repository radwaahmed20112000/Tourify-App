const { post } = require('superagent');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
chai.use(chaiHttp);
const Post = require('../../Models/Post');
const jwt = require("jsonwebtoken");

describe('Posts Model', function () {
    describe('find all ', function () {
        const tests = [
            { limit: 10, offset: 0 },
            { limit: 10, offset: 70 },
            { limit: 30, offset: 20 },
            { limit: 50, offset: 0 },
            { limit: 100, offset: 70 },

        ];
        tests.forEach(t => {
            it('it should retrun an array of the at most the specified size', (done) => {
           //   post.postId , user.userId, title, body,rating ,name as userName ,photo as userPhoto , photos
                Post.findAll(null , t.limit , t.offset, (err , posts)=>{
                    
                    should.equal(err, null);
                   
                    posts.forEach(p => {
                        p.should.have.property('userName');
                        p.should.have.property('body');
                        p.should.have.property('photos');
                        p.should.have.property('post_id');               
                        p.should.have.property('userPhoto');
                    })

                    done();
                
                });
        
            });

        })

        tests.forEach(t => {
            it('it should retrun an array of the at most the specified size', (done) => {
                //   post.postId , user.userId, title, body,rating ,name as userName ,photo as userPhoto , photos
                let query = 'Post.post_id  != 4';
                Post.findAll(query, t.limit, t.offset, (err, posts) => {

                    should.equal(err, null);

                    posts.forEach(p => {
                        p.should.have.property('userName');
                        p.should.have.property('body');
                        p.should.have.property('photos');
                        p.should.have.property('post_id');
                        p.should.have.property('userPhoto');
                    })

                    done();

                });

            });

        })

        describe('count', function () {
            it('it should retrun an array of the specified size', (done) => {
                   Post.count(null,(err , obj)=>{
                       should.equal(err, null);
                       obj.count.should.be.a('number');
                       done();

                   })
            });

            it('it should retrun an array of the specified size', (done) => {
                let query = 'Post.post_id  != 4';
                Post.count(query, (err, obj) => {
                    should.equal(err, null);
                    obj.count.should.be.a('number');
                    done();

                })
            });



        });






    });


    describe('find one ', function () {
        let test = {
            id: 2,
            email: process.env.TEST_EMAIL,
        }
        it('it should retrun object contains specific post', (done) => {
            Post.findOne(2 , test.email, (err , post) => {

                should.equal(null, post);

                post.should.have.property('body');
                post.should.have.property('duration');
                post.should.have.property('organisation');
                post.should.have.property('rate');
                post.should.have.property('budget');
                post.should.have.property('currency');
                post.should.have.property('latitude');
                post.should.have.property('longitude');
                post.should.have.property('photos');
                post.should.have.property('tags');

            done();

            });

        });
        


        it('it should retrun object contains specific post', (done) => {
            Post.findOne(5 , test.email, (err , post) => {

                should.equal(err, null);

                post.should.have.property('body');
                post.should.have.property('duration');
                post.should.have.property('organisation');
                post.should.have.property('rate');
                post.should.have.property('budget');
                post.should.have.property('currency');
                post.should.have.property('latitude');
                post.should.have.property('longitude');
                post.should.have.property('photos');
                post.should.have.property('tags');

            done();

            });

        });

    });

});
