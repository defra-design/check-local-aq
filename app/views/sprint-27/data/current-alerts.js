const alerts = [
  {
    stationName: "London Westminster",
    slug: 'london-westminster',
    localAuthority: "Greater London",
    mapUrl: "https://maps.app.goo.gl/6ic2LJXG1ZqTBYFaA",
    timeStamp: "07:00",
    date: "2025-06-30",
    pollutant: {
      title: "Nitrogen dioxide",
      slug: "nitrogen-dioxide",
      maxLevel: 478,
      currentLevel: 418,
      threshold: 400,
      method: "Measured consecutively over 3 hours"
    },
    status: "active"
  },
  {
    stationName: "Bush Estate",
    slug: 'bush-estate',
    localAuthority: "Midlothian",
    mapUrl: "https://maps.app.goo.gl/vACXQPF6uAcxoEwr8",
    timeStamp: "23:00",
    date: "2025-06-30",
    pollutant: {
      title: "ozone",
      slug: "ozone",
      maxLevel: 310,
      currentLevel: 280,
      threshold: 300,
      method: "Measured over an hour"
    },
    status: "active"
  },
  {
    stationName: "Doncaster A630 Cleveland Street",
    slug: 'doncaster-a630-cleveland-street',
    localAuthority: "Doncaster",
    mapUrl: "https://maps.app.goo.gl/MJS4u4TMifcB1HbF8",
    timeStamp: "12:00",
    date: "2025-06-30",
    pollutant: {
      title: "Ozone",
      slug: "ozone",
      maxLevel: 310,
      currentLevel: 280,
      threshold: 300,
      method: "Measured over an hour"
    },
    status: "active"
  },
  {
    stationName: "Southwark A2 Old Kent Road",
    slug: 'southwark-a2-old-kent-road',
    localAuthority: "Southwark",
    mapUrl: "https://maps.app.goo.gl/S3RjJ4Xub6mFSrYr7",
    timeStamp: "08:00",
    date: "2025-06-28",
    pollutant: {
      title: "nitrogen dioxide",
      slug: "nitrogen-dioxide",
      maxLevel: 17,
      currentLevel: 11,
      threshold: 400,
      method: "Measured consecutively over 3 hours"
    },
    status: "expired"
  },
  {
    stationName: "Port Talbot",
    slug: 'port-talbot',
    localAuthority: "Castell-nedd Port Talbot - Neath Port Talbot",
    mapUrl: "https://maps.app.goo.gl/c2V82axbUBGE33rH6",
    timeStamp: "15:00",
    date: "2025-06-26",
    pollutant: {
      title: "ozone",
      slug: "ozone",
      maxLevel: 12,
      currentLevel: 16,
      threshold: 300,
      method: "Measured over an hour"
    },
    status: "expired"
  }
];

module.exports = alerts;