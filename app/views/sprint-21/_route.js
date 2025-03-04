const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter('/sprint-21');
const locationController = require('./controllers/location.js'); 
const airQualityModule = require('./data/air-quality.js');
const alertsController = require('./controllers/alerts.js');
const { monitoringSites, pollutantTypes, siteTypeDescriptions } = require('./data/monitoring-sites.js');  

const version = 'sprint-21';

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

// Disambiguation (Multiple results)
router.get('/location/:id', (req, res) => {
  locationController.getLocationDetails(req, res, version);
});

// Published aggregated alerts
router.get('/alerts', (req, res) => {
  alertsController.getAlerts(req, res, version);
});

// Published alert
router.get('/alerts/:slug', (req, res) => {
  alertsController.getAlertBySlug(req, res, version);
});

// Store the location name and parent from page to page
const routeTemplateMap = {
  '/sign-up-for-alerts/confirm-location': '/sign-up-for-alerts/confirm-location',
  '/health-effects': '/health-effects',
  '/health-advice-levels': '/health-advice-levels',
  '/pollutants/nitrogen-dioxide': '/pollutants/nitrogen-dioxide',
  '/pollutants/particulate-matter2': '/pollutants/particulate-matter2',
  '/pollutants/particulate-matter10': '/pollutants/particulate-matter10',
  '/pollutants/ozone': '/pollutants/ozone',
  '/pollutants/sulphur-dioxide': '/pollutants/sulphur-dioxide',
  '/email-high': '/email-high', 
};

// Handle all routes dynamically
router.get(Object.keys(routeTemplateMap), (req, res) => {
  const locationName = req.query.locationName;
  const parentArea = req.query.parentArea;
  const locationString = `${locationName}, ${parentArea}`;

  // Store session data
  req.session.data['locationString'] = locationString;
  req.session.data['locationName'] = locationName;
  req.session.data['parentArea'] = parentArea;

  // Get the template corresponding to the current route
  const template = version + routeTemplateMap[req.path];

  // Render the appropriate template
  res.render(template, {
    locationName: locationName,
    parentArea: parentArea,
    locationString: locationString,
  });
});

// Alerts sign up
function renderPage(req, res, view, additionalData = {}) {
  const data = {
    email: req.session.data['notifyByEmail'],
    text: req.session.data['notifyByText'],
    locationString: req.session.data['locationString'],
    status: req.params.status, // This will be undefined if not present
    ...additionalData, // Allow passing additional properties specific to the route
  };

  res.render(`${version}/${view}`, data);
}

// Individual screens for sign up
router.get('/sign-up-for-alerts/check-your-email', function(req, res) {
  renderPage(req, res, 'sign-up-for-alerts/check-your-email');
});

router.get('/sign-up-for-alerts/check-your-messages', function(req, res) {
  renderPage(req, res, 'sign-up-for-alerts/check-your-messages');
});

router.get('/sign-up-for-alerts/manage-alerts/:status', function(req, res) {
  renderPage(req, res, 'sign-up-for-alerts/manage-alerts');
});

router.get('/email-notification/:status', function(req, res) {
  renderPage(req, res, 'email-notification');
});

router.get('/text-notification/:status', function(req, res) {
  renderPage(req, res, 'text-notification');
});


// Hardcoding the location page so it can be linked to from an email or text notification
router.get('/location-high', function(req, res) {
  const locationString = req.session.data['locationString'];
  const locationName = req.session.data['locationName'] || 'Missing name';

  const airQuality = {
    today: {
      value: req.query.todayValue || 8,
      readableBand: req.query.todayBand || 'high'
    },
    day2: {
      value: req.query.day2Value || 8,
      readableBand: req.query.day2Band || 'high'
    },
    day3: {
      value: req.query.day3Value || 5,
      readableBand: req.query.day3Band || 'moderate'
    },
    day4: {
      value: req.query.day4Value || 3,
      readableBand: req.query.day4Band || 'low'
    },
    day5: {
      value: req.query.day5Value || 2,
      readableBand: req.query.day5Band || 'low'
    }
  };

  const result = {
    GAZETTEER_ENTRY: {
      NAME1: locationName
    }
  };


  res.render(version + '/location-high', {
    airQuality: airQuality,
    locationName: locationName,
    locationString: locationString,
    monitoringSites: monitoringSites,
    pollutantTypes: pollutantTypes,
    result: result,
    version: version
  });
});


module.exports = router;


