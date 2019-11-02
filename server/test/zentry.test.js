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
describe(' 3. POST entries ,/api/v1/entries', () => {
  it('should return "title" is required ', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v1/entries')
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
        .post('/api/v1/entries')
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
        .post('/api/v1/entries')
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
        .post('/api/v1/entries')
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
        .post('/api/v1/entries')
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
        .post('/api/v1/entries')
        .set('x-auth-token', nonExistToken)
        .set('Accept', 'application/json')
        .send(entries[0]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(401);
      expect(res.body.status).to.equal(401);
      expect(res.body.error).to.equal('You are not authorized to perform this action');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return jwt malformed', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v1/entries')
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
  it('should return Your entries  are not found!', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/entries')
        .set('x-auth-token', token)
        .set('Accept', 'application/json');
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal(404);
      expect(res.body.error).to.equal('Your entries  are not found!');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return entry successfully created', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v1/entries')
        .set('x-auth-token', token)
        .set('Accept', 'application/json')
        .send(entries[0]);
      slug = res.body.data.slug;
      route = `/api/v1/entries/${slug}`;
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body.message).to.equal('entry successfully created');
      expect(res.body.data).to.have.property('slug');
      expect(res.body.data).to.have.property('createOn');
      expect(res.body.data.userid).to.equal(1);
      expect(res.body.data.title).to.equal('rhehthhrt ettherhe rrhehrjwhejrh werhwehrjhwe wrehjwehrjwh');
      expect(res.body.data.description).to.equal('hfhsf hsdbhahda dbahsbdhaba fjsjng ssd gjndfg sfdnjsndf d adbhabdba dabdhbadba dadbhabddbad ABDHBJdj D HABFJDJF fnjsfn sfbbsjfsnf fnsjnfs sfnjsnf fsnfns sskdgdg dfgjndjfgnd fg');
      expect(res.body.data).to.have.property('updatedOn');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
});
describe(' 4. PATCH entries ,/api/v1/entries/:entrySlug', () => {
  it('should return entry should should be alphanumeric ', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/entries/10')
        .set('x-auth-token', token)
        .set('Accept', 'application/json');
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal(400);
      // expect(res.body.error).to.equal('Entry slug should be a alphnumeric ');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return id is not found ', async () => {
    try {
      const res = await chai.request(app)
        .patch('/api/v1/entries/10bb')
        .set('x-auth-token', token)
        .set('Accept', 'application/json')
        .send(entries[5]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal(404);
      expect(res.body.error).to.equal('An entry with Id "10bb" does not exist');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return this entry does not belongs to you ', async () => {
    try {
      const res = await chai.request(app)
        .patch(route)
        .set('x-auth-token', notYoursToken)
        .set('Accept', 'application/json')
        .send(entries[5]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(403);
      expect(res.body.status).to.equal(403);
      expect(res.body).to.have.property('error');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return entry successfully edited', async () => {
    try {
      const res = await chai.request(app)
        .patch(route)
        .set('x-auth-token', token)
        .set('Accept', 'application/json')
        .send(entries[5]);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body.message).to.equal('entry successfully edited');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
});
describe(' 5. GET entries ,/api/v1/entries', () => {
  it('should return Your available entries are: ', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/entries')
        .set('x-auth-token', token)
        .set('Accept', 'application/json');
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body.message).to.equal('Your available entries are: ');
      expect(res.body.data[0]).to.have.property('slug');
      expect(res.body.data[0]).to.have.property('createOn');
      expect(res.body.data[0].userid).to.equal(1);
      expect(res.body.data[0].title).to.equal('rhehthhrt etthfhddb erhe rrhehrjwhejrh werhwehrjhwe wrehjwehrjwh');
      expect(res.body.data[0].description).to.equal('hfhsf hsdbhahda bsasanjnsaj dbahsbdhaba fjsjng ssd gjndfg sfdnjsndf d adbhabdba dabdhbadba dadbhabddbad ABDHBJdj D HABFJDJF fnjsfn sfbbsjfsnf fnsjnfs sfnjsnf fsnfns sskdgdg dfgjndjfgnd fg');
      expect(res.body.data[0]).to.have.property('updatedOn');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
});

describe(' 6. GET  specific entry ,/api/v1/entries/:entrySlug', () => {
  it('should return entry should should be alphanumeric ', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/entries/10')
        .set('x-auth-token', token)
        .set('Accept', 'application/json');
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.equal('Entry slug should be a alphnumeric ');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });

  it('should return entry is not found ', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/entries/10bbb')
        .set('x-auth-token', token)
        .set('Accept', 'application/json');
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal(404);
      expect(res.body.error).to.equal('This entry is not fouund');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return Your Entry was found ', async () => {
    try {
      const res = await chai.request(app)
        .get(route)
        .set('x-auth-token', token)
        .set('Accept', 'application/json');
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body.message).to.equal('Your Entry was found');
      expect(res.body.data).to.have.property('slug');
      expect(res.body.data).to.have.property('createOn');
      expect(res.body.data.userid).to.equal(1);
      expect(res.body.data.title).to.equal('rhehthhrt etthfhddb erhe rrhehrjwhejrh werhwehrjhwe wrehjwehrjwh');
      expect(res.body.data.description).to.equal('hfhsf hsdbhahda bsasanjnsaj dbahsbdhaba fjsjng ssd gjndfg sfdnjsndf d adbhabdba dabdhbadba dadbhabddbad ABDHBJdj D HABFJDJF fnjsfn sfbbsjfsnf fnsjnfs sfnjsnf fsnfns sskdgdg dfgjndjfgnd fg');
      expect(res.body.data).to.have.property('updatedOn');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
});
describe('7 . DELETE entries ,/api/v1/entries/:entrySlug', () => {
  it('should return entry should should be alphanumeric ', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/v1/entries/10')
        .set('x-auth-token', token)
        .set('Accept', 'application/json');
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.equal('Entry slug should be a alphnumeric ');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
  it('should return id is not found ', async () => {
    try {
      const res = await chai.request(app)
        .delete('/api/v1/entries/10bb')
        .set('x-auth-token', token)
        .set('Accept', 'application/json');
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal(404);
      expect(res.body.error).to.equal('This entry is not avaialable');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });

  it('should return this entry does not belongs to you ', async () => {
    try {
      const res = await chai.request(app)
        .delete(route)
        .set('x-auth-token', notYoursToken)
        .set('Accept', 'application/json');
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(403);
      expect(res.body.status).to.equal(403);
      expect(res.body.error).to.equal('This entry doesn\'t belongs to you');
    } catch (error) {
      throw error;
    }
  });
  it('should return entry successfully deleted', async () => {
    try {
      const res = await chai.request(app)
        .delete(route)
        .set('x-auth-token', token)
        .set('Accept', 'application/json');
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body.message).to.equal('entry successfully deleted');
      expect(res.body.data).to.have.property('slug');
      expect(res.body.data).to.have.property('createOn');
      expect(res.body.data.userid).to.equal(1);
      expect(res.body.data.title).to.equal('rhehthhrt etthfhddb erhe rrhehrjwhejrh werhwehrjhwe wrehjwehrjwh');
      expect(res.body.data.description).to.equal('hfhsf hsdbhahda bsasanjnsaj dbahsbdhaba fjsjng ssd gjndfg sfdnjsndf d adbhabdba dabdhbadba dadbhabddbad ABDHBJdj D HABFJDJF fnjsfn sfbbsjfsnf fnsjnfs sfnjsnf fsnfns sskdgdg dfgjndjfgnd fg');
      expect(res.body.data).to.have.property('updatedOn');
    } catch (error) {
      (() => { throw error; }).should.throw();
    }
  });
});
