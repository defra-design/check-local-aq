//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters


const govukPrototypeKit = require('govuk-prototype-kit');
const addFilter = govukPrototypeKit.views.addFilter;
const moment = require('moment');

function formatCalendarWithLowercase(momentDate) {
    const calendarString = momentDate.calendar();
    return calendarString.replace(/ ([AP])M/, '$1m');
}

addFilter('date', function(dateString) {
    if (dateString === 'now') {
        return moment();
    }
    return moment(dateString);
});

addFilter('minusOneHour', function(momentDate) {
    momentDate.subtract(1.56, 'hours');
    return formatCalendarWithLowercase(momentDate);
});


addFilter('addDaysToTodayAbrev', function(daysToAdd) {
    // Default to 0 if daysToAdd is not provided or is not a number
    if (typeof daysToAdd !== 'number') {
        daysToAdd = 0;
    }

    // Create a new moment object for today and add days
    let futureDate = moment().add(daysToAdd, 'days');

    // Return the formatted future date
    return futureDate.format('ddd');
});

addFilter('addDaysToTodayFull', function(daysToAdd) {
    // Default to 0 if daysToAdd is not provided or is not a number
    if (typeof daysToAdd !== 'number') {
        daysToAdd = 0;
    }

    // Create a new moment object for today and add days
    let futureDate = moment().add(daysToAdd, 'days');

    // Return the formatted future date
    return futureDate.format('dddd');
});







