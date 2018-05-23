import chaiHttp from 'chai-http';
import chai from 'chai';
import app from './../../app';


const { expect, should } = chai;

chai.use(chaiHttp);

describe('POST request', () => {
  it('Should return 201 for a sucessful post', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        //id: 1,
        name: 'Balogun Fatai',
        email:"abcs@yahoo.com",
        requestType: 'repair',
        description: 'fix nuuunuuu'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Success');
        done();
      });
  });
// });
  it('Should return 404 for post with undefined name field', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        //id: 1,
        //name: 'Balogun Fatai',
        email: 'abcd@gmail.com',
        requestType: 'repair',
        description: 'fix problem1'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('No input was received for name');
        done();
      });
  });
  it('Should return 404 for post with empty name field', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        //id: 1,
        name: '',
        email: 'abcd@gmail.com',
        requestType: 'repair',
        description: 'fix problem1'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('name cannot be empty');
        done();
      });
  });  
  it('Should return 404 for post with empty email field', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        id: 1,
        name: 'Balogun Fatai',
        //email: 'abcd@gmail.com',
        requestType: 'repair',
        description: 'fix problem1'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('No input was received for email');
        done();
      });
  });
});

