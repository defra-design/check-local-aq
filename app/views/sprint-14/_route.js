const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter('/sprint-14');
const locationController = require('./controllers/location.js'); 
const airQualityModule = require('./data/air-quality.js');
const alertsController = require('./controllers/alerts.js');  

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



module.exports = router;


