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

})
describe('POST request', () => {
  
  it('Should return 404 for post with undefined name field', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        id: 1,
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

  it('Should return 404 for invalid request id', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/17')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Invalid request id');
        done();
      });
  });

});

describe('MODIFY GET request', () => {
  
  it('Should return 404 for invalid id', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/84')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Invalid request id');
        done();
      });
  });

  it('Should return 404 for undefined name', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/1')
      .send({
        id: 1,
        email: 'abcd@gmail.com',
        requestType: 'repair',
        description: 'hdjw bgvgvv bhbh'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('No input was received for name');
        done();
      });
  });

  it('Should return 404 for empty name field', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/1')
      .send({
        id: 1,
        name: '',
        email: 'abcd@gmail.com',
        requestType: 'repair',
        description: 'hdjw bgvgvv bhbh'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('name cannot be empty');
        done();
      });
  });

  it('Should return 406 for invalid name character ', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/1')
      .send({
        id: 1,
        name: 'er',
        email: 'abcd@gmail.com',
        requestType: 'repair',
        description: 'hdjw bgvgvv bhbh'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('name should be 3 to 30 characters long');
        done();
      });
  });

  it('Should return 404 for undefined email', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/1')
      .send({
        id: 1,
        name: 'Balogun Fatai',
        requestType: 'repair',
        description: 'hdjw bgvgvv bhbh'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('No input was received for email');
        done();
      });
  });

  it('Should return 404 for empty email field', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/1')
      .send({
        id: 1,
        name: 'Balogun Fatai',
        email: '',
        requestType: 'repair',
        description: 'hdjw bgvgvv bhbh'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('email cannot be empty');
        done();
      });
  });

  it('Should return 406 for invalid email', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/1')
      .send({
        id: 1,
        name: 'Balogun Fatai',
        email: 'bcbwm',
        requestType: 'repair',
        description: 'hdjw bgvgvv bhbh'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('please enter a valid email format');
        done();
      });
  });

  it('Should return 404 for undefined requestType', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/1')
      .send({
        id: 1,
        name: 'Balogun Fatai',
        email: 'abcd@gmail.com',
        description: 'hdjw bgvgvv bhbh'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('No input was received for requestType');
        done();
      });
  });

  it('Should return 400 for bad requestType', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/1')
      .send({
        id: 1,
        name: 'Balogun Fatai',
        email: 'abcd@gmail.com',
        requestType: 'none sense',
        description: 'hdjw bgvgvv bhbh'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('requestType can only be maintenance / repair');
        done();
      });
  });

  it('Should return 404 for undefined description', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/1')
      .send({
        id: 1,
        name: 'Balogun Fatai',
        email: 'abcd@gmail.com',
        requestType: 'repair',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('No input was received for description');
        done();
      });
  });

  
  it('Should return 404 for empty description', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/1')
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

  it('Should return 406 for invalid description', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/1')
      .send({
        id: 1,
        name: 'Balogun Fatai',
        email: 'abcd@gmail.com',
        requestType: 'repair',
        description: '2ewef'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('description should be 10 to 50 characters long');
        done();
      });
  });

  it('Should return 205 for succesful modification', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/1')
      .send({
        id: 1,
        name: 'Ali BillGate',
        email: 'abcbil@gmail.com',
        requestType: 'repair',
        description: 'broken screen'
      })
      .end((err, res) => {
        expect(res).to.have.status(205);
        expect(res.body.message).to.equal('modified successfully');
        done();
      });
  });

});//End MODIFY GET request

describe('Test Signup', () => {
  it('Should return 404 for undefined name', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
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

  it('Should return 404 for empty name field', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send({
          id: 1,
          name: '',
          email:"abcs@yahoo.com",
          username: 'yourname1',
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('name cannot be empty');
        done();
      });
  });

  it('Should return 406 for invalid character length', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send({
          id: 1,
          name: 'Bi',
          email:"abcs@yahoo.com",
          username: 'yourname1',
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('name should be 3 to 30 characters long');
        done();
      });
  });

  it('Should return 400 for undefined email field', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          username: 'yourname1',
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('No input was received for email');
        done();
      });
  });

  it('Should return 406 for empty email field', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"",
          username: 'yourname1',
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('email cannot be empty');
        done();
      });
  });

  it('Should return 406 for invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"nkfnk",
          username: 'yourname1',
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('please enter a valid email format');
        done();
      });
  });

  it('Should return 406 for invalid email character length', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"n@h.com",
          username: 'yourname1',
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('email should be 10 to 50 characters long');
        done();
      });
  });

  it('Should return 406 for empty username field', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"abckl@yahoo.com",
          username: '',
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('username cannot be empty');
        done();
      });
  });

  it('Should return 406 for invalid character username length', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"abckl@yahoo.com",
          username: 'g',
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('username should be 2 to 15 characters long');
        done();
      });
  });

  it('Should return 406 for username with whitespace', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"abckl@yahoo.com",
          username: 'gh jkkd',
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('username should not contain whitespace');
        done();
      });
  });

  it('Should return 409 for existing username', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"abckl@yahoo.com",
          username: 'yourname1',
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.message).to.equal('username already exist, use another username or login to your account');
        done();
      });
  });

  it('Should return 406 for undefined password', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"abckl@yahoo.com",
          username: 'yournameh',
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('no input was received for password');
        done();
      });
  });

  it('Should return 406 for empty password field', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"abckl@yahoo.com",
          username: 'yournameh',
          password: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('password cannot be empty');
        done();
      });
  });

  it('Should return 406 for password with whitespace', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"abckl@yahoo.com",
          username: 'yournameh',
          password: 'jh nbjbj'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('password should not contains whitespace');
        done();
      });
  });

  it('Should return 201 for successful signup', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"marcus@yahoo.com",
          username: 'yournamehk',
          password: 'jbjbj'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Success');
        done();
      });
  });

})
