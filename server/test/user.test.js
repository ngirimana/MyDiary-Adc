import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import users from '../models/users';

const { expect } = chai;
chai.use(chaiHttp);


describe('0. Welcome', () => {
  it('should return welcome ', async () => {
    chai.request(app)
      .get('/')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome To My Diary');
      });
  });
});
describe('1 . POST signup,api/v1/auth/signup', () => {
  it('should return firstName is required if it is empty', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[9])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"firstName" is not allowed to be empty');
      });
  });

  it('should return lastName is required if it is empty ', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[10])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"lastName" is not allowed to be empty');
      });
  });
  it('should return password is required if it is empty', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[11])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"password" is not allowed to be empty');
      });
  });
  it('should return signup successful', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('User created successfully');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data.userdata.id).to.equal(1);
        expect(res.body.data.userdata.firstName).to.equal('NGIRIMANA');
        expect(res.body.data.userdata.lastName).to.equal('schadrack');
        expect(res.body.data.userdata.email).to.equal('chadrack@gmail.com');
      });
  });
  it('should return signup successful', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[12])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('User created successfully');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data.userdata.id).to.equal(2);
        expect(res.body.data.userdata.firstName).to.equal('rukundo');
        expect(res.body.data.userdata.lastName).to.equal('safari');
        expect(res.body.data.userdata.email).to.equal('safari@gmail.com');
      });
  });
  it('should return {email} already exists', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(409);
        expect(res.body.error).to.equal('chadrack@gmail.com is already taken');
      });
  });
  it('should return "password" length must be at least 8 characters long', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('"password" length must be at least 8 characters long');
      });
  });
  it('should return "first_name" is required if data are not complete', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[3])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('"firstName" is required');
      });
  });
  it('should return invalid email', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('"email" must be a valid email');
      });
  });
});
describe('2 .POST signin  api/v2/auth/signin', () => {
  it('should return User signed in successfully', async () => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[4])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('User signed in successfully');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data.userdata.id).to.equal(1);
        expect(res.body.data.userdata.firstName).to.equal('NGIRIMANA');
        expect(res.body.data.userdata.lastName).to.equal('schadrack');
        expect(res.body.data.userdata.email).to.equal('chadrack@gmail.com');
      });
  });
  it('should return Incorrect email or password', async () => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Incorrect email or password');
      });
  });
  it('should return "email "is required when request is not complete', async () => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[6])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"email" is required');
      });
  });
  it('should return "password"is required', async () => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[7])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"password" is required');
      });
  });
  it('should return email must be valid', async () => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[8])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"email" must be a valid email');
      });
  });
});
