const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter('/version-2-3');
const locationController = require('./controllers/location.js'); 
const airQualityModule = require('./data/air-quality.js');
const alertsController = require('./controllers/alerts.js');
const { monitoringSites, pollutantTypes, siteTypeDescriptions } = require('./data/monitoring-sites.js');  

const version = 'version-2-3';

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

// Screens that display session data need to be listed here
const locationRequiredRoutes = [
  '/sign-up-for-alerts/setup-or-manage',

  '/sign-up-for-alerts/change-location-check',
  '/sign-up-for-alerts/change-alert-method',

  '/sign-up-for-alerts/email',
  '/sign-up-for-alerts/send-new-link',

  '/sign-up-for-alerts/check-your-email',
  '/sign-up-for-alerts/check-your-email-2',
  '/sign-up-for-alerts/check-your-email-updated',
  '/sign-up-for-alerts/check-your-messages',
  '/sign-up-for-alerts/check-your-messages-2',
  '/sign-up-for-alerts/check-your-details',

  '/sign-up-for-alerts/confirm-location',

  '/sign-up-for-alerts/manage-alerts',
  '/sign-up-for-alerts/manage-alerts-success',
  '/sign-up-for-alerts/manage-alerts-added',
  '/sign-up-for-alerts/manage-alerts-changed-location',
  '/sign-up-for-alerts/manage-alerts-contact',
  '/sign-up-for-alerts/manage-alerts-method',
  '/sign-up-for-alerts/manage-check-messages',
  '/sign-up-for-alerts/manage-check-email',

  '/sign-up-for-alerts/email-notification',
  '/sign-up-for-alerts/text-notification',
  
  '/sign-up-for-alerts/unsubscribe-confirmation',
   '/sign-up-for-alerts/unsubscribe-check',
  '/sign-up-for-alerts/unsubscribe-email-confirmation',
  '/sign-up-for-alerts/unsubscribe-email-cancel',

  '/sign-up-for-alerts/mobile-number',
  '/sign-up-for-alerts/code-presend',
  '/sign-up-for-alerts/code-presend-2',
  '/sign-up-for-alerts/send-new-code',

  '/sign-up-for-alerts/confirm-alert-details',
  '/sign-up-for-alerts/confirm-alert-details-2',
  '/sign-up-for-alerts/alerts-success',
  '/sign-up-for-alerts/alerts-success-2',

  '/actions',
  '/email-high',
  '/health-effects',
  '/health-advice-levels',
  '/how-aq-measured',
  '/location-moderate',
  '/location-high',
  '/location-veryhigh',
  '/location-breach',
  '/pollutants/nitrogen-dioxide',
  '/pollutants/particulate-matter',
  '/pollutants/particulate-matter2',
  '/pollutants/particulate-matter10',
  '/pollutants/ozone',
  '/pollutants/sulphur-dioxide',
  '/reduce-your-exposure',

  '../layouts/main',
  '../layouts/version-2-3'

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
  res.render(`${version}${req.path}`, {
    locationName: req.session.data['locationName'],
    parentArea: req.session.data['parentArea'],
    locationString: req.session.data['locationString'] || "Unknown location",
    email: req.session.data['notifyByEmail'],
    text: req.session.data['notifyByText']
  });
});

// Routing for SETUP or manage alerts
router.post('/sign-up-for-alerts/setup-or-manage', (req, res) => {
  req.session.data['createManageAlerts'] = req.body['create-manage-alerts'];

  const redirectPath = req.session.data['createManageAlerts'] === "create-alert"
    ? `/${version}/sign-up-for-alerts/confirm-location`
    : `/${version}/sign-up-for-alerts/manage-alerts-contact`;

  res.redirect(redirectPath);
});


// Routing for ACCESS manage alerts
router.post('/sign-up-for-alerts/manage-alerts-contact', (req, res) => {
  req.session.data['accessManageAlerts'] = req.body['contact-manage-alerts'];

  const redirectPath = req.session.data['accessManageAlerts'] === "check-text"
    ? `/${version}/sign-up-for-alerts/manage-check-messages`
    : `/${version}/sign-up-for-alerts/manage-check-email`;

  res.redirect(redirectPath);
});


// Routing for change contact method
router.post('/sign-up-for-alerts/change-alert-method', (req, res) => {
  req.session.data['changeAlertMethod'] = req.body['alert-method-change'];

  const redirectPath = req.session.data['accessManageAlerts'] === "check-text"
    ? `/${version}/sign-up-for-alerts/manage-check-messages`
    : `/${version}/sign-up-for-alerts/manage-check-email`;

  res.redirect(redirectPath);
});


