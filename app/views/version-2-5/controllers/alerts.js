const alerts = require('../data/current-alerts.js');  // Import the alerts data

exports.getAlerts = (req, res, version) => {
  const activeCount = alerts.filter(alert => alert.status === 'active').length;
  const expiredCount = alerts.filter(alert => alert.status === 'expired').length;
  
  res.render('/' + version + '/alerts', { alerts, activeCount, expiredCount });
};

exports.getAlertBySlug = (req, res, version) => {
    const { slug } = req.params;
    const alert = alerts.find(alert => alert.slug === slug);
  
    if (alert) {
      res.render('/'+ version + '/alert', { alert, version });
    } else {
      res.status(404).render(version + '/alert-not-found', { error: 'Alert not found' });
    }
  };