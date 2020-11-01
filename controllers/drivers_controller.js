const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  create(req, res, next) {
    // console.log(req.body);
    const driverProps = req.body; // contains new driver properties such as email, name etc. from bodyParser

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next); // if anything goes wrong, pass onto the next middleware
  }
};