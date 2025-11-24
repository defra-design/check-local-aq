
// Content for monitoring sites

const monitoringSites = [
  
  {
    "site_name": "Swansea Roadside",
    "site_id": "UKA00594",
    "distance": 2.8,
    "site_type": "urban-traffic",
    "site_band": "Low",
    "site_aqi": 3
},
  {
    "site_name": "Port Talbot Margam",
    "site_id": "UKA00212",
    "distance": 7.2,
    "site_type": "urban-industrial",
    "site_band": "Moderate",
    "site_aqi": 5
}

]



// Used to populate toggletips on monitoring sites

const siteTypeDescriptions = {
    "urban-traffic": "This monitoring area is located in a city or a town close to roads, motorways or highways.",
    "urban-industrial": "This monitoring area is located in a city or a town downwind of an industrial source.",
    "suburban-industrial": "This monitoring area is on the outskirts of an urban area or in an area of its own and downwind of an industrial source.",
    "suburban-background": "This monitoring area is on the outskirts of an urban area or in an area of its own. It is located so pollutant measurements do not come from one specific source.",
    "rural-background": "This monitoring area is in small settlements or areas with natural ecosystems, forests or crops. It is located so pollutant measurements do not come from one specific source.",
    "urban-background": "This monitoring area is located in a city or a town. It is located so pollutant measurements do not come from one specific source."
  }

  module.exports = { monitoringSites, siteTypeDescriptions};




