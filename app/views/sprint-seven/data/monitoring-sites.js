
// Content for monitoring sites

const monitoringSites = [
  
  {
    "site_name": "Plymouth Centre",
    "site_id": "UKA00528",
    "distance": 3.5,
    "site_type": "urban-background",
    "site_type_readable": "Urban background",
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

// Near by monitoring sites


const nearBySites = [
  
    {
      "site_name": "Saltash Callington Road",
      "site_id": "UKA00528",
      "distance": 4.4,
      "site_type": "urban-traffic",
      "site_type_readable": "Urban traffic",
      "band": "Low",
      "aqi": 3
  },
  {
    "site_name": "Plymouth Tavistock Road",
    "site_id": "UKA00528",
    "distance": 5.8,
    "site_type": "urban-traffic",
    "site_type_readable": "Urban traffic",
    "band": "Moderate",
    "aqi": 4
},
{
    "site_name": "Yarner Wood",
    "site_id": "UKA00528",
    "distance": 27.6,
    "site_type": "rural-background",
    "site_type_readable": "Rural background",
    "band": "Low",
    "aqi": 3
},
{
    "site_name": "Exeter Roadside",
    "site_id": "UKA00528",
    "distance": 39.7,
    "site_type": "urban-traffic",
    "site_type_readable": "Urban traffic",
    "band": "Low",
    "aqi": 3
}
]

// Pollutant reference data

const pollutantTypes = {
    "nitrogen-dioxide": {
        "title": "Nitrogen dioxide",
        "href": "/pollutants/nitrogen-dioxide",
        "low_range": "0 to 200",
        "description": "An odourless gas, mainly produced from burning fuels such as wood, petrol, diesel and gas."
    },
    "particulate-matter10": {
        "title": "PM10",
        "href": "/pollutants/particulate-matter10",
        "low_range": "0 to 50",
        "description": "Small particles of solids, mainly from industrial and agricultural activities that produce dust, smoke, and pollen."
    },
    "particulate-matter2": {
        "title": "PM2.5",
        "href": "/pollutants/particulate-matter2",
        "low_range": "0 to 35",
        "description": "Small particles of solids, mainly produced from burning fuel such as wood, petrol, diesel, oil and gas."
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
    "urban-traffic": "This monitoring area is located in a city or a town close to roads, motorways or highways.",
    "urban-industrial": "This monitoring area is located in a city or a town downwind of an industrial source.",
    "suburban-industrial": "This monitoring area is on the outskirts of an urban area or in an area of its own and downwind of an industrial source.",
    "suburban-background": "This monitoring area is on the outskirts of an urban area or in an area of its own. It is located so pollutant measurements do not come from one specific source.",
    "rural-background": "This monitoring area is in small settlements or areas with natural ecosystems, forests or crops. It is located so pollutant measurements do not come from one specific source.",
    "urban-background": "This monitoring area is located in a city or a town. It is located so pollutant measurements do not come from one specific source."
  }

  module.exports = { monitoringSites, siteTypeDescriptions, pollutantTypes, nearBySites };




