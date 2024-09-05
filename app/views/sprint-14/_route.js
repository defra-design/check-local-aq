const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter('/sprint-14');
const locationController = require('./controllers/location.js'); 
const airQualityModule = require('./data/air-quality.js');
const alertsController = require('./controllers/alerts.js');
const { monitoringSites, siteTypeDescriptions } = require('./data/monitoring-sites.js');  

const version = 'sprint-14';

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
  const localAuthority = req.query.localAuthority;
  const locationString = `${locationName}, ${localAuthority}`;

  // Store the locationString in the session
  req.session.data['locationString'] = locationString;
  req.session.data['locationName'] = locationName;
  req.session.data['localAuthority'] = localAuthority;

  res.render(version + '/sign-up-for-alerts/confirm-location', {
    locationName: locationName,
    localAuthority: localAuthority,
    locationString: locationString
  });
});


router.post('/sign-up-for-alerts/type-of-notifications', function(req, res) {
  const selectedOption = req.body.where;

  if (selectedOption === '/' + version + '/sign-up-for-alerts/type-of-notifications') {
    const locationString = req.session.data['locationString'];
    req.session.data['locationString'] = locationString;
    res.redirect(selectedOption);
  } else if (selectedOption === '/' + version + '/sign-up-for-alerts/where-do-you-want-alerts-for') {
    res.redirect(selectedOption);
  } 
});

router.post('/sign-up-for-alerts/method-of-notification', function(req, res) {
  let selectedNotifications = req.body['air-quality-alerts'];

  if (!Array.isArray(selectedNotifications)) {
    selectedNotifications = selectedNotifications ? [selectedNotifications] : [];
  }
  selectedNotifications = selectedNotifications.filter(notification => !notification.includes('_unchecked'));

  req.session.data['selectedNotifications'] = selectedNotifications;

  res.redirect('/' + version + '/sign-up-for-alerts/method-of-notification');
});


router.post('/sign-up-for-alerts/check-your-email', function(req, res) {
  const contactMethod = req.body.contact;

  req.session.data['contactMethod'] = contactMethod;

  if (contactMethod === 'email') {
    req.session.data['notifyByEmail'] = req.body.notifyByEmail;
    res.redirect('/' + version + '/sign-up-for-alerts/check-your-email');
  } else if (contactMethod === 'text') {
    req.session.data['notifyByText'] = req.body.notifyByText;
    res.redirect('/' + version + '/sign-up-for-alerts/check-your-messages');
  } 
});



router.get('/sign-up-for-alerts/check-your-email', function(req, res) {
  const email = req.session.data['notifyByEmail'];
  const locationString = req.session.data['locationString'];
  const selectedNotifications = req.session.data['selectedNotifications']; 
  
  res.render(version + '/sign-up-for-alerts/check-your-email', {
    email: email,
    locationString: locationString,
    selectedNotifications: selectedNotifications,
  });
});

router.get('/sign-up-for-alerts/confirm-email', function(req, res) {
  const email = req.session.data['notifyByEmail'];
  const locationString = req.session.data['locationString'];
  const selectedNotifications = req.session.data['selectedNotifications']; 
  
  res.render(version + '/sign-up-for-alerts/confirm-email', {
    email: email,
    locationString: locationString,
    selectedNotifications: selectedNotifications,
  });
});

router.get('/sign-up-for-alerts/confirmation', function(req, res) {
  const email = req.session.data['notifyByEmail'];
  const locationString = req.session.data['locationString'];
  const selectedNotifications = req.session.data['selectedNotifications']; 
  
  res.render(version + '/sign-up-for-alerts/confirmation', {
    email: email,
    locationString: locationString,
    selectedNotifications: selectedNotifications,
  });
});

router.get('/sign-up-for-alerts/check-details', function(req, res) {
  const email = req.session.data['notifyByEmail'];
  const locationString = req.session.data['locationString'];
  const selectedNotifications = req.session.data['selectedNotifications']; 
  
  res.render(version + '/sign-up-for-alerts/check-details', {
    email: email,
    locationString: locationString,
    selectedNotifications: selectedNotifications,
  });
});

router.get('/sign-up-for-alerts/confirmation-email', function(req, res) {
  const email = req.session.data['notifyByEmail'];
  const locationString = req.session.data['locationString'];
  const selectedNotifications = req.session.data['selectedNotifications']; 
  
  res.render(version + '/sign-up-for-alerts/confirmation-email', {
    email: email,
    locationString: locationString,
    selectedNotifications: selectedNotifications,
  });
});

router.get('/sign-up-for-alerts/email-alert/:status', function(req, res) {
  const locationString = req.session.data['locationString'];
  const status = req.params.status; 

  res.render(version + '/sign-up-for-alerts/email-alert', {
    locationString: locationString,
    status: status  
  });
});


router.get('/location-forecast', function(req, res) {
  const locationName = req.session.data['locationName'] || 'Missing name';
  const localAuthority = req.session.data['localAuthority'] || 'Missing name';

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
      value: req.query.day3Value || 4,
      readableBand: req.query.day3Band || 'moderate'
    },
    day4: {
      value: req.query.day4Value || 5,
      readableBand: req.query.day4Band || 'moderate'
    },
    day5: {
      value: req.query.day5Value || 3,
      readableBand: req.query.day5Band || 'low'
    }
  };

  const result = {
    GAZETTEER_ENTRY: {
      NAME1: locationName,
      COUNTY_UNITARY: localAuthority
    }
  };

  res.render(version + '/location-forecast', {
    airQuality: airQuality,
    result: result,
    monitoringSites: monitoringSites, // Pass monitoring sites here
    version: version
  });
});


module.exports = router;


