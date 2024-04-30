const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

require('./views/private-beta/_route.js');
require('./views/post-mvp/_route.js');
require('./views/sprint-seven/_route.js');
require('./views/sprint-six/_route.js');
require('./views/sprint-five/_route.js');
require('./views/sprint-four/_route.js');



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

