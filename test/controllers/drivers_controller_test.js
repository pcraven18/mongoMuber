const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
  it('Post to /api/drivers creates a new driver', done => {
    Driver.count().then(count => {
      
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' }) //to send some data to ther server with the request. this is sent to our create function
        .end(() => {

          Driver.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });
});