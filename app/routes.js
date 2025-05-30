const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

require('./views/private-beta/_route.js');
require('./views/private-beta-fixes/_route.js');
require('./views/proto-dev/_route.js');
require('./views/sprint-25/_route.js');
require('./views/sprint-24/_route.js');
require('./views/sprint-23/_route.js');
require('./views/sprint-22/_route.js');
require('./views/sprint-21/_route.js');
require('./views/sprint-16/_route.js');
require('./views/sprint-15/_route.js');
require('./views/sprint-14/_route.js');
require('./views/sprint-13/_route.js');
require('./views/sprint-10/_route.js');
require('./views/sprint-9/_route.js');
require('./views/post-mvp/_route.js');
require('./views/post-mvp-fixes/_route.js');
require('./views/sprint-8/_route.js');
require('./views/sprint-6/_route.js');
require('./views/sprint-5/_route.js');
require('./views/sprint-4/_route.js');



// GET SPRINT NAME - useful for relative templates
router.use('/', (req, res, next) => {
  res.locals.currentURL = req.originalUrl; //current screen
  res.locals.prevURL = req.get('Referrer'); // previous screen
  req.folder = req.originalUrl.split('/')[1]; //folder, e.g. 'current'
  req.subfolder = req.originalUrl.split('/')[2]; //sub-folder e.g. 'service'
  res.locals.folder = req.folder; // what folder the URL is in
  res.locals.subfolder = req.subfolder; // what subfolder the URL is in
  next();
});

module.exports = router;

