// //
// // For guidance on how to create routes see:
// // https://prototype-kit.service.gov.uk/docs/create-routes
// //

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter();
const locationController = require('./controllers/location');
const airQuality = require('./data/air-quality.js');

// // Air quality
router.get('/where', (req, res) => {
  res.render('where', {
    airQuality: airQuality, 
  });
});

// POST route for where.html submission
router.post('/location', locationController.getLocationData);


// New GET route to handle individual location details
router.get('/location/:id', locationController.getLocationDetails);

module.exports = router;

