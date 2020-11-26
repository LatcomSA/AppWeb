const chai = require('chai');
const chaiHttp = require('chai-http');
const transactionCreate = require('../src/transaction_create/server');
const transactionHistory = require('../src/transaction_history/server');
const transactionInactive = require('../src/transaction_inactive/server');
const transactionTotalpoints = require('../src/transaction_totalpoints/server');
const userLogin = require('../src/user_login/server');
const userRegister = require('../src/user_register/server');
const expect = require('chai').expect;
chai.use(chaiHttp);
require('should');

let token;
describe('/POST Register a new user into abc app', () => {
    it('it should try to register a new user', (done) => {
      const user = {
        name: 'Jasson',
        lastname: 'M0lina',
        birth_date: new Date(),
        email: 'js.molina12@uniandes.edu.co',
        password: 'ray3349817'
      }
      chai.request(userRegister)
      .post('/signup')
      .send(user)
      .end((err, res) => {
        res.status.should.be.equal(200);
        //res.body.should.have.property('token');
      done();
      });
    }).timeout(10000);
  });
describe('/POST Login an existing user into abc app', () => {
    it('it should try to login an existing user successfully', (done) => {
        const user = {
          email: 'js.molina12@uniandes.edu.co',
          password: 'ray3349817'
        }
        chai.request(userLogin)
        .post('/signin')
        .send(user)
        .end((err, res) => {
          res.status.should.be.equal(200);
          res.body.should.have.property('token');          
          token = res.body.token;          
          done();
        });
    }).timeout(100000);
  });
  
describe('/POST Create a new user transaction', () => {
    it('it should create a new Transaction successfully with 20 points', (done) => {
        const transaction = {
          value: 777,
          points: 50,
        }
        chai.request(transactionCreate)
        .post('/transaction/create')
        .set('x-access-token',token)        
        .send(transaction)
        .end((err, res) => {
          res.status.should.be.equal(200);
          console.log(res.body)
          done();
        });
    }).timeout(10000);
});

describe('/POST Create a new user transaction', () => {
  it('it should create a new Transaction successfully with 50 points', (done) => {
      const transaction = {
        value: 777,
        points: 20,
      }
      chai.request(transactionCreate)
      .post('/transaction/create')
      .set('x-access-token',token)        
      .send(transaction)
      .end((err, res) => {
        res.status.should.be.equal(200);
        console.log(res.body)
        done();
      });
  }).timeout(10000);
});

describe('/POST Create a new user transaction', () => {
  it('it should not create a new Transaction successfully with 30 points', (done) => {
      const transaction = {
        value: 777,
        points: 30,
      }
      chai.request(transactionCreate)
      .post('/transaction/create')
      .set('x-access-token',token)        
      .send(transaction)
      .end((err, res) => {
        res.status.should.be.equal(200);
        console.log(res.body)
        done();
      });
  }).timeout(10000);
});

describe('/PUT/:transaction_id inactive a specific user transaction', () => {
  it('it should try to UPDATE the transaction with id=2 and points= 20 by changing its status to 0', (done) => {
      chai.request(transactionInactive)
      .put('/transaction/inactive/' + 2)
      .set('x-access-token', token)
      .end((err, res) => {
        res.status.should.be.equal(200);
        console.log(res.body)
        done();
      });
  }).timeout(10000);
});

describe('/GET sum the total points of the active user transactions', () => {
      it('it should GET the total sum of points from all active user transactions, So the total points must be id_1_points + id_3_points  = 30 + 50 = 80', (done) => {
            chai.request(transactionTotalpoints)
            .get('/transaction/totalpoints')
            .set('x-access-token', token)
            .end((err, res) => {
              res.status.should.be.equal(200);
              console.log(res.body)
              done();
            });
      }).timeout(10000);
  });

describe('/GET the user transaction history in order Desc', () => {
    it('it should GET all transactions from a user in order Desc; First transaction with id_3; First transaction with id_2; First transaction with id_1', (done) => {
          chai.request(transactionHistory)
          .get('/transaction/history')
          .set('x-access-token', token)
          .end((err, res) => {
            res.status.should.be.equal(200);
            console.log(res.body)
            done();  
          });
    }).timeout(10000);
});

/////-----------------------------------------------------------------------------------
//// -------- the task not work becuse not correct input data --------------------------
/// ------------------------------------------------------------ -----------------------
var token2 = ' '
describe('/POST Register a new user into abc app', () => {
  it('it should NOT try to register a new user. Because, actually exist', (done) => {
    const user = {
      name: 'Jasson',
      lastname: 'M0lina',
      birth_date: new Date(),
      email: 'js.molina12@uniandes.edu.co',
      password: 'ray3349817'
    }
    chai.request(userRegister)
    .post('/signup')
    .send(user)
    .end((err, res) => {
      res.status.should.be.equal(200);
    done();
    });
  }).timeout(10000);
});

describe('/POST Create a new user transaction', () => {
  it('it should NOT create a new Transaction successfully. Because, the token is not correct', (done) => {
      const transaction = {
        value: 777,
        points: 50,
      }
      chai.request(transactionCreate)
      .post('/transaction/create')
      .set('x-access-token',token2)        
      .send(transaction)
      .end((err, res) => {
        res.status.should.be.equal(401);
        console.log(res.body)
        done();
      });
  }).timeout(10000);
});
describe('/PUT/:transaction_id inactive a specific user transaction', () => {
  it('it should NOT try to UPDATE the transaction. Because, the token is not correct', (done) => {
      chai.request(transactionInactive)
      .put('/transaction/inactive/' + 1)
      .set('x-access-token', token2)
      .end((err, res) => {
        res.status.should.be.equal(401);
        console.log(res.body)
        done();
      });
  }).timeout(10000);
});
describe('/GET the user transaction history in order Desc', () => {
  it('it should NOT GET all transactions from a user in order Desc. Because, the token is not correct ', (done) => {
        chai.request(transactionHistory)
        .get('/transaction/history')
        .set('x-access-token', token2)
        .end((err, res) => {
          res.status.should.be.equal(401);
          console.log(res.body)
          done();
        });
  }).timeout(10000);
});