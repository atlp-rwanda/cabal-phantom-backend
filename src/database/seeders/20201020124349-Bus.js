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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Buses', null, {}),
};
