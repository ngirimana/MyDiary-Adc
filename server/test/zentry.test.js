import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import entries from '../models/entries';

const { expect } = chai;
chai.use(chaiHttp);
let userToken;
const token = '';
let notYourToken;
let nonExistToken = jwt.sign({
  Id: 70,
  userEmail: 'ngirimana@gmail.com',
}, process.env.SECRETEKEY);
const invalidToken = 'hsgbs shgbhsbd dhbfhsdbfbds fhsbhfbhsbfhbdsf sfdhsdbfdbshdbf';
describe(' 3. POST entries ,/api/v1/entries', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({
      email: 'chadrack@gmail.com',
      password: 'safari1006',
    }).then((res) => {
      userToken = res.body.data.token;
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return "title" is required ', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .send(entries[4])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"title" is required');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return "title" is not allowed to be empty', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .send(entries[1])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"title" is not allowed to be empty');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return "description" is not allowed to be empty', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .send(entries[2])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"description" is not allowed to be empty');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return "title" must be a string', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .send(entries[3])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"title" must be a string');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return You haven\'t provide your token', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('x-auth-token', token)
      .set('Accept', 'application/json')
      .send(entries[0])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('You haven\'t provide your token');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return You are not authorized to perform this action', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('x-auth-token', nonExistToken)
      .set('Accept', 'application/json')
      .send(entries[0])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('You are not authorized to perform this action');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return jwt malformed', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('x-auth-token', invalidToken)
      .set('Accept', 'application/json')
      .send(entries[0])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return entry successfully created', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .send(entries[0])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('entry successfully created');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
