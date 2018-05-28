import chaiHttp from 'chai-http';
import chai from 'chai';
import app from './../../app';


const { expect } = chai;

chai.use(chaiHttp);

describe('Test API', () => {
  it('Should return 200 for home page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Welcome to fattylee Maintenance Tracker App. Have Fun!');
        done();
      });
  });

  it('Should return 404 for routes not specified', (done) => {
    chai.request(app)
      .get('/another/undefined/route')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('Undefined Routes Should Return 404', (done) => {
    chai.request(app)
      .post('/another/undefined/route')
      .send({ random: 'random' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

})// End Test API


describe('Test Signup', () => {
  it('Should return 404 for undefined name', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
          id: 1,
          email:"abcs@yahoo.com",
          username: 'yourname1',
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('No input was received for name');
        done();
      });
  });

});//End Test Signup
