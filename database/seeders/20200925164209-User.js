module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Malila Kikulira',
        email: 'malila.kikulira@phantom.com',
        password: '#@$sgafsf232!*26fradfSrwgdst',
        birthdate: '1998-10-23',
        gender: 'female',
        role: 'driver',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kakule Paul',
        email: 'kakule.paul@phantom.com',
        password: '#T@sgafp2q32!*26fradfSTwydst',
        birthdate: '1978-11-23',
        gender: 'Male',
        role: 'operator',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};