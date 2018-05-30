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

  it('Should return  for routes not specified', (done) => {
    chai.request(app)
      .get('/another/undefined/route')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });404
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
  it('Should return 400 for undefined name', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
          id: 1,
          email:"abc@yahoo.com",
          username: 'yourname1',
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('No input was received for name');
        done();
      });
  });

  it('Should return 406 for empty name field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
          id: 1,
          name: '',
          email:"abc@yahoo.com",
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
      .post('/api/v1/auth/signup')
      .send({
          id: 1,
          name: 'n',
          email:"abc@yahoo.com",
          username: 'yourname1',
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('name should be 2 to 30 characters long');
        done();
      });
  });


  it('Should return 406 for non-alphanumeric characters name field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
          id: 1,
          name: 'n@',
          email:"abc@yahoo.com",
          username: 'yourname1',
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('name can only contains alphanumeric characters');
        done();
      });
  });

  it('Should return 400 for undefined email field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
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
      .post('/api/v1/auth/signup')
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
      .post('/api/v1/auth/signup')
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
      .post('/api/v1/auth/signup')
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

  it('Should return 409 for existing email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"fatai4humility@yahoo.com",
          username: 'yourname1',
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.message).to.equal('email already exist, login or sign up with another email');
        done();
      });
  });

  it('Should return 406 for undefined username field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"fattylee.remod@gmail.com",
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('no input was received for username');
        done();
      });
  });

  it('Should return 406 for empty username field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"fattylee.remod@gmail.com",
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
      .post('/api/v1/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"fattylee.remod@gmail.com",
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
      .post('/api/v1/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"fattylee.remod@gmail.com",
          username: 'gh jkkd',
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('username should not contain whitespace');
        done();
      });
  });

  it('Should return 406 for username with non a-zA-Z0-9 characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"fattylee.remod@gmail.com",
          username: 'gh@jkkd',
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('username can only contains a-zA-Z0-9');
        done();
      });
  });

  it('Should return 409 for existing username', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"fattylee.remod@gmail.com",
          username: 'yourname1',
          password: '1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.message).to.equal('username already exist, login to your account');
        done();
      });
  });

  it('Should return 406 for undefined password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"fattylee.remod@gmail.com",
          username: 'yourname2',
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('no input was received for password');
        done();
      });
  });

  it('Should return 406 for empty password field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"fattylee.remod@gmail.com",
          username: 'yourname2',
          password: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('password cannot be empty');
        done();
      });
  });

  it('Should return 406 for invalid password length', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"fattylee.remod@gmail.com",
          username: 'yourname2',
          password: 'bf'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('password should be 4 to 16 characters long');
        done();
      });
  });

  it('Should return 406 if password contains whitespace', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
          id: 1,
          name: 'Fatai Balogun',
          email:"fattylee.remod@gmail.com",
          username: 'yourname2',
          password: 'bhb bjb'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('password should not contains whitespace');
        done();
      });
  });


  it('Should return 201 for a successful signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
          id: 1,
          name: 'Mark Zucker',
          email:"mark.zuck@gmail.com",
          username: 'yourname2',
          password: '12345'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Mark Zucker, your signup was successful');
        done();
      });
  });

  
  // it('Should return 500 for a signup error', (done) => {
  //   chai.request(app)
  //     .post('/api/v1/auth/signup')
  //     .send({
  //         id: 1,
  //         //name: 'Mark Zuckerberge',
  //         //email:"zz1@yahoo.com",
  //         //username: 'yournyml',
  //         //password: 'bhb73xb'
  //     })
  //     .end((err, res) => {
  //       expect(err).to.have.status(500);
  //       //expect(res).to.have.property.message;
  //       done();
  //     });
  // });




});//End Test Signup
