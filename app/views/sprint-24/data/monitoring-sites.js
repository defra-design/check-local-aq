// Content for monitoring sites

const monitoringSites = [
  
  {
    "site_name": "Liverpool Speke",
    "site_id": "UKA00579",
    "distance": 1.1,
    "site_type": "urban-industrial",
    "pollutants": [

      {
        "type": "particulate-matter2",
        "measurement": 12,
        "trend": "Falling",
        "band": "Low",
          "aqi": 3
        },
        {
          "type": "particulate-matter10",
          "measurement": 16,
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
        } 
    
    ]
},
{
    "site_name": "Widnes Milton Road",
    "site_id": "UKA00152",
    "distance": 6.6,
    "site_type": "urban-traffic",
    "pollutants": [        
       {
      "type": "particulate-matter2",
      "measurement": 16,
      "trend": "Falling",
      "band": "Low",
        "aqi": 3
      }, 
      {
        "type": "particulate-matter10",
        "measurement": 18,
        "trend": "Falling",
        "band": "Low",
        "aqi": 3
      },
       {
        "type": "ozone",
        "measurement": 	63,
        "trend": "Rising",
        "band": "Low",
        "aqi": 3
      },
      
    {
      "type": "nitrogen-dioxide",
      "measurement": 	23,
      "trend": "Rising",
      "band": "Low",
      "aqi": 3
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