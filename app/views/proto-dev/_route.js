const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter('/proto-dev');
const locationController = require('./controllers/location.js'); 
const airQualityModule = require('./data/air-quality.js');
const alertsController = require('./controllers/alerts.js');
const { monitoringSites, siteTypeDescriptions } = require('./data/monitoring-sites.js');  

const version = 'proto-dev';

// Location search
router.get('/' + version + '/where', (req, res) => {
  res.render(version + '/where', {
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

// Alerts route
router.get('/alerts', (req, res) => {
  alertsController.getAlerts(req, res, version);
});

// Individual alert route
router.get('/alerts/:slug', (req, res) => {
  alertsController.getAlertBySlug(req, res, version);
});

// Confirm location post location forecast
router.get('/sign-up-for-alerts/confirm-location', (req, res) => {
  const locationName = req.query.locationName;
  const parentArea = req.query.parentArea;
  const locationString = `${locationName}, ${parentArea}`;

  // Store the locationString in the session
  req.session.data['locationString'] = locationString;
  req.session.data['locationName'] = locationName;
  req.session.data['parentArea'] = parentArea;

  res.render(version + '/sign-up-for-alerts/confirm-location', {
    locationName: locationName,
    parentArea: parentArea,
    locationString: locationString
  });
});




router.get('/sign-up-for-alerts/check-your-email', function(req, res) {
  const email = req.session.data['notifyByEmail'];
  const locationString = req.session.data['locationString'];
  
  res.render(version + '/sign-up-for-alerts/check-your-email', {
    email: email,
    locationString: locationString,
  });
});

router.get('/sign-up-for-alerts/check-your-messages', function(req, res) {
  const text = req.session.data['notifyByText'];
  const locationString = req.session.data['locationString'];
  
  res.render(version + '/sign-up-for-alerts/check-your-messages', {
    text: text,
    locationString: locationString,
  });
});


// Manage air quality alerts (This is used for a number of screens)
router.get('/sign-up-for-alerts/manage-alerts/:status', function(req, res) {
  const email = req.session.data['notifyByEmail'];
  const text = req.session.data['notifyByText'];
  const locationString = req.session.data['locationString'];
  const status = req.params.status;  

  res.render(version + '/sign-up-for-alerts/manage-alerts', {
    email: email,
    text: text,
    locationString: locationString,
    status: status
  });
});

// Email notifications
router.get('/email-notification/:status', function(req, res) {
  const email = req.session.data['notifyByEmail'];
  const locationString = req.session.data['locationString'];
  const status = req.params.status;  

  res.render(version + '/email-notification', {
    email: email,
    locationString: locationString,
    status: status
  });
});

// Text notifications
router.get('/text-notification/:status', function(req, res) {
  const text = req.session.data['notifyByText'];
  const locationString = req.session.data['locationString'];
  const status = req.params.status;  

  res.render(version + '/text-notification', {
    text: text,
    locationString: locationString,
    status: status
  });
});

// Hardcoding the location page so it can be linked to from an email alert
router.get('/location-forecast', function(req, res) {
  const locationString = req.session.data['locationString'];
  const locationName = req.session.data['locationName'] || 'Missing name';

  const airQuality = {
    today: {
      value: req.query.todayValue || 3,
      readableBand: req.query.todayBand || 'low'
    },
    day2: {
      value: req.query.day2Value || 3,
      readableBand: req.query.day2Band || 'low'
    },
    day3: {
      value: req.query.day3Value || 9,
      readableBand: req.query.day3Band || 'high'
    },
    day4: {
      value: req.query.day4Value || 9,
      readableBand: req.query.day4Band || 'high'
    },
    day5: {
      value: req.query.day5Value || 5,
      readableBand: req.query.day5Band || 'moderate'
    }
  };

  const result = {
    GAZETTEER_ENTRY: {
      NAME1: locationName
    }
  };


  res.render(version + '/location-forecast', {
    airQuality: airQuality,
    locationName: locationName,
    locationString: locationString,
    monitoringSites: monitoringSites,
    result: result,
    version: version
  });
});


module.exports = router;


