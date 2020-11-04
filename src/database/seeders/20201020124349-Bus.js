module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Buses',
    [
      {
        plate: "RAB345E",
        company: "Royal",
        seats: 29,
        status: 'active',
        category: 'small',
        type: 'coaster',
        location: 'kacyiru',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plate: "RAC123A",
        company: "KBS",
        seats: 40,
        status: 'active',
        category: 'medium',
        type: 'coaster',
        location: 'kacyiru',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plate: "RAB003A",
        company: "Volcano",
        seats: 65,
        status: 'active',
        category: 'medium',
        type: 'coaster',
        location: 'kacyiru',
        userId:3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Buses', null, {}),
};
