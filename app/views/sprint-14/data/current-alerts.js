const alerts = [
  {
    stationName: "Newport",
    slug: 'newport',
    localAuthority: "Casnewydd - Newport",
    mapUrl: "https://maps.app.goo.gl/5kfYiZrXBCDiKSKp7",
    timeStamp: "08:00",
    date: "2024-08-20",
    pollutant: {
      title: "nitrogen dioxide",
      slug: "nitrogen-dioxide",
      maxLevel: 510,
      currentLevel: 425,
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
    date: "2024-08-19",
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
    date: "2024-08-19",
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
    stationName: "Yarner Wood",
    slug: 'yarner-wood',
    localAuthority: "Devon",
    mapUrl: "https://maps.app.goo.gl/EFiMUYRakcfVqEaL6",
    timeStamp: "08:00",
    date: "2024-08-19",
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
    date: "2024-08-18",
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
