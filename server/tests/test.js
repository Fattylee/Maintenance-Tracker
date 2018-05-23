import chaiHttp from 'chai-http';
import chai from 'chai';
import app from './../../app';


const { expect, should } = chai;

chai.use(chaiHttp);

describe('POST business', () => {
  it('Should return 201 for a sucessful post', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        id: 1,
        name: 'Balogun Fatai',
        email: 'abcd@gmail.com',
        username: 'yourname1',
        password: '1234',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Success');
        done();
      });
  });
  it('Should return 400 for post with empty field', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        id: 1,
        name: 'Balogun Fatai',
        email: 'abcd@gmail.com',
        username: '',
        password: '1234',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Business name cannot be empty');
        done();
      });
  });
});

