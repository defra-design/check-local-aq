const airQualityValues = {
    aqValueToday: "3",
    aqValueDay2: "2",
    aqValueDay3: "3",
    aqValueDay4: "2",
    aqValueDay5: "1"
};

const commonMessages = {
    low: {
        values: [1, 2, 3],
        ukToday: "Strong winds for many areas during today will help to keep air pollution levels low across the whole of the UK.",
        ukTomorrow: "The unsettled weather will continue resulting in low levels of air pollution across the whole of the UK.",
        ukOutlook: "The air pollution outlook will remain low throughout the period."
    },
    moderate: {
        values: [4, 5, 6],
        ukToday: "The influx of warm air from the continent is resulting in moderate air pollution levels throughout many areas today.",
        ukTomorrow: "Light winds and warm temperatures could result in moderate air pollution levels throughout many areas tomorrow.",
        ukOutlook: "Strong winds for many areas will help to keep air pollution levels low at the beginning of the period. Later on an influx of warm air from the continent may result in moderate air pollution."
    },
    high: {
        values: [7, 8, 9],
        ukToday: "Warm temperatures are expected to increase pollution levels to high across many areas today.",
        ukTomorrow: "The current heatwave shows no signs of relenting, causing air pollution levels to remain high across many areas tomorrow.",
        ukOutlook: "As unsettled weather returns, the air pollution outlook will likely return to low levels."
    },
    veryHigh: {
        values: [10],
        ukToday: "The current heatwave shows no signs of relenting, causing air pollution levels to remain very high across many areas today.",
        ukTomorrow: "Test tomorrrow",
        ukOutlook: "Test outlook"
        
    },
    unknown: {
        advice: "No data available."
    }
};

// Function to get common messages based on the air quality band
function getCommonMessage(band) {
    return commonMessages[band] || commonMessages.unknown;
}

// Function for getting detailed air quality information and advice
function getDetailedInfo(aqValue) {
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
        "10": { band: "veryhigh", readableBand: "very high" }
    };

    const bandInfo = lookup[aqValue.toString()] || { band: "unknown", readableBand: "unknown" };
    const message = getCommonMessage(bandInfo.band);
    return {
        value: aqValue,
        band: bandInfo.band,
        readableBand: bandInfo.readableBand,
        advice: message.advice,
        atrisk: message.atrisk,
        ukToday: message.ukToday, // Consider updating these messages to be relevant for each day
        ukTomorrow: message.ukTomorrow,
        ukOutlook: message.ukOutlook
    };
}

// Function to get air quality labelling for today and the next 4 days
function getAirQuality(aqValueToday, aqValueDay2, aqValueDay3, aqValueDay4, aqValueDay5) {
    return {
        today: getDetailedInfo(aqValueToday),
        day2: getDetailedInfo(aqValueDay2),
        day3: getDetailedInfo(aqValueDay3),
        day4: getDetailedInfo(aqValueDay4),
        day5: getDetailedInfo(aqValueDay5)
    };
}

// Function for determining the highest air quality value
function getHighestAQDetails(aqValueToday, aqValueDay2, aqValueDay3, aqValueDay4, aqValueDay5) {
    const highestAQValue = Math.max(aqValueToday, aqValueDay2, aqValueDay3, aqValueDay4, aqValueDay5);
    return getAirQuality(highestAQValue, highestAQValue, highestAQValue, highestAQValue, highestAQValue).today; 
}

module.exports = {
    getAirQuality,
    getCommonMessage,
    commonMessages,
    airQualityValues,
    getHighestAQDetails
};





