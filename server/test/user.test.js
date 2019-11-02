import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import users from '../models/users';

const { expect } = chai;
chai.use(chaiHttp);


describe('0. Welcome', () => {
  it('should return welcome ', async () => {
    try {
      const res = await chai.request(app)
        .get('/')
        .set('Accept', 'application/json');
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal(200);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Welcome To My Diary');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });
});
describe('1 . POST signup,api/v2/auth/signup', () => {
  it('should return firstName is required if it is empty', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(users[9]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.equal('"firstName" is not allowed to be empty');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });

  it('should return lastName is required if it is empty ', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(users[10]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.equal('"lastName" is not allowed to be empty');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return password is required if it is empty', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(users[11]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.equal('"password" is not allowed to be empty');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return signup successful', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(users[0]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(201);
      expect(res.body.status).to.equal(201);
      expect(res.body.message).to.equal('User created successfully');
      expect(res.body.data).to.have.property('token');
      expect(res.body.data.userData.id).to.equal(1);
      expect(res.body.data.userData.firstname).to.equal('NGIRIMANA');
      expect(res.body.data.userData.lastname).to.equal('schadrack');
      expect(res.body.data.userData.email).to.equal('chadrack@gmail.com');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return signup successful', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(users[12]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(201);
      expect(res.body.status).to.equal(201);
      expect(res.body.message).to.equal('User created successfully');
      expect(res.body.data).to.have.property('token');
      expect(res.body.data.userData.id).to.equal(2);
      expect(res.body.data.userData.firstname).to.equal('rukundo');
      expect(res.body.data.userData.lastname).to.equal('safari');
      expect(res.body.data.userData.email).to.equal('safari@gmail.com');
    } catch (error) {
      throw error;
    }
  });
  it('should return {email} already exists', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(users[0]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(409);
      expect(res.body.error).to.equal('chadrack@gmail.com was already taken');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return "password" length must be at least 8 characters long', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(users[2]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('"password" length must be at least 8 characters long');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return "first_name" is required if data are not complete', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(users[3]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('"firstName" is required');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return invalid email', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(users[1]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('"email" must be a valid email');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
});
