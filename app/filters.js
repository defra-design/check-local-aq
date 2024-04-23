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


addFilter('minusHours', function(momentDate, hours) {
    // Subtract the specified number of hours
    momentDate.subtract(hours, 'hours');

    momentDate.minutes(0);
    momentDate.seconds(0);
    momentDate.milliseconds(0);

    return formatCustomDate(momentDate);
});

function formatCustomDate(momentDate) {
    const now = moment();
    const today = now.startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');
    
    let prefix;

    if (momentDate.isSame(today, 'day')) {
        prefix = 'today';
    } else if (momentDate.isSame(yesterday, 'day')) {
        prefix = 'yesterday';
    } else {
        // Format as "Last Monday" if not today or yesterday
        prefix = momentDate.format('[Last] dddd');
    }

    // Check if minutes are 0 and format time accordingly
    const formatString = momentDate.minutes() === 0 ? 'hA' : 'h:mmA';
    const time = momentDate.format(formatString).toLowerCase();

    return `${time}, ${prefix}`; // Reordered to show time first
}




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







