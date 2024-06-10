
// Content for monitoring sites

const monitoringSites = [
  {
      "site_name": "Barnsley Gawber",
      "distance": 2.1,
      "site_type": "background-site",
      "pollutants": [
        {
            "type": "ozone",
            "measurement": 41.78,
            "trend": "Rising",
            "band": "Low",
            "aqi": 2,
            "low_range": "0 to 100"
        },
        {
            "type": "nitrogen-dioxide",
            "measurement": 236.67,
            "trend": "Rising",
            "band": "Moderate",
            "aqi": 4,
            "low_range": "0 to 200"
        },
        {
            "type": "sulphur-dioxide",
            "measurement": 208.3,
            "trend": "Steady",
            "band": "Moderate",
            "aqi": 4,
            "low_range": "0 to 200"
        },
        {
            "type": "particulate-matter10",
            "measurement": 6.23,
            "trend": "Falling",
            "band": "Low",
            "aqi": 1,
            "low_range": "0 to 35"
        },
        {
            "type": "particulate-matter2",
            "measurement": 42.12,
            "trend": "Falling",
            "band": "Moderate",
            "aqi": 4,
            "low_range": "0 to 35"
    }
      ]
  },
  {
    "site_name": "Sheffield Barnsley Road",
    "distance": 9.4,
    "site_type": "traffic-site",
    "pollutants": [
        {
            "type": "nitrogen-dioxide",
            "measurement": 219.436,
            "trend": "Rising",
            "band": "Moderate",
            "aqi": 4,
            "low_range": "0 to 200"
        },
        {
            "type": "particulate-matter2",
            "measurement": 37.2,
            "trend": "Falling",
            "band": "Moderate",
            "aqi": 4,
            "low_range": "0 to 35"
    }
    ]
},
  {
      "site_name": "Sheffield Tinsley",
      "distance": 8.8,
      "site_type": "background-site",
      "pollutants": [
        {
            "type": "ozone",
            "measurement": 48.914,
            "trend": "Falling",
            "band": "Low",
            "aqi": 2,
            "low_range": "0 to 100"
        },
        {
            "type": "nitrogen-dioxide",
            "measurement": 259.436,
            "trend": "Rising",
            "band": "Moderate",
            "aqi": 4,
            "low_range": "0 to 200"
        },
        {
            "type": "particulate-matter10",
            "measurement": 8.113,
            "trend": "Falling",
            "band": "Low",
            "aqi": 1,
            "low_range": "0 to 35"
        },
        {
            "type": "particulate-matter2",
            "measurement": 65.2,
            "trend": "Falling",
            "band": "Moderate",
            "aqi": 4,
            "low_range": "0 to 35"
    }
      ]
  }
]

// Pollutant reference data

const pollutantTypes = {
    "nitrogen-dioxide": {
        "title": "Nitrogen dioxide",
        "href": "/pollutants/nitrogen-dioxide",
        "low_range": "0 to 200"
    },
    "particulate-matter10": {
        "title": "PM10",
        "href": "/pollutants/particulate-matter10",
        "low_range": "0 to 50"
    },
    "particulate-matter2": {
        "title": "PM2.5",
        "href": "/pollutants/particulate-matter2",
        "low_range": "0 to 35"
    },
    "ozone": {
        "title": "Ozone",
        "href": "/pollutants/ozone",
        "low_range": "0 to 100"
    },
    "sulphur-dioxide": {
        "title": "Sulphur dioxide",
        "href": "/pollutants/sulphur-dioxide",
        "low_range": "0 to 100"
    }
  };

// Used to populate toggletips on monitoring sites

const siteTypeDescriptions = {
    "urban-site": "This monitoring site is based in an urban area. An urban area is a city or a town, where there are many 2-storey buildings. For the measurement of ozone, an urban area includes parks, residential houses and commercial buildings.",
    "suburban-site": "This monitoring site is based in a suburban location. Suburban areas are located either on their own or on the outskirts of a city or urban area. They are areas of different-sized buildings that may be close to farms, ales and woods.",
    "traffic-site": "This monitoring site is based near vehicle traffic. It is located close to a road, motorway or highway. This means we know that recorded pollutants come from this source.",
    "rural-site": "This monitoring site is in rural location. A rural site can be in a small settlement or area with natural ecosystems, forests or crops. The sites are more than 20 kilometres from cities and towns and more than 5 kilometres away from industrial sites, motorways and major roads.",
    "industrial-site": "This monitoring site is based in an industrial location. The pollutants are measured downwind of the industrial source and the nearest residential area.",
    "background-site": "This monitoring site is based in a background location. It is located to make sure pollutant measurements do not come from one specific source. The site is upwind from pollution sources in cities, industrial sources and rural areas."
  }

  module.exports = { monitoringSites, siteTypeDescriptions, pollutantTypes };




