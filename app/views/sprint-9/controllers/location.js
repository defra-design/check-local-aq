const axios = require('axios');
const airQualityModule = require('../data/air-quality.js');
const { monitoringSites, siteTypeDescriptions, pollutantTypes } = require('../data/monitoring-sites.js');
const apiKey = process.env.OS_API_KEY;

exports.getLocationData = async (req, res, version) => {
    try {
        const locationType = req.body.locationType;
        let originalUserLocation = '';
        if (locationType === 'uk-location') {
            originalUserLocation = req.body.engScoWal;
        } else if (locationType === 'ni-location') {
            originalUserLocation = req.body.ni;
        }

        if (!originalUserLocation) {
            return res.render('/' + version + '/enter-location', { locationType: locationType });
        }

        let userLocation = originalUserLocation.trim().toUpperCase();
        const fullPostcodePattern = /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/;
        const partialPostcodePattern = /^([A-Z]{1,2}\d[A-Z\d]?)$/;

        if (fullPostcodePattern.test(userLocation) && !userLocation.includes(' ')) {
            const spaceIndex = userLocation.length - 3;
            userLocation = `${userLocation.slice(0, spaceIndex)} ${userLocation.slice(spaceIndex)}`;
        }

        const { aqValueToday, aqValueDay2, aqValueDay3, aqValueDay4, aqValueDay5 } = airQualityModule.airQualityValues;
        const airQuality = airQualityModule.getAirQuality(aqValueToday, aqValueDay2, aqValueDay3, aqValueDay4, aqValueDay5);

        // Get the highest AQ details
        const highestAQDetails = airQualityModule.getHighestAQDetails(aqValueToday, aqValueDay2, aqValueDay3, aqValueDay4, aqValueDay5);

        if (locationType === 'uk-location') {
            let filters = [
                'LOCAL_TYPE:City',
                'LOCAL_TYPE:Town',
                'LOCAL_TYPE:Village',
                'LOCAL_TYPE:Hamlet',
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

            let matches = results.filter(item => item.GAZETTEER_ENTRY.NAME1.toUpperCase().includes(userLocation) || userLocation.includes(item.GAZETTEER_ENTRY.NAME1.toUpperCase()));
            matches = matches.map(match => {
                const populatedPlaceType = match.GAZETTEER_ENTRY.POPULATED_PLACE_TYPE
                    ? match.GAZETTEER_ENTRY.POPULATED_PLACE_TYPE.split('#')[1]
                    : null;

                const localType = match.GAZETTEER_ENTRY.LOCAL_TYPE === 'Postcode' && populatedPlaceType
                    ? populatedPlaceType
                    : match.GAZETTEER_ENTRY.LOCAL_TYPE;

                return {
                    ...match,
                    localType: localType ? localType.toLowerCase() : 'unknown',
                    region: match.GAZETTEER_ENTRY.REGION || 'Unknown'
                };
            });

            req.session.locationData = matches;

            if (matches.length === 1) {
                res.render('/' + version + '/location', {
                    result: matches[0],
                    localType: matches[0].localType,
                    region: matches[0].region,
                    airQuality: airQuality,
                    highestAQDetails: highestAQDetails,
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
                    highestAQDetails: highestAQDetails,
                    airQualityData: airQualityModule.commonMessages,
                    monitoringSites: monitoringSites,
                    siteTypeDescriptions: siteTypeDescriptions,
                    pollutantTypes: pollutantTypes
                });
            } else {
                res.render('/' + version + '/location-not-found', { userLocation: originalUserLocation });
            }
        } else if (locationType === 'ni-location') {
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
                    DISTRICT_BOROUGH: result[0].admin_district,
                    REGION: result[0].region || 'Unknown'  // Adding region for NI locations, though API might need checking
                }
            };

            res.render('/' + version + '/location', {
                result: locationData,
                region: locationData.GAZETTEER_ENTRY.REGION,
                airQuality: airQuality,
                highestAQDetails: highestAQDetails,
                airQualityData: airQualityModule.commonMessages,
                monitoringSites: monitoringSites,
                siteTypeDescriptions: siteTypeDescriptions,
                pollutantTypes: pollutantTypes
            });
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
      const { aqValueToday, aqValueDay2, aqValueDay3, aqValueDay4, aqValueDay5 } = airQualityModule.airQualityValues;
      const airQuality = airQualityModule.getAirQuality(aqValueToday, aqValueDay2, aqValueDay3, aqValueDay4, aqValueDay5);
      const highestAQDetails = airQualityModule.getHighestAQDetails(aqValueToday, aqValueDay2, aqValueDay3, aqValueDay4, aqValueDay5);

      res.render('/' + version + '/location', {
        result: locationDetails,
        airQuality: airQuality,
        highestAQDetails: highestAQDetails,
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
