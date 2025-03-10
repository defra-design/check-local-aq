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

// Templates that display session data
const locationRequiredRoutes = [
  '/sign-up-for-alerts/setup-or-manage',
  '/sign-up-for-alerts/check-your-email',
  '/sign-up-for-alerts/check-your-messages',
  '/sign-up-for-alerts/confirm-location',
  '/sign-up-for-alerts/check-your-details',
  '/sign-up-for-alerts/manage-alerts/:status',
  '/sign-up-for-alerts/email-notification/:status',
  '/sign-up-for-alerts/text-notification/:status',
  '/health-effects',
  '/health-advice-levels',
  '/pollutants/nitrogen-dioxide',
  '/pollutants/particulate-matter2',
  '/pollutants/particulate-matter10',
  '/pollutants/ozone',
  '/pollutants/sulphur-dioxide',
  '/email-high'
];

// Storing location data in the session 
router.use((req, res, next) => {
  if (req.query.locationName && req.query.parentArea) {
    req.session.data['locationName'] = req.query.locationName;
    req.session.data['parentArea'] = req.query.parentArea;
    req.session.data['locationString'] = `${req.query.locationName}, ${req.query.parentArea}`;
  }
  next();
});

// Get session data to display within templates
router.get(locationRequiredRoutes, (req, res) => {
  const viewPath = req.path.replace(/\/:status/, ''); 
  res.render(`${version}${viewPath}`, {
    locationName: req.session.data['locationName'],
    parentArea: req.session.data['parentArea'],
    locationString: req.session.data['locationString'] || "Unknown location",
    email: req.session.data['notifyByEmail'],
    text: req.session.data['notifyByText'],
    status: req.params.status
  });
});

// Routing for set or manage alerts
router.post('/sign-up-for-alerts/setup-or-manage', (req, res) => {
  req.session.data['createManageAlerts'] = req.body['create-manage-alerts'];

  const redirectPath = req.session.data['createManageAlerts'] === "create-alert"
    ? `/${version}/sign-up-for-alerts/confirm-location`
    : `/${version}/sign-up-for-alerts/manage-alerts`;

  res.redirect(redirectPath);
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


