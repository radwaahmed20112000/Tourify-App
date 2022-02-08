let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
chai.use(chaiHttp);
const jwt = require("jsonwebtoken");
const DB = require("../../DB/pool");

describe('Notification controller', function () {
    describe('GET /notifications/', function () {

        it('it should retrun an array of notifications', (done) => {
            chai.request(server)
                .get(`/notifications/`)
                .set('authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');

                    let notifications = res.body ; 
                    notifications.forEach (n => {
                        n.should.have.property('id');
                        n.should.have.property('photo');
                        n.should.have.property('name');
                        n.should.have.property('post_id');
                        n.should.have.property('comment_id');
                        n.should.have.property('sender_id');
                        n.should.have.property('created_at');
                        n.should.have.property('viewed');
                    })
                    done();
                });
        });

    });        
});   
