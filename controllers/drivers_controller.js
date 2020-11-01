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
  },

  edit(req, res, next) {
    const driverId = req.params.id; // to pick the id out of the url
    const driverProps = req.body;

    Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
      .then(() => Driver.findById({ _id: driverId })) //findByIdAndUpdate() doesn't return the updated record. we must find it again here
      .then(driver => res.send(driver))
      .catch(next);   
  },

  delete(req, res, next) {
    const driverId = req.params.id;
    
    Driver.findByIdAndRemove({ _id: driverId })
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
};