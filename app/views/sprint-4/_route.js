
const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter('/sprint-4'); 
const locationController = require('./controllers/location.js'); 
const airQualityModule = require('./data/air-quality.js');

const version = 'sprint-4';


// Location search
router.get('/' + version + '/where', (req, res) => {
  res.render('where', {
    airQuality: airQuality, 
  });
});

// One location returned in query
router.post('/location', (req, res) => {
  locationController.getLocationData(req, res, version); 
});

// Disambiguation
router.get('/location/:id', (req, res) => {
  locationController.getLocationDetails(req, res, version);
});





  