const airQualityValues = {
    aqValueToday: "2",
    aqValueDay2: "3",
    aqValueDay3: "4",
    aqValueDay4: "3",
    aqValueDay5: "3"
};

const commonMessages = {
    low: {
        values: [1, 2, 3],
        advice: "Enjoy your usual outdoor activities.",
        atrisk: {
            adults: "Enjoy your usual outdoor activities.",
            asthma: "Enjoy your usual outdoor activities.",
            oldPeople: "Enjoy your usual outdoor activities."
        },
        ukToday: "Strong winds for many areas during today will help to keep air pollution levels low across the whole of the UK.",
        ukTomorrow: "The unsettled weather will continue resulting in low levels of air pollution across the whole of the UK.",
        ukOutlook: "Low levels of air pollution are forecast across the country as unsettled weather conditions continue."
    },
    moderate: {
        values: [4, 5, 6],
        advice: "For most people, short term exposure to moderate levels of air pollution is not an issue.",
        atrisk: {
            adults: "Adults who have heart problems and feel unwell should consider doing less strenuous exercise, especially outside.",
            asthma: "People with asthma should be prepared to use their reliever inhaler.",
            oldPeople: "Older people should consider doing less strenuous activity, especially outside."
        },
        ukToday: "The influx of warm air from the continent is resulting in moderate air pollution levels throughout many areas today.",
        ukTomorrow: "Light winds and warm temperatures could result in moderate air pollution levels throughout many areas tomorrow.",
        ukOutlook: "Strong winds for many areas will help to keep air pollution levels low at the beginning of the period. Later on an influx of warm air from the continent may result in moderate air pollution."
    },
    high: {
        values: [7, 8, 9],
        advice: "Anyone experiencing discomfort such as sore eyes, cough or sore throat should consider reducing activity, particularly outdoors.",
        atrisk: {
            adults: "Adults with heart problems should reduce strenuous physical exertion, particularly outdoors, especially if they experience symptoms.",
            asthma: "People with asthma may find they need to use their reliever inhaler more often.",
            oldPeople: "Older people should reduce physical exertion."
        },
        ukToday: "Warm temperatures are expected to increase pollution levels to high across many areas today.",
        ukTomorrow: "Test tomorrrow",
        ukOutlook: "Test outlook"
    },
    veryHigh: {
        values: [10],
        advice: "Reduce physical exertion, particularly outdoors, especially if you experience symptoms such as cough or sore throat.",
        atrisk: {
            adults: "Adults with heart problems should avoid strenuous physical activity.",
            asthma: "People with asthma may need to use their reliever inhaler more often.",
            oldPeople: "Older people should avoid strenuous physical activity."
        },
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
        "10": { band: "veryHigh", readableBand: "very high" }
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





