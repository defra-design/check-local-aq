const axios = require('axios');
const { getAirQuality } = require('../data/air-quality.js');
const airQualityData = require('../data/air-quality.js');
const { monitoringSites, siteTypeDescriptions, pollutantTypes } = require('../data/monitoring-sites.js');
const apiKey = process.env.OS_API_KEY;

exports.getLocationData = async (req, res, version) => {
  try {
    // Determine location type: UK or NI
    const locationType = req.body.locationType;
    let originalUserLocation = '';
    if (locationType === 'uk-location') {
      originalUserLocation = req.body.engScoWal.trim();
    } else if (locationType === 'ni-location') {
      originalUserLocation = req.body.ni.trim();
    }

    if (!originalUserLocation) {
      return res.render('/' + version + '/enter-location', { locationType: locationType });
    }

    let userLocation = originalUserLocation.toUpperCase();
    const fullPostcodePattern = /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/;
    const partialPostcodePattern = /^([A-Z]{1,2}\d[A-Z\d]?)$/;

    if (fullPostcodePattern.test(userLocation) && !userLocation.includes(' ')) {
      const spaceIndex = userLocation.length - 3;
      userLocation = `${userLocation.slice(0, spaceIndex)} ${userLocation.slice(spaceIndex)}`;
    }

    const airQuality = getAirQuality(req.body.aq);

    if (locationType === 'uk-location') {
      // UK location search logic using OS API
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
          airQualityData: airQualityData.commonMessages,
          monitoringSites: monitoringSites,
          siteTypeDescriptions: siteTypeDescriptions,
          pollutantTypes: pollutantTypes
        });
      } else if (matches.length > 1) {
        res.render('/' + version + '/multiple_locations', {
          results: matches,
          userLocation: originalUserLocation,
          airQuality: airQuality,
          airQualityData: airQualityData.commonMessages,
          monitoringSites: monitoringSites,
          siteTypeDescriptions: siteTypeDescriptions,
          pollutantTypes: pollutantTypes
        });
      }
    } else if (locationType === 'ni-location') {
      // NI location search logic using postcodes.io API
      const postcodeApiUrl = `https://api.postcodes.io/postcodes?q=${encodeURIComponent(userLocation)}`;
      const response = await axios.get(postcodeApiUrl);
      const { result } = response.data;
    
      if (!result || result.length === 0) {
        res.render('/' + version + '/location-not-found', { userLocation: originalUserLocation });
        return;
      }
    
      const locationData = {
        GAZETTEER_ENTRY: {
          NAME1: result[0].postcode,
          DISTRICT_BOROUGH: result[0].admin_district
        }
      };
    
      res.render('/' + version + '/location', {
        result: locationData,
        airQuality: airQuality,
        airQualityData: airQualityData.commonMessages,
        monitoringSites: monitoringSites,
        siteTypeDescriptions: siteTypeDescriptions,
        pollutantTypes: pollutantTypes
      });
    }
  } catch (error) {
    console.error('Error retrieving location details:', error);
    res.status(500).render('error', { error: 'An error occurred while retrieving location details.' });
  }
};

exports.getLocationDetails = (req, res, version) => {
  try {
    const locationId = req.params.id;
    const locationData = req.session.locationData || [];
    const locationDetails = locationData.find(item => item.GAZETTEER_ENTRY.ID === locationId);

    if (locationDetails) {
      const airQuality = getAirQuality(/* Retrieved from session or another source */);
      res.render('/' + version + '/location', {
        result: locationDetails,
        airQuality: airQuality,
        airQualityData: airQualityData.commonMessages,
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