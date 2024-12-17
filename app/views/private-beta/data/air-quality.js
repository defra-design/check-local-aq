const commonMessages = {
    low: {
        values: [1, 2, 3],
        outlook: "The current spell of unsettled weather will continue, helping to keep air pollution levels low across the UK during today."
    },
    moderate: {
        values: [4, 5, 6],
        outlook: "The influx of warm air from the continent is resulting in moderate air pollution levels throughout many areas today."
    },
    high: {
        values: [7, 8, 9],
        outlook: "Warm temperatures are expected to increase pollution levels to high across many areas today."
    },
    veryHigh: {
        values: [10],
        outlook: "The current heatwave shows no signs of relenting, causing air pollution levels to remain very high across many areas today."
    },
    unknown: {
        advice: "No data available."
    }
};

function getCommonMessage(band) {
    return commonMessages[band] || commonMessages.unknown;
}

function getAirQuality(aqValue) {
    const value = aqValue || "5"; // Default value

    const lookup = {
        "1": { band: "low", readableBand: "low" },
        "2": { band: "low", readableBand: "low" },
        "3": { band: "low", readableBand: "low" },
        "4": { band: "moderate", readableBand: "moderate" },
        "5": { band: "moderate", readableBand: "moderate" },
        "6": { band: "moderate", readableBand: "moderate" },
        "7": { band: "high", readableBand: "high" },
        "8": { band: "high", readableBand: "high" },
        "9": { band: "high", readableBand: "high" },
        "10": { band: "veryHigh", readableBand: "very high" }
    };

 
    const bandInfo = lookup[value] || { band: "unknown", readableBand: "unknown" };
    const band = bandInfo.band;
    const readableBand = bandInfo.readableBand; 

    const message = getCommonMessage(band);

    return {
        value: value,
        band: band,
        readableBand: readableBand, // Now readableBand is defined
        advice: message.advice,
        atrisk: message.atrisk,
        outlook: message.outlook
    };
};

module.exports = {
    getAirQuality,
    getCommonMessage,
    commonMessages 
};

