const mongoose = require('mongoose');

// connection to test database here (not in app.js) so that a connection is definately made before any tests are run.
before((done) => {
    mongoose.connect('mongodb://localhost/muber_test',{ useNewUrlParser: true });
    mongoose.connection
      .once('open', () => done())
      .on('error', done()) // nothing to catch an error here!!
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    .then(() => done())
    .catch(() => done()); // this catch incase we don't have a collection to drop (maybe because it's the first time we connect)
});