// Routing for create alerts for location
router.post('/sign-up-for-alerts/confirm-location', (req, res) => {
  req.session.data['changeAlertLocation'] = req.body['change-alert-location'];

  const redirectPath = req.session.data['changeAlertLocation'] === "same-location"
    ? `/${version}/sign-up-for-alerts/method-of-notification`
    : `/${version}/sign-up-for-alerts/change-alert-location`;

  res.redirect(redirectPath);
});


// Routing for unsubscribe alerts
router.post('/sign-up-for-alerts/unsubscribe-alerts', (req, res) => {
  req.session.data['unsubscribeAlerts'] = req.body['unsubscribe-all-alerts'];

  const redirectPath = req.session.data['unsubscribeAlerts'] === "unsubscribe"
    ? `/${version}/sign-up-for-alerts/unsubscribe-confirmation`
    : `/${version}/sign-up-for-alerts/manage-alerts`;

  res.redirect(redirectPath);
});

//-------------------------------------------------

// Hardcoding the location page so it can be linked to from an email or text notification

// FORECAST MODERATE LEVEL

router.get('/location-moderate', function(req, res) {
  const locationString = req.session.data['locationString'];
  const locationName = req.session.data['locationName'] || 'Missing name';

  const airQuality = {
    today: {
      value: req.query.todayValue || 6,
      readableBand: req.query.todayBand || 'moderate'
    },
    day2: {
      value: req.query.day2Value || 4,
      readableBand: req.query.day2Band || 'moderate'
    },
    day3: {
      value: req.query.day3Value || 3,
      readableBand: req.query.day3Band || 'low'
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


  res.render(version + '/location-moderate', {
    airQuality: airQuality,
    locationName: locationName,
    locationString: locationString,
    monitoringSites: monitoringSites,
    pollutantTypes: pollutantTypes,
    result: result,
    version: version
  });
});

//-------------------------------------------------

// FORECAST HIGH LEVEL 

router.get('/location-high', function(req, res) {
  const locationString = req.session.data['locationString'];
  const locationName = req.session.data['locationName'] || 'Missing name';

  const airQuality = {
    today: {
      value: req.query.todayValue || 8,
      readableBand: req.query.todayBand || 'high'
    },
    day2: {
      value: req.query.day2Value || 9,
      readableBand: req.query.day2Band || 'high'
    },
    day3: {
      value: req.query.day3Value || 8,
      readableBand: req.query.day3Band || 'moderate'
    },
    day4: {
      value: req.query.day4Value || 7,
      readableBand: req.query.day4Band || 'low'
    },
    day5: {
      value: req.query.day5Value || 7,
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

//-------------------------------------------------

// MONITORED HIGH LEVEL 

router.get('/location-breach', function(req, res) {
  const locationString = req.session.data['locationString'];
  const locationName = req.session.data['locationName'] || 'Missing name';

  const airQuality = {
    today: {
      value: req.query.todayValue ||8,
      readableBand: req.query.todayBand || 'high'
    },
    day2: {
      value: req.query.day2Value || 9,
      readableBand: req.query.day2Band || 'moderate'
    },
    day3: {
      value: req.query.day3Value || 8,
      readableBand: req.query.day3Band || 'moderate'
    },
    day4: {
      value: req.query.day4Value || 7,
      readableBand: req.query.day4Band || 'low'
    },
    day5: {
      value: req.query.day5Value || 7,
      readableBand: req.query.day5Band || 'low'
    }
  };

  const result = {
    GAZETTEER_ENTRY: {
      NAME1: locationName
    }
  };


  res.render(version + '/location-breach', {
    airQuality: airQuality,
    locationName: locationName,
    locationString: locationString,
    monitoringSites: monitoringSites,
    pollutantTypes: pollutantTypes,
    result: result,
    version: version
  });
});

//-------------------------------------------------

// FORECAST VERY HIGH LEVEL

router.get('/location-veryhigh', function(req, res) {
  const locationString = req.session.data['locationString'];
  const locationName = req.session.data['locationName'] || 'Missing name';

  const airQuality = {
    today: {
      value: req.query.todayValue || 10,
      readableBand: req.query.todayBand || 'very high'
    },
    day2: {
      value: req.query.day2Value || 10,
      readableBand: req.query.day2Band || 'high'
    },
    day3: {
      value: req.query.day3Value || 10,
      readableBand: req.query.day3Band || 'moderate'
    },
    day4: {
      value: req.query.day4Value || 9,
      readableBand: req.query.day4Band || 'low'
    },
    day5: {
      value: req.query.day5Value || 9,
      readableBand: req.query.day5Band || 'low'
    }
  };

  const result = {
    GAZETTEER_ENTRY: {
      NAME1: locationName
    }
  };


  res.render(version + '/location-veryhigh', {
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


