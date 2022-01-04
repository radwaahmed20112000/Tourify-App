let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
chai.use(chaiHttp);
const jwt = require("jsonwebtoken");
const DB = require('../../DB/pool')

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
                        .set('authorization', process.env.TEST_TOKEN)
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
                        .set('authorization', process.env.TEST_TOKEN)
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

        describe('Delete /posts/delete', function () {
            this.timeout(20000);
            let testPost ={
                post_id:999999999,
                email: process.env.TEST_TOKEN ,
                body : "test t t t t t t t"
            } 
            console.log(process.env.TEST_TOKEN )

            it('it should delete post with its componennts', (done) => {

                let query = `insert  ignore into  POST(post_id,email, body) values(${testPost.post_id},'${process.env.TEST_TOKEN }','${testPost.body}');`
                DB(query).then(() => {
                    let testPhoto = {
                        photo: "htttp://test.com"
                    } 
                    console.log("inside  t")
                    let query2 = `insert  ignore into  postphoto(post_id ,photo) values('${999999999}','${testPhoto.photo}');`
                    DB(query2).then(()=>{

                            chai.request(server)
                                .delete(`/posts/delete?id=${999999999}`)
                                .set('authorization', process.env.TEST_TOKEN)
                                .send({ email: process.env.TEST_TOKEN })
                                .end((err, res) => {
                                    console.log(err)
                                    res.should.have.status(200);
                                    let query3 = `SELECT * FROM tourify.postphoto where post_id=${999999999};`
                            

                                    DB(query3).then((photos)=>{
                                        photos.length.should.be.equal(0)
                                        let query4 = `SELECT * FROM tourify.post where post_id=${999999999};`
                                        DB(query4).then((posts) => {
                                            posts.length.should.be.equal(0)
                                            done();
                                        })
                                   
                                    })
                                });
                        });
                        
                }).catch(e=>{
                    console.log(e)
                })

            
            })
            console.log("ddd")


        });

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

        describe('POST /posts/TripCreation', function () {
          //const token = jwt.sign({ email: "test@gmail.com" }, 'secret', {});
            const body = {
              user: "token",
              body: "Hello",
                tags: ["hicking"],
                photos: ["photo1", "photo2"],
                organisation: "Faculty of Engineering",
                rate: 5,
                budget: "2000$",
                latitude: "Alex",
                longitude: "Egypt"
            };
            it('it should retrun no error', () => {
                chai.request(server)
                    .post(`/posts/TripCreation`)
                    .send(body)
                    .end((err, res) => {
                        res.should.have.status(200);
                        console.log(res);
                    });
            });

        });   


});
            

   
   





