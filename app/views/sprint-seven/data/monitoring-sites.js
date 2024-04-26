
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
              "measurement": 8,
              "trend": "Rising",
              "band": "Low",
              "aqi": 3,
              "chart" : "nitrogen"
          },
        {
            "type": "particulate-matter10",
            "measurement": 54.3,
            "trend": "Falling",
            "band": "Moderate",
            "aqi": 4,
            "chart" : "pm10"
        },
        {
            "type": "particulate-matter2",
            "measurement": 8.3,
            "trend": "Falling",
            "band": "Low",
            "aqi": 3,
            "chart" : "pm2-5"
        }
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
    "urban-site": "Urban monitoring sites are located in a city or a town, which can include parks, residential houses and commercial buildings.",
    "suburban-site": "Suburban monitoring sites can be on the outskirts of an urban area or in an area of their own. They will have buildings and may be close to farms, lakes and woods.",
    "traffic-site": "Traffic monitoring sites are located close to roads, motorways or highways. This means that recorded pollutants will mainly come from nearby traffic.",
    "rural-site": "Rural monitoring sites are in small settlements or areas with natural ecosystems, forests or crops. The sites are away from cities, towns, industrial sites and major roads.",
    "industrial-site": "Industrial monitoring sites measure pollutants downwind of an industrial source and the nearest residential area.",
    "background-site": "Background monitoring sites are located so pollutant measurements do not come from one specific source. The sites are upwind from pollution sources in cities, industrial sources and rural areas. "
  }

  module.exports = { monitoringSites, siteTypeDescriptions, pollutantTypes };




