
const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter('/sprint-eight'); 
const locationController = require('./controllers/location.js'); 
const airQualityModule = require('./data/air-quality.js');

const version = 'sprint-eight';

// Location search
router.get('/' + version + '/where', (req, res) => {
  res.render('where', {
    airQuality: airQualityModule.airQuality, 
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

router.get('/health-effects', (req, res) => {
  res.render('/' + version + '/health-effects', {
    airQualityData: airQualityModule.commonMessages,
  });
});


  