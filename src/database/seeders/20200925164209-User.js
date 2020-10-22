module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'NKUBITO Emmanuel',
        email: 'nkubito@phantom.com',
        password: '$2a$10$I5iHDBzgymJ7lNVFgOKr1ec65/OX/lqb66mZ5xsEJhhVcURYFmwYG',
        birthdate: '1998-10-23',
        gender: 'female',
        role: 'operator',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Admin",
        email: "admin@phantom.com",
        password: "$2b$12$89zO5H8EZ0diXju0ZMZXcejpBZMHtfwjC/2oEm9HQU8H99L1/CoWq",
        role: "admin",
        birthdate: "1981-11-08T00:00:00.000Z",
        gender: "male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
