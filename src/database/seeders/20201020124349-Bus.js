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

      {
        plate: "RAC123A",
        company: "KBS",
        seats: 40,
        status: 'active',
        category: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Buses', null, {}),
};
