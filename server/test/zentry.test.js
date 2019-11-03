import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import entries from '../models/entries';

const { expect } = chai;
chai.use(chaiHttp);
let route;
let slug;
const emptyToken = '';
let nonExistToken = jwt.sign({
  Id: 70,
  userEmail: 'ngirimana@gmail.com',
}, process.env.SECRETEKEY);
let token = jwt.sign({
  Id: 1,
  userEmail: 'chadrack@gmail.com',
}, process.env.SECRETEKEY);
let notYoursToken = jwt.sign({
  Id: 2,
  userEmail: 'safari@gmail.com',
}, process.env.SECRETEKEY);

const invalidToken = 'hsgbs shgbhsbd dhbfhsdbfbds fhsbhfbhsbfhbdsf sfdhsdbfdbshdbf';
describe(' 3. POST entries ,/api/v2/entries', () => {
  it('should return "title" is required ', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/entries')
        .set('Accept', 'application/json')
        .set('x-auth-token', token)
        .send(entries[4]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.equal('"title" is required');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return "title" is not allowed to be empty', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/entries')
        .set('x-auth-token', token)
        .set('Accept', 'application/json')
        .send(entries[1]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.equal('"title" is not allowed to be empty');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return "description" is not allowed to be empty', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/entries')
        .set('x-auth-token', token)
        .set('Accept', 'application/json')
        .send(entries[2]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.equal('"description" is not allowed to be empty');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return "title" must be a string', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/entries')
        .set('x-auth-token', token)
        .set('Accept', 'application/json')
        .send(entries[3]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.equal('"title" must be a string');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return You haven\'t provide your token', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/entries')
        .set('x-auth-token', emptyToken)
        .set('Accept', 'application/json')
        .send(entries[0]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.equal('You haven\'t provide your token');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return You are not authorized to perform this action', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/entries')
        .set('x-auth-token', nonExistToken)
        .set('Accept', 'application/json')
        .send(entries[0]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(401);
      expect(res.body.status).to.equal(401);
      expect(res.body.error).to.equal('You are not authorized to perform this task');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return jwt malformed', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/entries')
        .set('x-auth-token', invalidToken)
        .set('Accept', 'application/json')
        .send(entries[0]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.equal('jwt malformed');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return entry successfully created', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v2/entries')
        .set('x-auth-token', token)
        .set('Accept', 'application/json')
        .send(entries[0]);
      slug = res.body.data.slug;
      route = `/api/v2/entries/${slug}`;
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body.message).to.equal('entry successfully created');
      expect(res.body.data).to.have.property('slug');
      expect(res.body.data).to.have.property('created_on');
      expect(res.body.data.user_id).to.equal(1);
      expect(res.body.data.title).to.equal('rhehthhrt ettherhe rrhehrjwhejrh werhwehrjhwe wrehjwehrjwh');
      expect(res.body.data.description).to.equal('hfhsf hsdbhahda dbahsbdhaba fjsjng ssd gjndfg sfdnjsndf d adbhabdba dabdhbadba dadbhabddbad ABDHBJdj D HABFJDJF fnjsfn sfbbsjfsnf fnsjnfs sfnjsnf fsnfns sskdgdg dfgjndjfgnd fg');
      expect(res.body.data).to.have.property('updated_on');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
});
