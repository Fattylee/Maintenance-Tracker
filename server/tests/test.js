import chaiHttp from 'chai-http';
import chai from 'chai';
import app from './../../app';


const { expect, should } = chai;

chai.use(chaiHttp);

describe('POST request', () => {
  
  it('Should return 404 for post with undefined name field', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        id: 1,
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

  it('Should return 406 for post with empty name field', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        id: 1,
        name: '',
        email: 'abcd@gmail.com',
        requestType: 'repair',
        description: 'fix problem1'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('name cannot be empty');
        done();
      });
  });
  
  it('Should return 406 for post with invalid name length', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        id: 1,
        name: 'tr',
        email: 'abcd@gmail.com',
        requestType: 'repair',
        description: 'fix problem1'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('name should be 3 to 30 characters long');
        done();
      });
  });

  it('Should return 404 for post with undefined email field', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        id: 1 ,
        name: 'Balogun Fatai',
        //email: '',
        requestType: 'repair',
        description: 'fix problem1'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('No input was received for email');
        done();
      });
  });

  it('Should return 406 for post with empty email field', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        id: 1,
        name: 'Balogun Fatai',
        email: '',
        requestType: 'repair',
        description: 'fix problem1'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('email cannot be empty');
        done();
      });
  });

  it('Should return 406 for invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        id: 1,
        name: 'Balogun Fatai',
        email: 'hhhkllk',
        requestType: 'repair',
        description: 'fix problem1'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('please enter a valid email format');
        done();
      });
  });

  it('Should return 406 for invalid email length', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        id: 1,
        name: 'Balogun Fatai',
        email: 'h@h.com',
        requestType: 'repair',
        description: 'fix problem1'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('email should be 10 to 50 characters long');
        done();
      });
  });

  it('Should return 404 for undefined requestType field', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        id: 1,
        name: 'Balogun Fatai',
        email: 'hnn4n@hiji.com',
        //requestType: 'repair',
        description: 'fix problem1'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('No input was received for requestType');
        done();
      });
  });

  it('Should return 404 for undefined requestType field', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        id: 1,
        name: 'Balogun Fatai',
        email: 'hnn4n@hiji.com',
        requestType: 'repahdhdir',
        description: 'fix problem1'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('requestType can only be maintenance / repair');
        done();
      });
  });

  it('Should return 404 for post with undefined decription field', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        id: 1,
        name: 'Balogun Fatai',
        email: 'abcd@gmail.com',
        requestType: 'repair',
        //description: 'fix problem1'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('No input was received for description');
        done();
      });
    })

    it('Should return 404 for post with undefined decription field', (done) => {
      chai.request(app)
        .post('/api/v1/users/requests')
        .send({
          id: 1,
          name: 'Balogun Fatai',
          email: 'abcd@gmail.com',
          requestType: 'repair',
          description: ''
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('description cannot be empty');
          done();
        });
      });

    it('Should return 406 for post with invalid decription character length', (done) => {
      chai.request(app)
        .post('/api/v1/users/requests')
        .send({
          id: 1,
          name: 'Balogun Fatai',
          email: 'abcd@gmail.com',
          requestType: 'repair',
          description: 'hdjw'
        })
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body.message).to.equal('description should be 10 to 50 characters long');
          done();
        });
    });

    it('Should return 201 if successful', (done) => {
      chai.request(app)
        .post('/api/v1/users/requests')
        .send({
          id: 1,
          name: 'Balogun Fatai',
          email: 'abcd@gmail.com',
          requestType: 'repair',
          description: 'hdjw bgvgvv bhbh'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal('Success');
          done();
        });
    });
});

describe('GET request', () => {
  
  it('Should return 200 if successful', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('successful request');
        done();
      });
  });


});
