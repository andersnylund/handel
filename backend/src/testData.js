export const createUsers = async models => {
  await models.User.create({
    username: 'andersnylund',
    email: 'anders.nylund.an@gmail.com',
    password: 'verysecretpassword',
  });

  await models.User.create({
    username: 'jdoe',
    email: 'john.doe@example.com',
    password: 'john.doe',
  });
};

export default { createUsers };
