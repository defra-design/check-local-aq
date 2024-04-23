
// Content for monitoring sites

const monitoringSites = [
  
  {
    "site_name": "Belfast Centre",
    "site_id": "UKA00528",
    "distance": 2.5,
    "site_type": "urban-site",
    "pollutants": [
          {
              "type": "nitrogen-dioxide",
              "measurement": 24.6,
              "trend": "Rising",
              "band": "Low",
              "aqi": 3,
              "svg" : "no-150.svg"
          },
        {
            "type": "particulate-matter10",
            "measurement": 61.23,
            "trend": "Falling",
            "band": "Moderate",
            "aqi": 4,
            "svg" : "pm10-61.svg"
        },
        {
            "type": "particulate-matter2",
            "measurement": 10.8,
            "trend": "Falling",
            "band": "Low",
            "aqi": 3,
            "svg" : "pm25-11.svg"
        }
    ]
},
{
    "site_name": "Belfast Stockman's Lane",
    "site_id": "UKA00503",
    "distance": 4.3,
    "site_type": "traffic-site",
    "pollutants": [
  {
    "type": "ozone",
    "measurement": 39.914,
    "trend": "Rising",
    "band": "Low",
    "aqi": 2
},
{
    "type": "particulate-matter10",
    "measurement": 7.623,
    "trend": "Falling",
    "band": "Low",
    "aqi": 1
},
{
    "type": "particulate-matter2",
    "measurement": 30.2,
    "trend": "Falling",
    "band": "Low",
    "aqi": 3
}
    ]
},

  {
      "site_name": "Ballymena Ballykeel",
      "site_id": "UKA00594",
      "distance": 24.2,
      "site_type": "urban-site",
      "pollutants": [
          {
              "type": "nitrogen-dioxide",
              "measurement": 270.238,
              "trend": "Rising",
              "band": "Moderate",
              "aqi": 5
          },
        {
            "type": "particulate-matter10",
            "measurement": 35.7,
            "trend": "Falling",
            "band": "Low",
            "aqi": 3
        },
      ]
  }
]

// Pollutant reference data

const pollutantTypes = {
    "nitrogen-dioxide": {
        "title": "Nitrogen dioxide",
        "href": "/pollutants/nitrogen-dioxide",
        "low_range": "0 to 200",
        "description": "A colourless gas mainly produced from burning fossil fuels such as petrol, diesel and gas."
    },
    "particulate-matter10": {
        "title": "PM10",
        "href": "/pollutants/particulate-matter10",
        "low_range": "0 to 50",
        "description": "Small particles of solids mainly produced from from dust, soot and smoke from log burners and vehicles."
    },
    "particulate-matter2": {
        "title": "PM2.5",
        "href": "/pollutants/particulate-matter2",
        "low_range": "0 to 35",
        "description": "Small particles of solids mainly produced from from dust, soot and smoke from log burners and vehicles."
    },
    "ozone": {
        "title": "Ozone",
        "href": "/pollutants/ozone",
        "low_range": "0 to 100",
        "description": "Formed in the air from reactions between pollutants and sunlight"
    },
    "sulphur-dioxide": {
        "title": "Sulphur dioxide",
        "href": "/pollutants/sulphur-dioxide",
        "low_range": "0 to 100",
        "description": "A colourless gas with a stroung odour mainly produced from burning fossil fuels such as petrol, diesel and gas."
    }
  };

// Used to populate toggletips on monitoring sites

const siteTypeDescriptions = {
    "urban-site": "This monitoring site is based in an urban area. An urban area is a city or a town, where there are many 2-storey buildings.",
    "suburban-site": "This monitoring site is based in a suburban location. Suburban areas are located either on their own or on the outskirts of a city or urban area. They are areas of different-sized buildings that may be close to farms, ales and woods.",
    "traffic-site": "This monitoring site is based near vehicle traffic. It is located close to a road, motorway or highway. This means we know that recorded pollutants come from this source.",
    "rural-site": "This monitoring site is in rural location. A rural site can be in a small settlement or area with natural ecosystems, forests or crops. The sites are more than 20 kilometres from cities and towns and more than 5 kilometres away from industrial sites, motorways and major roads.",
    "industrial-site": "This monitoring site is based in an industrial location. The pollutants are measured downwind of the industrial source and the nearest residential area.",
    "background-site": "This monitoring site is based in a background location. It is located to make sure pollutant measurements do not come from one specific source. The site is upwind from pollution sources in cities, industrial sources and rural areas."
  }

  module.exports = { monitoringSites, siteTypeDescriptions, pollutantTypes };




