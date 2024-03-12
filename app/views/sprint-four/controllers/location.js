

const axios = require('axios');
const airQualityModule = require('../data/air-quality.js');
const { monitoringSites, siteTypeDescriptions, pollutantTypes } = require('../data/monitoring-sites.js');
const apiKey = process.env.OS_API_KEY;

exports.getLocationData = async (req, res, version) => {
  try {
    const originalUserLocation = req.body.location.trim();
    let userLocation = originalUserLocation.toUpperCase();

    const fullPostcodePattern = /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/;
    const partialPostcodePattern = /^([A-Z]{1,2}\d[A-Z\d]?)$/;

    if (fullPostcodePattern.test(userLocation) && !userLocation.includes(' ')) {
      const spaceIndex = userLocation.length - 3;
      userLocation = `${userLocation.slice(0, spaceIndex)} ${userLocation.slice(spaceIndex)}`;
    }

    if (!userLocation) {
      return res.status(400).redirect('/' + version + '/enter-location');
    }

    // Use imported air quality values
    const { aqValueToday, aqValueTomorrow, aqValueOutlook } = airQualityModule.airQualityValues;
    const airQuality = airQualityModule.getAirQuality(aqValueToday, aqValueTomorrow, aqValueOutlook);

    let filters = [
      'LOCAL_TYPE:City',
      'LOCAL_TYPE:Town',
      'LOCAL_TYPE:Village',
      'LOCAL_TYPE:Suburban_Area',
      'LOCAL_TYPE:Postcode',
      'LOCAL_TYPE:Airport'
    ].join('+');

    const apiUrl = `https://api.os.uk/search/names/v1/find?query=${encodeURIComponent(userLocation)}&fq=${encodeURIComponent(filters)}&key=${apiKey}`;
    const response = await axios.get(apiUrl);
    const { results } = response.data;

    if (!results || results.length === 0) {
      res.render('/' + version + '/location-not-found', { userLocation: originalUserLocation });
      return;
    }

    let matches = results.filter(item => {
      const name = item.GAZETTEER_ENTRY.NAME1.toUpperCase();
      return name.includes(userLocation) || userLocation.includes(name);
    });

    if (partialPostcodePattern.test(originalUserLocation) && matches.length > 0) {
      matches[0].GAZETTEER_ENTRY.NAME1 = originalUserLocation.toUpperCase();
      matches = [matches[0]];
    }

    req.session.locationData = matches;

    if (matches.length === 1) {
      res.render('/' + version + '/location', {
        result: matches[0],
        airQuality: airQuality,
        airQualityData: airQualityModule.commonMessages,
        monitoringSites: monitoringSites,
        siteTypeDescriptions: siteTypeDescriptions,
        pollutantTypes: pollutantTypes
      });
    } else if (matches.length > 1) {
      res.render('/' + version + '/multiple_locations', {
        results: matches,
        userLocation: originalUserLocation,
        airQuality: airQuality,
        airQualityData: airQualityModule.commonMessages,
        monitoringSites: monitoringSites,
        siteTypeDescriptions: siteTypeDescriptions,
        pollutantTypes: pollutantTypes
      });
    } else {
      res.render('/' + version + '/location-not-found', { userLocation: originalUserLocation });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).render('error', { error: 'An error occurred while fetching location data.' });
  }
};

exports.getLocationDetails = (req, res, version) => {
  try {
    const locationId = req.params.id;
    const locationData = req.session.locationData || [];
    const locationDetails = locationData.find(item => item.GAZETTEER_ENTRY.ID === locationId);

    if (locationDetails) {
      // Use imported air quality values
      const { aqValueToday, aqValueTomorrow, aqValueOutlook } = airQualityModule.airQualityValues;
      const airQuality = airQualityModule.getAirQuality(aqValueToday, aqValueTomorrow, aqValueOutlook);

      res.render('/' + version + '/location', {
        result: locationDetails,
        airQuality: airQuality,
        airQualityData: airQualityModule.commonMessages,
        monitoringSites: monitoringSites,
        siteTypeDescriptions: siteTypeDescriptions,
        pollutantTypes: pollutantTypes
      });
    } else {
      res.render('/' + version + '/location-not-found');
    }
  } catch (error) {
    console.error('Error retrieving location details:', error);
    res.status(500).render('error', { error: 'An error occurred while retrieving location details.' });
  }
};
``
