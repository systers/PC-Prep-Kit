const supertest = require('supertest');
const should = require('should');
const models = require('../database/models');
// let expect = chai.expect;
const localUser = models.user_account;
const server = supertest.agent('http://localhost:3000');
const testCred = {fname: 'testfirstname', lname: 'testlastname', email: 'test34374@gmail.com', password: 'Testing-1', confirmpassword: 'Testing-1'};

// const sinon = require('sinon');
let user;
let token;
// const Verifier = require('email-verify');
describe('Testing APIs', function() {

    it('login without registration', function(done) {
        server
            .post('/auth/login')
            .send(testCred)
            .expect(200)
            .end(function(err, res) {
                res.body.error.should.equal('PCE008 : Invalid email or password');
                done();
            });
    });
    // res.json().info.should.equal('PCE008 : Invalid email or password');
    it('Forgot password without registration', function(done) {
        server
            .post('/auth/forgot')
            .send(testCred)
            .expect(200)
            .end(function(err, res) {
                res.body.info.should.equal('PCE011 : This account does not exist or you cannot change the password for this account');
                done();
            });
    });

    describe('Creating User', function() {

        // before(function(done){
        //     this.verify = sinon.stub(verifier, 'verify').returns(true);
        //     done();
        // }); Not working
        before('Register User', function(done) {
            this.enableTimeouts(false);

            server
                .post('/registration')
                .send(testCred)
                .expect(200)
                .end(function(err, res) {
                    res.body.should.be.okay;

                    // Email API not working
                    // res.body.should.equal('PCS005 : Verification mail sent, please check your mail.');
                    done();
                });
        });

        after('Delete User', function(done) {
            localUser.destroy({
                where: {
                    email: testCred.email
                }
            }).then(data => {
                done();
            });
        });
        /* Email API not working
        it('Forgot password after registration', function(done) {
            server
            .post('/auth/forgot')
            .send(testCred)
            .expect(200)
            .end(function(err, res) {
                res.body.success.should.equal(`PCS002 : An e-mail has been sent to ${testCred.email} with further instructions`);
                done();
            });
        });
*/


        it('Authentication Fail without login', function(done) {
            server
                .get('/auth/authenticated')
                .expect(200)
                .end(function(err, res) {
                    res.body.authenticated.should.equal(false);
                    done();
                });
        });

        describe('Authentication', function() {
            before('Login', function(done) {
                server
                    .post('/auth/login')
                    .send(testCred)
                    .expect(200)
                    .end(function(err, res) {
                        user = res.body.user;
                        token = res.body.token;
                        res.body.user.email.should.equal(testCred.email);
                        res.body.token.should.be.ok;

                        done();
                    });
            });

            it('Authentication Success', function(done) {
                server
                    .get('/auth/authenticated')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('x-access-token', `'${token}'`)
                    .expect(200)
                    .end(function(err, res) {
                        res.body.authenticated.should.equal(true);
                        done();
                    });
            });

            it('Get User Info', function(done) {
                server
                    .get('/api/getUserInfo')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('x-access-token', `'${token}'`)
                    .expect(200)
                    .end(function(err, res) {
                        res.body.user.email.should.equal(testCred.email);
                        done();
                    });
            });

            it('Get username', function(done) {
                server
                    .get('/api/username')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('x-access-token', `'${token}'`)
                    .expect(200)
                    .end(function(err, res) {
                        res.body.username.should.equal(`${testCred.fname} ${testCred.lname}`);
                        done();
                    });
            });

            it('Get the Progress Status', function(done) {
                server
                    .get('/api/getProgressStatus')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('x-access-token', `'${token}'`)
                    .expect(200)
                    .end(function(err, res) {
                        res.body.stage.should.equal(0);
                        res.body.activity.should.equal(0);
                        done();
                    });
            });
            /* MAIL API not working
            it('Mail PC Policy', function(done) {
                server
                    .get('/api/mailpcpolicy')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('x-access-token', `'${token}'`)
                    .expect(200)
                    .end(function(err, res) {
                        res.body.message.should.equal('Mail Sent Succesfully.');
                        done();
                    });
            });
*/
            it('Update progress Status Illegal test', function(done) {
                let updatedStatus = {stage: 2, activity: 1};
                server
                    .patch('/api/updateProgressStatus')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('x-access-token', `'${token}'`)
                    .send(updatedStatus)
                    .expect(200)
                    .end(function(err, res) {
                        res.body.info.should.equal('PCE027 : Illegal operation');
                        done();
                    });
            });

            it('Update progress Status Success', function(done) {
                let updatedStatus = {stage: 1, activity: 1};
                server
                    .patch('/api/updateProgressStatus')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('x-access-token', `'${token}'`)
                    .send(updatedStatus)
                    .expect(200)
                    .end(function(err, res) {
                        res.body.info.should.equal('PCS003 : Successfully updated user progress status');
                        done();
                    });
            });

            it('Update progress Status data validation', function(done) {
                server
                    .patch('/api/updateProgressStatus')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('x-access-token', `'${token}'`)
                    .send()
                    .expect(200)
                    .end(function(err, res) {
                        res.body.error.should.equal('PCE029 : No data recieved to update progress status');
                        done();
                    });
            });

            it('Update progress Status Already Updated', function(done) {
                let updatedStatus = {stage: 1, activity: 1};
                server
                    .patch('/api/updateProgressStatus')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('x-access-token', `'${token}'`)
                    .send(updatedStatus)
                    .expect(200)
                    .end(function(err, res) {
                        res.body.info.should.equal('PCS003 : Successfully updated user progress status');
                        done();
                    });
            });

            it('Get Infokit Before Update', function(done) {
                server
                    .get('/api/infokitactive')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('x-access-token', `'${token}'`)
                    .expect(200)
                    .end(function(err, res) {
                        res.body.infokitactive.malaria_def.should.equal(false);
                        done();
                    });
            });

            it('Infokit Update', function(done) {
                server
                    .get('/api/activateinfokit')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('x-access-token', `'${token}'`)
                    .query({activate: 'malaria_def'})
                    .expect(200)
                    .end(function(err, res) {
                        res.body.message.should.equal('PCS004 : Activity added to Infokit');
                        done();
                    });
            });


            it('Get Infokit After Update', function(done) {
                server
                    .get('/api/infokitactive')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('x-access-token', `'${token}'`)
                    .expect(200)
                    .end(function(err, res) {
                        res.body.infokitactive.malaria_def.should.equal(true);
                        done();
                    });
            });

            it('Get Json Data', function(done) {
                server
                    .get('/api/getJSONData')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('x-access-token', `'${token}'`)
                    .query({file: 'quiz.json'})
                    .expect(200)
                    .end(function(err, res) {
                        res.body.data.should.be.okay;
                        done();
                    });
            });
        });
    });
});
