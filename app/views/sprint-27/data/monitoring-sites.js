// Content for monitoring sites

const monitoringSites = [
  
  {
    "site_name": "Maidstone Upper Stone Street",
    "site_id": "UKA00251",
    "distance": 4.3,
    "site_type": "rural-background",
    "pollutants": [

      {
        "type": "particulate-matter2",
        "measurement": 15,
        "trend": "Falling",
        "band": "Low",
          "aqi": 3
        },
        {
          "type": "particulate-matter10",
          "measurement": 23,
          "trend": "Falling",
          "band": "Low",
          "aqi": 3
        },
        {
          "type": "nitrogen-dioxide",
          "measurement": 	7,
          "trend": "Rising",
          "band": "Low",
          "aqi": 3
        },
        {
          "type": "ozone",
          "measurement": 	103,
          "trend": "Rising",
          "band": "Moderate",
          "aqi": 5
        }
    
    ]
},
{
    "site_name": "Rochester Stoke",
    "site_id": "UKA00253",
    "distance": 16.8,
    "site_type": "rural-background",
    "pollutants": [        
      {
      "type": "particulate-matter2",
      "measurement": 10,
      "trend": "Falling",
      "band": "Low",
        "aqi": 3
      },
      {
        "type": "particulate-matter10",
        "measurement": 19,
        "trend": "Falling",
        "band": "Low",
        "aqi": 3
      },
      {
      "type": "nitrogen-dioxide",
      "measurement": 	12,
      "trend": "Rising",
      "band": "Low",
      "aqi": 3
      },
       {
        "type": "ozone",
        "measurement": 	103,
        "trend": "Rising",
        "band": "Moderate",
        "aqi": 5
      }/* , 
      {
        "type": "sulphur-dioxide",
        "measurement": 	1,
        "trend": "Rising",
        "band": "Low",
        "aqi": 3
      } */
      
    ]
}
]

// Pollutant reference data

const pollutantTypes = {
    "nitrogen-dioxide": {
        "title": "Nitrogen dioxide",
        "href": "/pollutants/nitrogen-dioxide",
        "low_range": "0 to 200",
        "description": "Sources include industrial burning of fossil fuels"
    },
    "particulate-matter10": {
        "title": "PM10",
        "href": "/pollutants/particulate-matter10",
        "low_range": "0 to 50",
        "description": "Sources include domestic and industrial burning of fossil fuels"
    },
    "particulate-matter2": {
        "title": "PM2.5",
        "href": "/pollutants/particulate-matter2",
        "low_range": "0 to 35",
        "description": "Dust, soot and smoke from log burners, vehicles and farming"
    },
    "ozone": {
        "title": "Ozone",
        "href": "/pollutants/ozone",
        "low_range": "0 to 100",
        "description": "Created by reactions between pollutants and sunlight"
    },
    "sulphur-dioxide": {
        "title": "Sulphur dioxide",
        "href": "/pollutants/sulphur-dioxide",
        "low_range": "0 to 100",
        "description": "Sources include the burning of fossil fuels"
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

  module.exports = { monitoringSites, siteTypeDescriptions, pollutantTypes };